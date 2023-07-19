package com.example.Strange505.lunch.scraper;

public interface LocalScraper {
    public boolean getDailyMenu(String date) throws Exception;

    public boolean getWeeklyMenu() throws Exception;
}
