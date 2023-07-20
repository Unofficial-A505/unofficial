package com.example.Strange505.lunch.service;

import com.example.Strange505.lunch.Lunch;
import jakarta.transaction.Transactional;

import java.util.List;

public interface LunchService {
    List<Lunch> getTodayLunch(String date);

    List<Lunch> getLunches();

    boolean forceCron() throws Exception;

    @Transactional
    boolean like(long id);
}
