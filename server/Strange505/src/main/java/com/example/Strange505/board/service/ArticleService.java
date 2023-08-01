package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;

import java.util.List;

public interface ArticleService {

    Article createArticle(ArticleRequestDto articleDTO, String email);

    Article getArticleById(Long id);

    List<Article> getAllArticles();

    List<Article> getArticlesByBoard(Long boardId);

    List<Article> getArticlesByTitleAndContent(String keyword, Long boardId);

    List<Article> getArticlesByUser(String email);

    void updateArticle(Long id, ArticleRequestDto dto, String email);

    void deleteArticle(Long id, String email);

    void addViewCount(Long id);
}
