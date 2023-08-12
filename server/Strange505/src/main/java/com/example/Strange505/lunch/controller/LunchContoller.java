package com.example.Strange505.lunch.controller;

import com.example.Strange505.lunch.DateUtil;
import com.example.Strange505.lunch.domain.Lunch;
import com.example.Strange505.lunch.responseDTO.LunchResponseDto;
import com.example.Strange505.lunch.service.LunchLikeService;
import com.example.Strange505.lunch.service.LunchService;
import com.example.Strange505.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lunch")
@RequiredArgsConstructor
public class LunchContoller {

    private final LunchService lunchService;
    private final LunchLikeService lunchLikeService;
    private final AuthService authService;

    @GetMapping
    ResponseEntity<List<LunchResponseDto>> getTodayLunch(@RequestParam(value = "date", required = false) String date) {
        if (date != null) {
            return ResponseEntity.status(HttpStatus.OK).body(lunchService.getTodayLunch(date));
        }
        return ResponseEntity.status(HttpStatus.OK).body(lunchService.getTodayLunch(DateUtil.getToday(0)));
    }

    @GetMapping("/all")
    ResponseEntity<List<LunchResponseDto>> getAllLunch() {
        return ResponseEntity.status(HttpStatus.OK).body(lunchService.getLunches());
    }

    @GetMapping("/doCron")
    ResponseEntity<Boolean> forceCron() throws Exception {
        lunchService.forceCron();
        return ResponseEntity.status(HttpStatus.OK).body(Boolean.TRUE);
    }


    @PostMapping("/like/{lunchId}")
    ResponseEntity<Long> like(@PathVariable Long lunchId, @RequestHeader("Authorization") String accessToken) {
        Long userId = authService.extractID(accessToken);
        return ResponseEntity.status(HttpStatus.OK).body(lunchLikeService.like(lunchId, userId));
    }

    @DeleteMapping("/dislike/{lunchId}")
    ResponseEntity<Long> cancelLike(@PathVariable long lunchId, @RequestHeader("Authorization") String accessToken) {
        Long userId = authService.extractID(accessToken);
        return ResponseEntity.status(HttpStatus.OK).body(lunchLikeService.dislike(lunchId, userId));
    }
}
