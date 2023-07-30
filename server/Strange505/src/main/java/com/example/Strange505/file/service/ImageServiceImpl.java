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
    public void notUsingImageDelete(ArticleRequestDto dto) {
        List<String> preList = dto.getImageList();
        List<String> nowList = parsingArticle(dto.getContent());

        preList.stream().filter(target -> !nowList.contains(target))
                .forEach(deleteTarget -> s3UploaderService.deleteFile(deleteTarget));
    }

    @Override
    public void deleteImages(List<String> images) {
        images.stream().forEach(image -> s3UploaderService.deleteFile(image));
    }

    @Override
    public List<String> parsingArticle(String data) {
        List<String> urls = new ArrayList<>();
        int flag = 0;
        do {
            data = urlExtract(data, urls);
            flag = data.indexOf("src=\"");
        } while (flag != -1);

        return urls;
    }


    private String urlExtract(String data, List<String> urls) {
        int idx = data.indexOf("src=\"");
        String now = data.substring(idx + 5);
        idx = now.indexOf("\"");

        String URL = now.substring(0, idx);
        String leftover = now.substring(idx + 1);

        System.out.println(URL);
        urls.add(URL.substring(URL.indexOf("/static/")));
        System.out.println(leftover);
        return leftover;
    }
}
