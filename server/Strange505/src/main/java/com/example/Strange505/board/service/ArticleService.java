package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleDTO;
import com.example.Strange505.board.dto.BoardDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ArticleService {
    void createArticle(ArticleDTO articleDTO);

    Article getArticleById(Long id);

    List<Article> getArticlesByBoard(String board);

    List<Article> getArticlesByTitle(String title);

    List<Article> getArticlesByContent(String content);

    void updateArticle(Long id, ArticleDTO articleDTO);

    void deleteArticle(Long id);
}
