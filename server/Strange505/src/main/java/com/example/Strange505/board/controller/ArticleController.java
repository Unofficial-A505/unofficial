package com.example.Strange505.board.controller;


import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.ArticleResponseDto;
import com.example.Strange505.board.dto.BoardRequestDto;
import com.example.Strange505.board.service.ArticleService;
import com.example.Strange505.board.service.BoardService;
import com.example.Strange505.user.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final AuthService authService;
    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<?> registerArticle(@RequestHeader("Authorization") String accessToken,
                                             @RequestBody ArticleRequestDto dto) {
        Long userId = authService.extractionID(accessToken);
        if (userId == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
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
        List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();

        articles.stream().forEach(findArticle -> articleResponseDtoList.add(
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime())));

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/title")
    public ResponseEntity<List<ArticleResponseDto>> getArticlesByTitle(@RequestParam String title, @RequestParam Long boardId) {
        List<Article> articles = articleService.getArticlesByTitle(title, boardId);
        List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();

        articles.stream().forEach(findArticle -> articleResponseDtoList.add(
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime())));

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }


    @GetMapping("/content")
    public ResponseEntity<List<ArticleResponseDto>> getArticlesByContent(@RequestParam String content, @RequestParam Long boardId) {
        List<Article> articles = articleService.getArticlesByContent(content, boardId);
        List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();

        articles.stream().forEach(findArticle -> articleResponseDtoList.add(
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime())));

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<ArticleResponseDto>> getArticlesByUser(@RequestHeader("Authorization") String accessToken) {
        Long userId = authService.extractionID(accessToken);
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
}
