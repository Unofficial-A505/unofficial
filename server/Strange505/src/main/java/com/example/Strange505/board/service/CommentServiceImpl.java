package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Comment;
import com.example.Strange505.board.dto.CommentRequestDto;
import com.example.Strange505.board.dto.CommentResponseDto;
import com.example.Strange505.board.dto.MypageCommentResponseDto;
import com.example.Strange505.board.exception.CanNotDeleteException;
import com.example.Strange505.board.exception.NoResultException;
import com.example.Strange505.board.exception.NotAuthorException;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.CommentRepository;
import com.example.Strange505.dto.PageResponseDto;
import com.example.Strange505.pointHistory.dto.PointHistoryDto;
import com.example.Strange505.pointHistory.service.PointHistoryService;
import com.example.Strange505.user.domain.Role;
import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final PointHistoryService pointHistoryService;

    @Override
    @Transactional
    public void createComment(CommentRequestDto dto, String email) {
        System.out.println("email = " + email);
        Article article = articleRepository.getReferenceById(dto.getArticleId());
        Comment parent = commentRepository.findById(dto.getParentId()).orElse(null);
        User user = userRepository.findByEmail(email).orElseThrow();
        Comment comment = null;
        if (parent == null) {
            comment = Comment.builder()
                    .article(article)
                    .content(dto.getContent())
                    .createTime(LocalDateTime.now())
                    .user(user)
                    .nickName(dto.getNickName())
                    .isRemoved(false)
                    .build();
        } else {
            comment = Comment.builder()
                    .article(article)
                    .content(dto.getContent())
                    .createTime(LocalDateTime.now())
                    .parent(parent)
                    .user(user)
                    .nickName(dto.getNickName())
                    .isRemoved(false)
                    .build();
            parent.addChild(comment);
        }
        commentRepository.save(comment);
        addPoint(user.getId());
    }

    @Override
    public CommentResponseDto getCommentById(Long id) {

        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        Comment parent = comment.getParent();
        // 삭제된 댓글이라면
        if (comment.getIsRemoved()) {
            return null;
        }

        if (parent == null) {
            return CommentResponseDto.builder()
                    .articleId(comment.getArticle().getId())
                    .content(comment.getContent())
                    .parentId(null)
                    .createTime(comment.getCreateTime())
                    .modifyTime(comment.getModifyTime())
                    .nickName(comment.getNickName())
                    .build();
        } else {
            return CommentResponseDto.builder()
                    .articleId(comment.getArticle().getId())
                    .content(comment.getContent())
                    .parentId(comment.getParent().getId())
                    .createTime(comment.getCreateTime())
                    .modifyTime(comment.getModifyTime())
                    .nickName(comment.getNickName())
                    .build();
        }
    }

    @Override
    public PageResponseDto<CommentResponseDto> getCommentByArticle(Long articleId, String email, Pageable pageable) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoResultException("사용자를 찾을 수 없습니다."));
        Page<Comment> repoList = commentRepository.searchByArticle(articleId, pageable); // 삭제된 댓글은 안불러옴!!!
        List<CommentResponseDto> list = new ArrayList<>();

        for (Comment c :
                repoList) {
            checkParent(c, user, list);
        }

        Collections.sort(list, new Comparator<CommentResponseDto>() {
            @Override
            public int compare(CommentResponseDto s1, CommentResponseDto s2) {
                return (int) (s1.getOrderId() - s2.getOrderId());
            }
        });

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", repoList.getTotalElements());
        pageInfo.put("totalPages", repoList.getTotalPages());

        return new PageResponseDto<CommentResponseDto>(pageInfo, list);
    }

    public boolean checkUser(Long commentUserId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoResultException("사용자가 존재하지 않습니다."));
        if (userId == commentUserId || user.getRole() == Role.ADMIN) {
            return true;
        } else {
            return false;
        }
    }

    private void checkParent(Comment c, User currUser, List<CommentResponseDto> list) {
        if (c.getParent() == null) { // 부모 댓글이라면 orderId는 자신의 아이디 * 1000

            list.add(CommentResponseDto.builder()
                    .id(c.getId())
                    .articleId(c.getArticle().getId())
                    .content(c.getContent())
                    .parentId(null)
                    .nickName(c.getNickName())
                    .gen(c.getUser().getGen())
                    .local(c.getUser().getLocal())
                    .isUser(checkUser(c.getUser().getId(), currUser.getId()))
                    .orderId(c.getId() * 1000L)
                    .hasChildren(!c.isAllChildRemoved()) // 자식 댓글이 있다면 true 반환
                    .createTime(c.getCreateTime())
                    .modifyTime(c.getModifyTime())
                    .build());

            // 자식 댓글(대댓글)
            List<CommentResponseDto> reComment = c.getChildren().stream().filter(child -> child.getIsRemoved() == false).map(comment -> new CommentResponseDto(
                    comment.getId(),
                    comment.getArticle().getId(), comment.getContent(), c.getId(),
                    comment.getNickName(),
                    comment.getUser().getGen(), comment.getUser().getLocal(),
                    checkUser(comment.getUser().getId(), currUser.getId()),
                    0L, false,
                    comment.getCreateTime(), comment.getModifyTime(), null)).toList();

            for (int i = 0; i < reComment.size(); i++) { // 자식댓글, 즉 대댓글이라면 부모댓글 * 1000에 차례대로 1씩 더해짐
                reComment.get(i).setOrderId(reComment.get(i).getParentId() * 1000L + (i + 1));
                list.add(reComment.get(i));
            }

        }
    }

    @Override
    public Page<MypageCommentResponseDto> getCommentByUser(String email, Pageable pageable) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoResultException("사용자를 찾을 수 없습니다."));
        Page<Comment> repoList = commentRepository.searchByUser(user.getId(), pageable);
        List<MypageCommentResponseDto> list = new ArrayList<>();
        for (Comment c :
                repoList) {
            if (c.getParent() == null) {
                list.add(new MypageCommentResponseDto(
                        c.getId(),
                        c.getArticle().getId(), c.getContent(),
                        null, c.getNickName(),
                        c.getUser().getGen(), c.getUser().getLocal(),
                        c.getCreateTime(), c.getModifyTime(), null,
                        c.getArticle().getTitle(),
                        c.getArticle().getBoard().getName(),
                        c.getArticle().getBoard().getId()));
            } else {
                list.add(new MypageCommentResponseDto(
                        c.getId(),
                        c.getArticle().getId(), c.getContent(),
                        c.getParent().getId(), c.getNickName(),
                        c.getUser().getGen(), c.getUser().getLocal(),
                        c.getCreateTime(), c.getModifyTime(), null,
                        c.getArticle().getTitle(),
                        c.getArticle().getBoard().getName(),
                        c.getArticle().getBoard().getId()));
            }
        }
        Page<MypageCommentResponseDto> result = new PageImpl<>(list, pageable, repoList.getTotalElements());
        return result;
    }

    @Override
    @Transactional
    public CommentResponseDto updateComment(Long id, CommentRequestDto dto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new NoResultException("해당 댓글이 존재하지 않습니다."));
        if (user.getId() == comment.getUser().getId() || user.getRole() == Role.ADMIN) {
            comment.update(dto.getContent(), LocalDateTime.now());
            Comment modifiedComment = commentRepository.findById(id).orElseThrow(() -> new NoResultException("해당 댓글이 존재하지 않습니다."));
            return new CommentResponseDto(modifiedComment);
        } else {
            throw new NotAuthorException("작성자만 삭제 가능합니다.");
        }

    }

    @Override
    @Transactional
    public void deleteComment(Long id, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new NoResultException("Comment not found"));
        if (user.getId() == comment.getUser().getId() || user.getRole() == Role.ADMIN) { // 권한이 있는 경우
            List<Comment> removableCommentList = comment.findRemovableList();
            if (removableCommentList.size() == 0) {  // 삭제할 댓글이 없는 경우 = 부모 삭제하려는데 자식이 있는 경우
                throw new CanNotDeleteException("대댓글이 존재하므로 삭제할 수 없습니다.");
            } else {  // 자식 없는 부모거나, 자식인 경우
                for (Comment c : removableCommentList) {
                    c.remove();
                    if (c.getParent() != null) {  // 자식인 경우
                        Comment parent = c.getParent();
                        parent.removeChild(c); // 부모의 자식 리스트에서 삭제
                    }
                }
            }
        } else { // 권한이 없는 경우
            throw new NotAuthorException("작성자만 삭제 가능합니다.");
        }
    }

    @Override
    @Transactional
    public void addPoint(Long userId) {
        PointHistoryDto pointHistoryDto = new PointHistoryDto(5, "댓글 작성 적립", userId);
        pointHistoryService.putNewPointHistory(pointHistoryDto);
    }
}
