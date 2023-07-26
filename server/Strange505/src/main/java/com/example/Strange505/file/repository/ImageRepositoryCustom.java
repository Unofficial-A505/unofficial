package com.example.Strange505.file.repository;

import com.example.Strange505.file.entity.Image;

import java.util.List;

public interface ImageRepositoryCustom {
    List<Image> searchByArticle(Long articleId);
}
