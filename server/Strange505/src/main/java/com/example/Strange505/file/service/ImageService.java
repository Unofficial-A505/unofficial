package com.example.Strange505.file.service;

import com.example.Strange505.file.entity.Image;
import com.example.Strange505.file.dto.UploadFile;

import java.util.List;

public interface ImageService {

    Image saveImage(UploadFile file, Long articleId);

    List<String> getPathsByArticle(Long articleId);
}
