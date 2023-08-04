package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Comment;
import com.example.Strange505.board.dto.CommentRequestDto;
import com.example.Strange505.board.dto.CommentResponseDto;
import com.example.Strange505.board.exception.NoResultException;
import com.example.Strange505.board.exception.NotAuthorException;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.CommentRepository;
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
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

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
                    .build();
        } else {
            comment = Comment.builder()
                    .article(article)
                    .content(dto.getContent())
                    .createTime(LocalDateTime.now())
                    .parent(parent)
                    .user(user)
                    .nickName(dto.getNickName())
                    .build();
            parent.addChild(comment);
        }
        commentRepository.save(comment);
    }

    @Override
    public CommentResponseDto getCommentById(Long id) {

        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        Comment parent = comment.getParent();

        if (parent == null) {
            return CommentResponseDto.builder()
                    .userId(comment.getUser().getId())
                    .articleId(comment.getArticle().getId())
                    .content(comment.getContent())
                    .parentId(null)
                    .createTime(comment.getCreateTime())
                    .modifyTime(comment.getModifyTime())
                    .nickName(comment.getNickName())
                    .build();
        } else {
            return CommentResponseDto.builder()
                    .userId(comment.getUser().getId())
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
    public Page<CommentResponseDto> getCommentByArticle(Long articleId, Pageable pageable) {

        Page<Comment> repoList = commentRepository.searchByArticle(articleId, pageable);
        List<CommentResponseDto> list = new ArrayList<>();
        for (Comment c :
                repoList) {
            checkParent(c, list);
        }

        Page<CommentResponseDto> result = new PageImpl<>(list);
        return result;
    }

    private void checkParent(Comment c, List<CommentResponseDto> list) {
        if (c.getParent() == null) {

            List<CommentResponseDto> reComment = c.getChildren().stream().map(comment -> new CommentResponseDto(
                    comment.getId(), comment.getUser().getId(),
                    comment.getArticle().getId(), comment.getContent(), null,
                    comment.getNickName(), comment.getCreateTime(), comment.getModifyTime(), null)).toList();

            list.add(new CommentResponseDto(
                    c.getId(), c.getUser().getId(),
                    c.getArticle().getId(), c.getContent(), null,
                    c.getNickName(), c.getCreateTime(), c.getModifyTime(), reComment));
        }
    }

    @Override
    public Page<CommentResponseDto> getCommentByUser(String email, Pageable pageable) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoResultException("사용자를 찾을 수 없습니다."));
        Page<Comment> repoList = commentRepository.searchByUser(user.getId(), pageable);
        List<CommentResponseDto> list = new ArrayList<>();
        for (Comment c :
                repoList) {
            if (c.getParent() == null) {
                list.add(new CommentResponseDto(
                        c.getId(), c.getUser().getId(),
                        c.getArticle().getId(), c.getContent(),
                        null, c.getNickName(), c.getCreateTime(), c.getModifyTime(), null));
            } else {
                list.add(new CommentResponseDto(
                        c.getId(), c.getUser().getId(),
                        c.getArticle().getId(), c.getContent(), c.getParent().getId(),
                        c.getNickName(), c.getCreateTime(), c.getModifyTime(), null));
            }
        }
        Page<CommentResponseDto> result = new PageImpl<>(list);
        return result;
    }

    @Override
    @Transactional
    public CommentResponseDto updateComment(Long id, CommentRequestDto dto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new NoResultException("Comment not found"));
        if (user.getId() == comment.getUser().getId()) {
            comment.update(dto.getContent(), LocalDateTime.now());
            Comment save = commentRepository.save(comment);
            return new CommentResponseDto(save);
        } else {
            throw new NotAuthorException("작성자만 삭제 가능합니다.");
        }

    }

    @Override
    @Transactional
    public void deleteComment(Long id, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new NoResultException("Comment not found"));
        if (user.getId() == comment.getUser().getId()) {
            comment.remove();
            List<Comment> removableCommentList = comment.findRemovableList();
            log.info("removeList = {}", removableCommentList);
            commentRepository.deleteAll(removableCommentList);
        } else {
            throw new NotAuthorException("작성자만 삭제 가능합니다.");
        }
    }
}
