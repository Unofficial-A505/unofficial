package com.example.Strange505.board.controller;


import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.ArticleResponseDto;
import com.example.Strange505.board.dto.ImageForm;
import com.example.Strange505.board.service.ArticleLikeService;
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
    private final ArticleLikeService articleLikeService;

    @PostMapping
    public ResponseEntity<?> registerArticle(@RequestBody ArticleRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        ArticleResponseDto responseDto = articleService.createArticle(dto, email);
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
        // 조회수 증가
        addViewCount(id, req, res);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        ArticleResponseDto responseDto = articleService.getArticleById(id, email);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<PageResponseDto<ArticleResponseDto>> getAllArticles(Pageable pageable) {
        Page<ArticleResponseDto> responseDtoList = articleService.getAllArticles(pageable);

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", responseDtoList.getTotalElements());
        pageInfo.put("totalPages", responseDtoList.getTotalPages());
        List<ArticleResponseDto> contents = responseDtoList.getContent();


        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, contents), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponseDto<ArticleResponseDto>> getArticlesByTitleAndContent(@RequestParam String keyword, @RequestParam Long boardId, Pageable pageable) {
        Page<ArticleResponseDto> responseDtoList = articleService.getArticlesByTitleAndContent(keyword, boardId, pageable);

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", responseDtoList.getTotalElements());
        pageInfo.put("totalPages", responseDtoList.getTotalPages());
        List<ArticleResponseDto> contents = responseDtoList.getContent();

        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, contents), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<PageResponseDto<ArticleResponseDto>> getArticlesByUser(Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Page<ArticleResponseDto> responseDtoList = articleService.getArticlesByUser(email, pageable);

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", responseDtoList.getTotalElements());
        pageInfo.put("totalPages", responseDtoList.getTotalPages());
        List<ArticleResponseDto> contents = responseDtoList.getContent();

        return new ResponseEntity<>(new PageResponseDto<>(pageInfo, contents), HttpStatus.OK);
    }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<PageResponseDto<ArticleResponseDto>> getArticlesByBoard(@PathVariable Long boardId, Pageable pageable) {
        Page<ArticleResponseDto> responseDtoList = articleService.getArticlesByBoard(boardId, pageable);

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("page", pageable.getPageNumber());
        pageInfo.put("size", pageable.getPageSize());
        pageInfo.put("totalElements", responseDtoList.getTotalElements());
        pageInfo.put("totalPages", responseDtoList.getTotalPages());
        List<ArticleResponseDto> contents = responseDtoList.getContent();


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
}
