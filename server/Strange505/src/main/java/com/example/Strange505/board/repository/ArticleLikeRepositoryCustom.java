package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.ArticleLike;
import com.example.Strange505.user.domain.User;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface ArticleLikeRepositoryCustom {
    Boolean findByArticleAndUser(Long articleId, Long userId);
}
