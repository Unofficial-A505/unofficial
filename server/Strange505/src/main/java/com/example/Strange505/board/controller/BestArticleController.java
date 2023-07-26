package com.example.Strange505.board.controller;

import com.example.Strange505.board.dto.BestArticleResponseDto;
import com.example.Strange505.board.service.BestArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/best")
@RequiredArgsConstructor
public class BestArticleController {

    private final BestArticleService bestArticleService;

    @GetMapping
    public ResponseEntity<List<BestArticleResponseDto>> getAllBestArticles() {
        List<BestArticleResponseDto> result = bestArticleService.getAllBestArticles();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
