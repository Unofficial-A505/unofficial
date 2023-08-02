package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.exception.NotAuthorException;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.BoardRepository;
import com.example.Strange505.file.service.ImageService;
import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        User user = userRepository.findByEmail(email).orElseThrow();
        Board board = boardRepository.findByName(dto.getBoardName()).orElseThrow();
        Article article = Article.createArticle(dto, user, board);
        if (dto.getImageList() != null) {
            imageService.notUsingImageDelete(dto.getImageList(), imageService.parsingArticle(dto.getContent()));
        }
        Article savedArticle = articleRepository.save(article);
        return savedArticle;
    }

    @Override
    public Article getArticleById(Long id) {
        return articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
    }

    @Override
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    @Override
    public List<Article> getArticlesByBoard(Long boardId) {
        return articleRepository.searchByBoard(boardId);
    }

    @Override
    public List<Article> getArticlesByTitleAndContent(String keyword, Long boardId) {
        return articleRepository.searchByTitleAndContent(keyword, boardId);
    }
    @Override
    public List<Article> getArticlesByUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Long userId = user.getId();
        return articleRepository.searchByUser(userId);
    }

    @Override
    @Transactional
    public void updateArticle(Long id, ArticleRequestDto dto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Board board = boardRepository.findByName(dto.getBoardName()).orElseThrow();
        Article article = articleRepository.findById(id).orElseThrow();
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
        User user = userRepository.findByEmail(email).orElseThrow();
        Article article = articleRepository.findById(id).orElseThrow();
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
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException());
        article.addView();
    }

}

