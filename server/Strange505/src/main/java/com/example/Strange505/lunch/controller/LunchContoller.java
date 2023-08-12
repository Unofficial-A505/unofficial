package com.example.Strange505.lunch.controller;

import com.example.Strange505.lunch.DateUtil;
import com.example.Strange505.lunch.domain.Lunch;
import com.example.Strange505.lunch.service.LunchService;
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

    @GetMapping
    ResponseEntity<List<Lunch>> getTodayLunch(@RequestParam(value = "date", required = false) String date) {
        if (date != null) {
            return ResponseEntity.status(HttpStatus.OK).body(lunchService.getTodayLunch(date));
        }
        return ResponseEntity.status(HttpStatus.OK).body(lunchService.getTodayLunch(DateUtil.getToday(0)));
    }

    @GetMapping("/all")
    ResponseEntity<List<Lunch>> getAllLunch() {
        return ResponseEntity.status(HttpStatus.OK).body(lunchService.getLunches());
    }

    @GetMapping("/doCron")
    ResponseEntity<Boolean> forceCron() throws Exception {
        lunchService.forceCron();
        return ResponseEntity.status(HttpStatus.OK).body(Boolean.TRUE);
    }


    @GetMapping("/like/{lunchId}")
    ResponseEntity<Boolean> like(@PathVariable long lunchId) {
        if (lunchService.like(lunchId)) {
            return ResponseEntity.status(HttpStatus.OK).body(Boolean.TRUE);
        }
        return ResponseEntity.status(HttpStatus.OK).body(Boolean.FALSE);
    }

}
