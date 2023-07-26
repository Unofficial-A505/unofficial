package com.example.Strange505.file.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.file.entity.Image;
import com.example.Strange505.file.dto.UploadFile;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.file.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ArticleRepository articleRepository;

    @Override
    public Image saveImage(UploadFile file, Long articleId) {

        Article findArticle = articleRepository.findById(articleId).orElse(null);

        Image image = Image.builder()
                .article(findArticle)
                .storeFileName(file.getStoreFileName())
                .uploadFileName(file.getUploadFileName())
                .build();
        return imageRepository.save(image);
    }

    @Override
    public List<String> getPathsByArticle(Long articleId) {
        List<Image> images = imageRepository.searchByArticle(articleId);
        return images.stream().map(image -> image.getStoreFileName()).toList();
    }
}
