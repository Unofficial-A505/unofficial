package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDTO;
import com.example.Strange505.user.domain.User;

import java.util.List;

public interface ArticleService {

    Article createArticle(ArticleRequestDTO articleDTO, String jwt);

    Article getArticleById(Long id);

    List<Article> getAllArticles();

    List<Article> getArticlesByTitle(String title);

    List<Article> getArticlesByContent(String content);

    List<Article> getArticlesByUser(Long userId);

    void updateArticle(Long id, ArticleRequestDTO articleDTO);

    void deleteArticle(Long id);
}
