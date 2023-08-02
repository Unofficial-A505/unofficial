package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleLikeRequestDto;
import com.example.Strange505.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ArticleRepositoryCustom {
    Page<Article> searchByTitleAndContent(String keyword, Long boardId, Pageable pageable);
    Page<Article> searchByUser(Long userId, Pageable pageable);
    Page<Article> searchByBoard(Long boardId, Pageable pageable);
    Page<Article> searchAllArticles(Pageable pageable);
    void addLikeCount(Article article);
    void subLikeCount(Article article);
}
