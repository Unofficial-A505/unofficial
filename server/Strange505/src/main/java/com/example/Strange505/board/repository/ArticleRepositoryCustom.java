package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Article;

import java.util.List;

public interface ArticleRepositoryCustom {
    List<Article> searchByTitle(String title);
}
