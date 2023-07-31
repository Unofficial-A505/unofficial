package com.example.Strange505.board.controller;


import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.ArticleResponseDto;
import com.example.Strange505.board.dto.ImageForm;
import com.example.Strange505.board.service.ArticleService;
import com.example.Strange505.user.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.example.Strange505.file.service.S3UploaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final S3UploaderService s3Uploader;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<?> registerArticle(@RequestHeader("Authorization") String accessToken,
                                             @RequestBody ArticleRequestDto dto) {
        Long userId = authService.extractID(accessToken);
        articleService.createArticle(dto, userId);
        return new ResponseEntity<>("Article created successfully", HttpStatus.OK);

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

    @GetMapping("/detail/{id}")
    public ResponseEntity<ArticleResponseDto> getArticle(@PathVariable Long id, HttpServletRequest req, HttpServletResponse res) {
        addViewCount(id, req, res);
        Article article = articleService.getArticleById(id);
        ArticleResponseDto dto = ArticleResponseDto.builder()
                .title(article.getTitle())
                .content(article.getContent())
                .boardName(article.getBoard().getName())
                .nickName(article.getNickName())
                .createTime(article.getCreateTime())
                .modifyTime(article.getModifyTime())
                .build();
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ArticleResponseDto>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        List<ArticleResponseDto> articleResponseDtoList = articles.stream().map(findArticle ->
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime()))
                .toList();

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ArticleResponseDto>> getArticlesByTitleAndContent(@RequestParam String keyword, @RequestParam Long boardId) {
        List<Article> articles = articleService.getArticlesByTitleAndContent(keyword, boardId);

        List<ArticleResponseDto> articleResponseDtoList = articles.stream().map(findArticle ->
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime()))
                .toList();

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<ArticleResponseDto>> getArticlesByUser(@RequestHeader("Authorization") String accessToken) {
        Long userId = authService.extractID(accessToken);
        if (userId == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        List<Article> articles = articleService.getArticlesByUser(userId);
        List<ArticleResponseDto> result = articles.stream().map(findArticle ->
                        new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                                findArticle.getBoard().getName(), findArticle.getNickName(),
                                findArticle.getCreateTime(), findArticle.getModifyTime()))
                .toList();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    private void addViewCount(Long id, HttpServletRequest req, HttpServletResponse res) {
        Cookie oldCookie = null;

        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("boardView")) {
                    oldCookie = cookie;
                }
            }
        }

        if (oldCookie != null) {
            if (!oldCookie.getValue().contains("[" + id.toString() + "]")) {
                articleService.addViewCount(id);
                oldCookie.setValue(oldCookie.getValue() + "_[" + id + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);
                res.addCookie(oldCookie);
            }
        } else {
            articleService.addViewCount(id);
            Cookie newCookie = new Cookie("boardView", "[" + id + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            res.addCookie(newCookie);
        }
    }

    @PostMapping("/image")
    @ResponseBody
    public ResponseEntity<String> upload(@ModelAttribute ImageForm form) throws IOException {
        MultipartFile file = form.getUploadFile().get(0);
        return ResponseEntity.ok(s3Uploader.upload(file, "article"));
    }

//    @PostMapping("/images")
////    public ResponseEntity<Boolean> saveImage(@RequestPart List<MultipartFile> files, @RequestParam Long articleId) throws IOException {
//    public ResponseEntity<Boolean> saveImage(@ModelAttribute ImageForm form) throws IOException {
//        List<MultipartFile> files = form.getUploadFile();
//        System.out.println(files);
//        // 실제 디렉토리에 파일 저장
//        List<UploadFile> attachFile = fileStore.storeFiles(files);
//        // DB에 데이터 저장
////        attachFile.stream().forEach(file -> imageService.saveImage(file, articleId));
//        return ResponseEntity.status(HttpStatus.OK).build();
//    }

//    @GetMapping("/images/{articleId}")
//    public ResponseEntity<List<String>> getImagePaths(@PathVariable String articleId) {
//        List<String> result = imageService.getPathsByArticle(Long.parseLong(articleId));
//        return ResponseEntity.status(HttpStatus.OK).body(result);
//    }
//
//    @GetMapping("/image/{filename}")
//    public Resource downLoadImage(@PathVariable String filename) throws MalformedURLException {
//        return new UrlResource("file:" + fileStore.getFullPath(filename));
//    }
}
