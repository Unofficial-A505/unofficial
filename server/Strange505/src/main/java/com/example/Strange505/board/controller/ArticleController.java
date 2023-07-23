package com.example.Strange505.board.controller;


import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.ArticleResponseDto;
import com.example.Strange505.board.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/article")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @PostMapping
    public void registerArticle(@RequestBody ArticleRequestDto dto, String jwt) {
        articleService.createArticle(dto, jwt);
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

    @GetMapping("/{title}")
    public ResponseEntity<List<Article>> getArticlesByTitle() {

    }


    @GetMapping("/{id}")
    public ResponseEntity<>
}
