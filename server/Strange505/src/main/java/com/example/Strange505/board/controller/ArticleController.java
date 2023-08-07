package com.example.Strange505.board.controller;


import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.ArticleResponseDto;
import com.example.Strange505.board.dto.ImageForm;
import com.example.Strange505.board.service.ArticleService;
import com.example.Strange505.dto.PageResponseDto;
import com.example.Strange505.file.service.S3UploaderService;
import com.example.Strange505.user.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final S3UploaderService s3Uploader;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<?> registerArticle(@RequestBody ArticleRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Article article = articleService.createArticle(dto, email);
        ArticleResponseDto responseDto = ArticleResponseDto.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .boardName(article.getBoard().getName())
                .boardId(article.getBoard().getId())
                .nickName(article.getNickName())
                .gen(article.getUser().getGen())
                .local(article.getUser().getLocal())
                .createTime(article.getCreateTime())
                .modifyTime(article.getModifyTime())
                .build();
        return new ResponseEntity<>(responseDto, HttpStatus.OK);

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifyArticle(@RequestBody ArticleRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        articleService.updateArticle(dto, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeArticle(@PathVariable Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        articleService.deleteArticle(id, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponseDto> getArticle(@PathVariable Long id, HttpServletRequest req, HttpServletResponse res) {
        addViewCount(id, req, res);
        Article article = articleService.getArticleById(id);
        ArticleResponseDto dto = ArticleResponseDto.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .boardName(article.getBoard().getName())
                .boardId(article.getBoard().getId())
                .nickName(article.getNickName())
                .gen(article.getUser().getGen())
                .local(article.getUser().getLocal())
                .likes(article.getLikes())
                .views(article.getViews())
                .createTime(article.getCreateTime())
                .modifyTime(article.getModifyTime())
                .build();
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<PageResponseDto<ArticleResponseDto>> getAllArticles(Pageable pageable) {
        Page<Article> articles = articleService.getAllArticles(pageable);
        Page<ArticleResponseDto> articleResponseDtoList = articles.map(findArticle ->
                new ArticleResponseDto(findArticle.getId(), findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getBoard().getId(), findArticle.getNickName(),
                        findArticle.getLikes(), findArticle.getViews(),
                        findArticle.getUser().getGen(), findArticle.getUser().getLocal(),
                        findArticle.getCreateTime(), findArticle.getModifyTime()));

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", articleResponseDtoList.getTotalElements());
        pageInfo.put("totalPages", articleResponseDtoList.getTotalPages());
        List<ArticleResponseDto> contents = articleResponseDtoList.getContent();


        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, contents), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponseDto<ArticleResponseDto>> getArticlesByTitleAndContent(@RequestParam String keyword, @RequestParam Long boardId, Pageable pageable) {
        Page<Article> articles = articleService.getArticlesByTitleAndContent(keyword, boardId, pageable);
        Page<ArticleResponseDto> articleResponseDtoList = articles.map(findArticle ->
                new ArticleResponseDto(findArticle.getId(), findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getBoard().getId(), findArticle.getNickName(),
                        findArticle.getLikes(), findArticle.getViews(),
                        findArticle.getUser().getGen(), findArticle.getUser().getLocal(),
                        findArticle.getCreateTime(), findArticle.getModifyTime()));

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", articleResponseDtoList.getTotalElements());
        pageInfo.put("totalPages", articleResponseDtoList.getTotalPages());
        List<ArticleResponseDto> contents = articleResponseDtoList.getContent();


        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, contents), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<PageResponseDto<ArticleResponseDto>> getArticlesByUser(Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Page<Article> articles = articleService.getArticlesByUser(email, pageable);
        Page<ArticleResponseDto> articleResponseDtoList = articles.map(findArticle ->
                new ArticleResponseDto(findArticle.getId(), findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getBoard().getId(), findArticle.getNickName(),
                        findArticle.getLikes(), findArticle.getViews(),
                        findArticle.getUser().getGen(), findArticle.getUser().getLocal(),
                        findArticle.getCreateTime(), findArticle.getModifyTime()));
        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", articleResponseDtoList.getTotalElements());
        pageInfo.put("totalPages", articleResponseDtoList.getTotalPages());
        List<ArticleResponseDto> contents = articleResponseDtoList.getContent();


        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, contents), HttpStatus.OK);
    }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<PageResponseDto<ArticleResponseDto>> getArticlesByBoard(@PathVariable Long boardId, Pageable pageable) {
        Page<Article> articles = articleService.getArticlesByBoard(boardId, pageable);

        Page<ArticleResponseDto> articleResponseDtoList = articles.map(findArticle ->
                new ArticleResponseDto(findArticle.getId(), findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getBoard().getId(), findArticle.getNickName(),
                        findArticle.getLikes(), findArticle.getViews(),
                        findArticle.getUser().getGen(), findArticle.getUser().getLocal(),
                        findArticle.getCreateTime(), findArticle.getModifyTime()));

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", articleResponseDtoList.getTotalElements());
        pageInfo.put("totalPages", articleResponseDtoList.getTotalPages());
        List<ArticleResponseDto> contents = articleResponseDtoList.getContent();


        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, contents), HttpStatus.OK);
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
        String imageUrl = null;

        // 여기서 마지막 파일의 URL만 반환됩니다. 여러 파일의 경우 로직 변경이 필요합니다.
        imageUrl = s3Uploader.upload(file, "article");


        return ResponseEntity.ok(imageUrl);
    }

    @PostMapping("/images")
    @ResponseBody
    public ResponseEntity<List<String>> uploads(@ModelAttribute ImageForm form) throws IOException {
        List<MultipartFile> files = form.getUploadFile();
        List<String> imageUrl = null;

        // 여기서 마지막 파일의 URL만 반환됩니다. 여러 파일의 경우 로직 변경이 필요합니다.
        for (MultipartFile file : files) {
            imageUrl.add(s3Uploader.upload(file, "article"));
        }

        return ResponseEntity.ok(imageUrl);
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
