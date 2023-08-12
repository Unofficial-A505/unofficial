package com.example.Strange505.lunch.scraper;

import com.example.Strange505.lunch.domain.Lunch;

import java.util.List;

public interface LocalScraper {
    public List<Lunch> getDailyMenu(String date) throws Exception;

    public List<Lunch> getWeeklyMenu() throws Exception;
}
