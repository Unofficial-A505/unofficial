package com.example.Strange505.pointHistory.controller;

import com.example.Strange505.dto.PageResponseDto;
import com.example.Strange505.pointHistory.dto.PointHistoryResponseDto;
import com.example.Strange505.pointHistory.service.PointHistoryService;
import com.example.Strange505.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/point")
@RequiredArgsConstructor
public class PointHistoryController {

    private final PointHistoryService pointHistoryService;
    private final AuthService authService;

    @GetMapping("/history")
    public ResponseEntity<PageResponseDto<PointHistoryResponseDto>> getPointHistory(@RequestHeader("Authorization") String accessToken, Pageable pageable) {
        Long id = authService.extractID(accessToken);
        return ResponseEntity.status(HttpStatus.OK).body(pointHistoryService.getPointHistories(id, pageable));
    }

}
