package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;

import java.util.List;

public interface ArticleService {

    Article createArticle(ArticleRequestDto articleDTO, String jwt);

    Article getArticleById(Long id);

    List<Article> getAllArticles();

    List<Article> getArticlesByTitle(String title);

    List<Article> getArticlesByContent(String content);

    List<Article> getArticlesByUser(Long userId);

    void updateArticle(Long id, ArticleRequestDto articleDTO);

    void deleteArticle(Long id);
}
