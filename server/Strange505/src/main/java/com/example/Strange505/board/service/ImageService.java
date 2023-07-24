package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Image;
import com.example.Strange505.board.dto.UploadFile;

import java.util.List;

public interface ImageService {

    Image saveImage(UploadFile file, Long articleId);

    List<String> getPathsByArticle(Long articleId);
}
