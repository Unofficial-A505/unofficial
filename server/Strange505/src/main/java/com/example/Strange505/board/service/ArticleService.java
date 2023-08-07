package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleService {

    Article createArticle(ArticleRequestDto articleDTO, String email);

    boolean checkUser(Long id, String email);

    Article getArticleById(Long id);

    Page<Article> getAllArticles(Pageable pageable);

    Page<Article> getArticlesByBoard(Long boardId, Pageable pageable);

    Page<Article> getArticlesByTitleAndContent(String keyword, Long boardId, Pageable pageable);

    Page<Article> getArticlesByUser(String email, Pageable pageable);

    void updateArticle(ArticleRequestDto dto, String email);

    void deleteArticle(Long id, String email);

    void addViewCount(Long id);
}
