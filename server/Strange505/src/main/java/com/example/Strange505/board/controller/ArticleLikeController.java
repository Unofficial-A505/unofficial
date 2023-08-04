package com.example.Strange505.board.controller;

import com.example.Strange505.board.dto.ArticleLikeRequestDto;
import com.example.Strange505.board.service.ArticleLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class ArticleLikeController {

    public final ArticleLikeService articleLikeService;

    @PostMapping
    public ResponseEntity<?> like(@RequestBody ArticleLikeRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        articleLikeService.like(dto, email);
        return new ResponseEntity(HttpStatus.OK);
    }

//    @DeleteMapping
//    public ResponseEntity<?> cancel(@RequestBody ArticleLikeRequestDto dto) {
//        articleLikeService.cancel(dto);
//        return new ResponseEntity(HttpStatus.OK);
//    }
}
