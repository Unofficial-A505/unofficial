package com.example.Strange505.lunch.service;

import com.example.Strange505.lunch.domain.Lunch;
import com.example.Strange505.lunch.cron.LunchScrapCron;
import com.example.Strange505.lunch.repository.LunchRepository;
import com.example.Strange505.lunch.responseDTO.LunchResponseDto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class LunchServiceImpl implements LunchService {
    LunchRepository lunchRepository;
    LunchScrapCron lunchScrapCron;
    LunchLikeService lunchLikeService;

    public LunchServiceImpl(LunchRepository lunchRepository, LunchScrapCron lunchScrapCron) {
        this.lunchRepository = lunchRepository;
        this.lunchScrapCron = lunchScrapCron;
    }

    @Override
    public List<LunchResponseDto> getTodayLunch(String date) {
        List<Lunch> lunches = lunchRepository.findByDate(date);
        List<LunchResponseDto> lunchesResponse
                = lunches.stream().map((lunch) ->  new LunchResponseDto(lunch, false, lunchLikeService.countLike(lunch.getId()))).toList();
        return lunchesResponse;
    }

    @Override
    public List<LunchResponseDto> getLunches() {
        List<Lunch> lunches = lunchRepository.findAll();
        List<LunchResponseDto> lunchesResponse
                = lunches.stream().map((lunch) -> new LunchResponseDto(lunch, false, lunchLikeService.countLike(lunch.getId()))).toList();
        return lunchesResponse;
    }

    @Override
    public boolean forceCron() throws Exception {
        lunchScrapCron.forceCron();
        return true;
    }

}
