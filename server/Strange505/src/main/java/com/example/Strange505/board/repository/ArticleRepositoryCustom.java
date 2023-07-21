package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.user.domain.User;

import java.util.List;

public interface ArticleRepositoryCustom {
    List<Article> searchByTitle(String title);
    List<Article> searchByContent(String content);
    List<Article> searchByUser(Long userId);
}
