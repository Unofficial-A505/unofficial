package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Comment;
import com.example.Strange505.board.domain.Image;

import java.util.List;

public interface ImageRepositoryCustom {
    List<Image> searchByArticle(Long articleId);
}
