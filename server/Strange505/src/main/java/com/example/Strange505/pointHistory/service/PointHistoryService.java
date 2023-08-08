package com.example.Strange505.pointHistory.service;

import com.example.Strange505.dto.PageResponseDto;
import com.example.Strange505.pointHistory.dto.PointHistoryDto;
import com.example.Strange505.pointHistory.dto.PointHistoryResponseDto;
import org.springframework.data.domain.Pageable;

public interface PointHistoryService {
    PageResponseDto<PointHistoryResponseDto> getPointHistories(Long userId, Pageable pageable);

    boolean putNewPointHistory(PointHistoryDto pointHistoryDto);
}
