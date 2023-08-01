package com.example.Strange505.file.service;

import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.file.entity.Image;
import com.example.Strange505.file.dto.UploadFile;

import java.util.List;

public interface ImageService {

    Image saveImage(UploadFile file, Long articleId);

    List<String> getPathsByArticle(Long articleId);

    void notUsingImageDelete(List<String> preList, List<String> nowList);

    List<String> parsingArticle(String data);

    void deleteImages(List<String> images);

    void deleteImageForUpdate(String content, ArticleRequestDto dto);
}
