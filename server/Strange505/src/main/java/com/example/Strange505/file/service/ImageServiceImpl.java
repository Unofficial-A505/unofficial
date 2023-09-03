package com.example.Strange505.file.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.file.entity.Image;
import com.example.Strange505.file.dto.UploadFile;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.file.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ArticleRepository articleRepository;
    private final S3UploaderService s3UploaderService;

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

    @Override
    public void notUsingImageDelete(List<String> preList, List<String> nowList) {
        preList.stream().filter(target -> !nowList.contains(target))
                .forEach(deleteTarget -> s3UploaderService.deleteFile(deleteTarget));
    }

    @Override
    public void deleteImages(List<String> images) {
        images.stream().forEach(image -> s3UploaderService.deleteFile(image));
    }

    @Override
    public void deleteImageForUpdate(String content, ArticleRequestDto dto) {
        List<String> nowImages = parsingArticle(dto.getContent());
        List<String> preImages = parsingArticle(content);
        if (preImages != null) notUsingImageDelete(preImages, nowImages);
    }

    @Override
    public List<String> parsingArticle(String data) {
        List<String> urls = new ArrayList<>();
        int flag = data.indexOf("<img src=\"");
        while (flag != -1) {
            data = urlExtract(data, urls);
            flag = data.indexOf("<img src=\"");
        }
        return urls;
    }

    private String urlExtract(String data, List<String> urls) {
        int idx = data.indexOf("<img src=\"");



        String now = data.substring(idx + 10);
        idx = now.indexOf("\"");

        String URL = now.substring(0, idx);
        String leftover = now.substring(idx + 1);

        System.out.println(URL);
        int nextIdx = URL.indexOf("/article/");
        if (nextIdx == -1) {
            return leftover;
        }
        urls.add(URL.substring(nextIdx));
        System.out.println(leftover);
        return leftover;
    }
}
