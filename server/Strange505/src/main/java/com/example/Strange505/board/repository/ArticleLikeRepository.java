package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.ArticleLike;
import com.example.Strange505.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArticleLikeRepository extends JpaRepository<ArticleLike, Long>, ArticleLikeRepositoryCustom {
}
