package com.example.Strange505.lunch.service;

import com.example.Strange505.lunch.domain.Lunch;
import com.example.Strange505.lunch.responseDTO.LunchResponseDto;
import jakarta.transaction.Transactional;

import java.util.List;

public interface LunchService {
    List<LunchResponseDto> getTodayLunch(String date, Long userId);

    List<LunchResponseDto> getLunches(Long userId);

    boolean forceCron() throws Exception;

}
