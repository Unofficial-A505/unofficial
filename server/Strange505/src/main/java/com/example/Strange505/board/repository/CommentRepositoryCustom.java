package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Comment;

import java.util.List;

public interface CommentRepositoryCustom {
    List<Comment> searchByArticle(Long articleId);
    List<Comment> searchByUser(Long userId);
}
