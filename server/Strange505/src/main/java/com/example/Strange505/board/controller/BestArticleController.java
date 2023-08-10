package com.example.Strange505.board.controller;

import com.example.Strange505.board.dto.BestArticleResponseDto;
import com.example.Strange505.board.service.BestArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "BestArticle", description = "베스트 게시글 API")
public class BestArticleController {

    private final BestArticleService bestArticleService;

    @GetMapping
    @Operation(summary = "베스트 게시글 모두 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "베스트 게시글 조회에 성공했습니다."),
            @ApiResponse(responseCode = "500", description = "게시판 등록 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<List<BestArticleResponseDto>> getAllBestArticles() {
        List<BestArticleResponseDto> result = bestArticleService.getAllBestArticles();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
