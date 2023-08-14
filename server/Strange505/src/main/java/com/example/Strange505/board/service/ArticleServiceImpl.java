package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.ArticleLike;
import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.ArticleListResponseDto;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.ArticleResponseDto;
import com.example.Strange505.board.exception.NoResultException;
import com.example.Strange505.board.exception.NotAuthorException;
import com.example.Strange505.board.repository.ArticleLikeRepository;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.BoardRepository;
import com.example.Strange505.board.repository.CommentRepository;
import com.example.Strange505.file.service.ImageService;
import com.example.Strange505.pointHistory.dto.PointHistoryDto;
import com.example.Strange505.pointHistory.service.PointHistoryService;
import com.example.Strange505.user.domain.Role;
import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    public final ArticleLikeRepository articleLikeRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final ImageService imageService;
    private final PointHistoryService pointHistoryService;
    private final CommentRepository commentRepository;

    @Override
    @Transactional
    public ArticleResponseDto createArticle(ArticleRequestDto dto, String email){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoResultException("사용자를 찾을 수 없습니다."));
        Board board = boardRepository.findByName(dto.getBoardName()).orElseThrow(() -> new NoResultException("게시판을 찾을 수 없습니다."));
        Article article = Article.createArticle(dto, user, board);
        Article savedArticle = articleRepository.save(article);
        ArticleResponseDto responseDto = ArticleResponseDto.builder()
                .id(savedArticle.getId())
                .title(savedArticle.getTitle())
                .content(savedArticle.getContent())
                .boardName(savedArticle.getBoard().getName())
                .boardId(savedArticle.getBoard().getId())
                .nickName(savedArticle.getNickName())
                .gen(savedArticle.getUser().getGen())
                .local(savedArticle.getUser().getLocal())
                .createTime(savedArticle.getCreateTime())
                .modifyTime(savedArticle.getModifyTime())
                .build();
        addPoint(user.getId());
        return responseDto;
    }

    @Override
    public ArticleResponseDto getArticleById(Long id, String email) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new NoResultException("게시글을 찾을 수 없습니다."));
        // 삭제된 글이라면
        if (article.getIsRemoved()) {
            return null;
        }
        // 이 글에 들어온 사용자와 글 작성자가 같은지 반환
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NoResultException("사용자가 존재하지 않습니다."));
        boolean isUserThisArticle = checkUser(id, email);
        // 이 글에 들어온 사용자가 좋아요를 했는지 반환
        boolean isLikedThisArticle = articleLikeRepository.findByArticleAndUser(article.getId(), user.getId());

        ArticleResponseDto responseDto = ArticleResponseDto.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .boardName(article.getBoard().getName())
                .boardId(article.getBoard().getId())
                .nickName(article.getNickName())
                .gen(article.getUser().getGen())
                .local(article.getUser().getLocal())
                .likes(article.getLikes())
                .views(article.getViews())
                .isLiked(isLikedThisArticle)
                .isUser(isUserThisArticle)
                .createTime(article.getCreateTime())
                .modifyTime(article.getModifyTime())
                .build();
        return responseDto;
    }

    @Override
    public boolean checkUser(Long id, String email) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new NoResultException("게시글이 존재하지 않습니다."));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NoResultException("사용자가 존재하지 않습니다."));

        if (user.getId() == article.getUser().getId() || user.getRole() == Role.ADMIN) {
            return true;
        } else {
            return false;
        }

    }

    @Override
    public Page<ArticleListResponseDto> getAllArticles(Pageable pageable) {
        Page<Article> articles = articleRepository.searchAllArticles(pageable);
        Page<ArticleListResponseDto> responseDtoList = articles.map(findArticle ->
                new ArticleListResponseDto(
                        findArticle.getId(),
                        findArticle.getTitle(),
                        findArticle.getBoard().getName(),
                        findArticle.getBoard().getId(),
                        findArticle.getLikes(),
                        findArticle.getViews(),
                        commentRepository.getCountByArticle(findArticle.getId()),
                        findArticle.getCreateTime(), findArticle.getModifyTime()));
        return responseDtoList;
    }

    @Override
    public Page<ArticleListResponseDto> getArticlesByBoard(Long boardId, Pageable pageable) {
        Page<Article> articles = articleRepository.searchByBoard(boardId, pageable);
        Page<ArticleListResponseDto> responseDtoList = articles.map(findArticle ->
                new ArticleListResponseDto(
                        findArticle.getId(),
                        findArticle.getTitle(),
                        findArticle.getBoard().getName(),
                        findArticle.getBoard().getId(),
                        findArticle.getLikes(),
                        findArticle.getViews(),
                        commentRepository.getCountByArticle(findArticle.getId()),
                        findArticle.getCreateTime(), findArticle.getModifyTime()
                ));
        return responseDtoList;
    }

    @Override
    public Page<ArticleListResponseDto> getArticlesByTitleAndContent(String keyword, Long boardId, Pageable pageable) {

        Board findBoard = boardRepository.findById(boardId).orElse(null);

        if (findBoard == null) {
            boardId = null;
        }

        String decodedKeyword = URLDecoder.decode(keyword, StandardCharsets.UTF_8);

        Page<Article> articles = articleRepository.searchByTitleAndContent(decodedKeyword, boardId, pageable);
        Page<ArticleListResponseDto> responseDtoList = articles.map(findArticle ->
                new ArticleListResponseDto(
                        findArticle.getId(),
                        findArticle.getTitle(),
                        findArticle.getBoard().getName(),
                        findArticle.getBoard().getId(),
                        findArticle.getLikes(),
                        findArticle.getViews(),
                        commentRepository.getCountByArticle(findArticle.getId()),
                        findArticle.getCreateTime(), findArticle.getModifyTime()
                ));
        return responseDtoList;
    }
    @Override
    public Page<ArticleListResponseDto> getArticlesByUser(String email, Pageable pageable) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoResultException("사용자를 찾을 수 없습니다."));
        Long userId = user.getId();
        Page<Article> articles = articleRepository.searchByUser(userId, pageable);
        Page<ArticleListResponseDto> responseDtoList = articles.map(findArticle ->
                new ArticleListResponseDto(
                        findArticle.getId(),
                        findArticle.getTitle(),
                        findArticle.getBoard().getName(),
                        findArticle.getBoard().getId(),
                        findArticle.getLikes(),
                        findArticle.getViews(),
                        commentRepository.getCountByArticle(findArticle.getId()),
                        findArticle.getCreateTime(), findArticle.getModifyTime()
                ));
        return responseDtoList;
    }

    @Override
    @Transactional
    public void updateArticle(ArticleRequestDto dto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoResultException("사용자를 찾을 수 없습니다."));
        Board board = boardRepository.findByName(dto.getBoardName()).orElseThrow(() -> new NoResultException("게시판을 찾을 수 없습니다."));
        Article article = articleRepository.findById(dto.getId()).orElseThrow(() -> new NoResultException("게시글을 찾을 수 없습니다."));

        System.out.println(article.getContent());

        if (user.getId() == article.getUser().getId() || user.getRole() == Role.ADMIN) {
            imageService.deleteImageForUpdate(article.getContent(), dto);
            article.updateArticle(dto, board);
        } else {
            throw new NotAuthorException("작성자만 수정 가능합니다.");
        }
    }

    @Override
    @Transactional
    public void deleteArticle(Long id, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoResultException("사용자를 찾을 수 없습니다."));
        Article article = articleRepository.findById(id).orElseThrow(() -> new NoResultException("게시글을 찾을 수 없습니다."));
        if (user.getId() == article.getUser().getId() || user.getRole() == Role.ADMIN) {
//            List<String> images = imageService.parsingArticle(article.getContent());
//            imageService.deleteImages(images);
            article.remove();
        } else {
            throw new NotAuthorException("작성자만 삭제 가능합니다.");
        }

    }

    @Override
    @Transactional
    public void addViewCount(Long id) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new NoResultException("게시글을 찾을 수 없습니다."));
        article.addView();
    }

    @Override
    @Transactional
    public void addPoint(Long userId) {
        PointHistoryDto pointHistoryDto = new PointHistoryDto(10, "게시글 작성 적립", userId);
        pointHistoryService.putNewPointHistory(pointHistoryDto);
    }

}

