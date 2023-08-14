package com.example.Strange505.lunch.scraper;

import com.example.Strange505.lunch.domain.Lunch;

import java.util.List;

public class GumiScraper implements LocalScraper {
    private final String location = "구미";
    Welstory welstory;

    @Override
    public List<Lunch> getDailyMenu(String date) throws Exception {
        welstory = Welstory.getInstance();
        List<Lunch> res = welstory.getMenu(date, location);
        return res;
    }

    @Override
    public List<Lunch> getWeeklyMenu() throws Exception {
        welstory = Welstory.getInstance();
        List<Lunch> res = welstory.getMealForNextWeek(location);
        return res;
    }
}
