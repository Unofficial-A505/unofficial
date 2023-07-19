package com.example.Strange505.lunch.scraper;

import com.example.Strange505.lunch.Menu;

import java.util.List;

public class BusanScraper implements LocalScraper {
    private final String location = "부울경";
    Welstory welstory;

    @Override
    public boolean getDailyMenu(String date) throws Exception {
        welstory = Welstory.getInstance();
        List<Menu> res = welstory.getMenu(date, location);
        if (res != null && res.size() > 0) {
            return true;
        }
        return false;
    }

    @Override
    public boolean getWeeklyMenu() {
        return false;
    }
}
