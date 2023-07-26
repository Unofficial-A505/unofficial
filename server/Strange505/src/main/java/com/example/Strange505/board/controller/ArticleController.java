package com.example.Strange505.board.controller;


import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.ArticleResponseDto;
import com.example.Strange505.file.dto.UploadFile;
import com.example.Strange505.file.fileStore.FileStore;
import com.example.Strange505.board.service.ArticleService;
import com.example.Strange505.file.service.ImageService;
import com.example.Strange505.file.service.S3UploaderService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final FileStore fileStore;
    private final ImageService imageService;
    private final S3UploaderService s3Uploader;

    @PostMapping
    public ResponseEntity<?> registerArticle(@RequestBody ArticleRequestDto dto) {
        articleService.createArticle(dto, "");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifyArticle(@PathVariable Long id, @RequestBody ArticleRequestDto dto) {
        articleService.updateArticle(id, dto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ArticleResponseDto>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();

        articles.stream().forEach(findArticle -> articleResponseDtoList.add(
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime())));

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/title")
    public ResponseEntity<List<ArticleResponseDto>> getArticlesByTitle(@RequestParam String title) {
        List<Article> articles = articleService.getArticlesByTitle(title);
        List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();

        articles.stream().forEach(findArticle -> articleResponseDtoList.add(
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime())));

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }


    @GetMapping("/content")
    public ResponseEntity<List<ArticleResponseDto>> getArticlesByContent(@RequestParam String content) {
        List<Article> articles = articleService.getArticlesByContent(content);
        List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();

        articles.stream().forEach(findArticle -> articleResponseDtoList.add(
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime())));

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<ArticleResponseDto>> getArticlesByUser(@RequestParam Long userId) {
        List<Article> articles = articleService.getArticlesByUser(userId);
        List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();

        articles.stream().forEach(findArticle -> articleResponseDtoList.add(
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime())));

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }

    @PostMapping("/uploadImage")
    @ResponseBody
    public ResponseEntity<String> upload(@ModelAttribute ArticleController.ImageForm form) throws IOException {
        MultipartFile file = form.getUploadFile().get(0);
        return ResponseEntity.ok(s3Uploader.upload(file, "static"));
    }

    @PostMapping("/images")
//    public ResponseEntity<Boolean> saveImage(@RequestPart List<MultipartFile> files, @RequestParam Long articleId) throws IOException {
    public ResponseEntity<Boolean> saveImage(@ModelAttribute ImageForm form) throws IOException {
        List<MultipartFile> files = form.getUploadFile();
        System.out.println(files);
        // 실제 디렉토리에 파일 저장
        List<UploadFile> attachFile = fileStore.storeFiles(files);
        // DB에 데이터 저장
//        attachFile.stream().forEach(file -> imageService.saveImage(file, articleId));
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/images/{articleId}")
    public ResponseEntity<List<String>> getImagePaths(@PathVariable String articleId) {
        List<String> result = imageService.getPathsByArticle(Long.parseLong(articleId));
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/image/{filename}")
    public Resource downLoadImage(@PathVariable String filename) throws MalformedURLException {
        return new UrlResource("file:" + fileStore.getFullPath(filename));
    }

    @Data
    public static class ImageForm {
        private List<MultipartFile> uploadFile;
    }

}
