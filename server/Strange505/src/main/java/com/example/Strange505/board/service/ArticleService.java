package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;

import java.util.List;

public interface ArticleService {

    Article createArticle(ArticleRequestDto articleDTO, Long userId);

    Article getArticleById(Long id);

    List<Article> getAllArticles();

    List<Article> getArticlesByTitle(String title, Long boardId);

    List<Article> getArticlesByContent(String content, Long boardId);

    List<Article> getArticlesByUser(Long userId);

    void updateArticle(Long id, ArticleRequestDto articleDTO);

    void deleteArticle(Long id);
}
