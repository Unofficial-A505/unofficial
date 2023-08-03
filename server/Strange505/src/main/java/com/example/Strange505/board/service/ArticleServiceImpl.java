package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.exception.NoResultException;
import com.example.Strange505.board.exception.NotAuthorException;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.BoardRepository;
import com.example.Strange505.file.service.ImageService;
import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final ImageService imageService;

    @Override
    @Transactional
    public Article createArticle(ArticleRequestDto dto, String email){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoResultException("사용자를 찾을 수 없습니다."));
        Board board = boardRepository.findByName(dto.getBoardName()).orElseThrow(() -> new NoResultException("게시판을 찾을 수 없습니다."));
        Article article = Article.createArticle(dto, user, board);
        if (dto.getImageList() != null) {
            imageService.notUsingImageDelete(dto.getImageList(), imageService.parsingArticle(dto.getContent()));
        }
        Article savedArticle = articleRepository.save(article);
        return savedArticle;
    }

    @Override
    public Article getArticleById(Long id) {
        return articleRepository.findById(id).orElseThrow(() -> new NoResultException("게시글을 찾을 수 없습니다."));
    }

    @Override
    public Page<Article> getAllArticles(Pageable pageable) {
        return articleRepository.searchAllArticles(pageable);
    }

    @Override
    public Page<Article> getArticlesByBoard(Long boardId, Pageable pageable) {
        return articleRepository.searchByBoard(boardId, pageable);
    }

    @Override
    public Page<Article> getArticlesByTitleAndContent(String keyword, Long boardId, Pageable pageable) {

        Board findBoard = boardRepository.findById(boardId).orElse(null);

        if (findBoard == null) {
            boardId = null;
        }

        return articleRepository.searchByTitleAndContent(keyword, boardId, pageable);
    }
    @Override
    public Page<Article> getArticlesByUser(String email, Pageable pageable) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoResultException("사용자를 찾을 수 없습니다."));
        Long userId = user.getId();
        return articleRepository.searchByUser(userId, pageable);
    }

    @Override
    @Transactional
    public void updateArticle(ArticleRequestDto dto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoResultException("사용자를 찾을 수 없습니다."));
        Board board = boardRepository.findByName(dto.getBoardName()).orElseThrow(() -> new NoResultException("게시판을 찾을 수 없습니다."));
        Article article = articleRepository.findById(dto.getId()).orElseThrow(() -> new NoResultException("게시글을 찾을 수 없습니다."));
        if (user.getId() == article.getUser().getId()) {
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
        if (user.getId() == article.getUser().getId()) {
            List<String> images = imageService.parsingArticle(article.getContent());
            imageService.deleteImages(images);
            articleRepository.deleteById(id);
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

}

