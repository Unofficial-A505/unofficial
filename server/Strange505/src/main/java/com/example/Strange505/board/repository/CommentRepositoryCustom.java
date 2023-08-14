package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentRepositoryCustom {
    Page<Comment> searchByArticle(Long articleId, Pageable pageable);
    Integer getCountByArticle(Long articleId);
    Page<Comment> searchByUser(Long userId, Pageable pageable);
}
