package com.example.Strange505.lunch.service;

import com.example.Strange505.lunch.domain.Lunch;
import com.example.Strange505.lunch.cron.LunchScrapCron;
import com.example.Strange505.lunch.repository.LunchRepository;
import com.example.Strange505.lunch.responseDTO.LunchResponseDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LunchServiceImpl implements LunchService {
    private final LunchRepository lunchRepository;
    private final LunchScrapCron lunchScrapCron;
    private final LunchLikeService lunchLikeService;


    @Override
    public List<LunchResponseDto> getTodayLunch(String date, Long userId) {
        List<Lunch> lunches = lunchRepository.findByDate(date);
        List<LunchResponseDto> lunchesResponse =  null;
        if (userId != null) {
            lunchesResponse
                    = lunches.stream().map((lunch) -> new LunchResponseDto(lunch, lunchLikeService.checkExist(lunch.getId(), userId) , lunchLikeService.countLike(lunch.getId()))).toList();
        } else {
            lunchesResponse
                    = lunches.stream().map((lunch) ->  new LunchResponseDto(lunch, false, lunchLikeService.countLike(lunch.getId()))).toList();
        }
        return lunchesResponse;
    }

    @Override
    public List<LunchResponseDto> getLunches(Long userId) {
        List<Lunch> lunches = lunchRepository.findAll();
        List<LunchResponseDto> lunchesResponse =  null;
        if (userId != null) {
            lunchesResponse
                    = lunches.stream().map((lunch) -> new LunchResponseDto(lunch, lunchLikeService.checkExist(lunch.getId(), userId) , lunchLikeService.countLike(lunch.getId()))).toList();
        } else {
            lunchesResponse
                    = lunches.stream().map((lunch) ->  new LunchResponseDto(lunch, false, lunchLikeService.countLike(lunch.getId()))).toList();
        }
        return lunchesResponse;
    }

    @Override
    public boolean forceCron() throws Exception {
        lunchScrapCron.forceCron();
        return true;
    }

}
