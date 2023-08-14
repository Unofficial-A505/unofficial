package com.example.Strange505.board.controller;

import com.example.Strange505.board.dto.ArticleLikeRequestDto;
import com.example.Strange505.board.service.ArticleLikeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
@Tag(name = "ArticleLike", description = "게시글 좋아요 API")
public class ArticleLikeController {

    public final ArticleLikeService articleLikeService;

    @PostMapping
    @Operation(summary = "게시글 좋아요")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 좋아요에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "회원이 아니므로 좋아요할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "게시판 좋아요 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<?> like(@RequestBody ArticleLikeRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        articleLikeService.like(dto, email);
        return new ResponseEntity(HttpStatus.OK);
    }
}
