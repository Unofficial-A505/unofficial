package com.example.Strange505.lunch.cron;

import com.example.Strange505.lunch.scraper.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class LunchScrapCron {

    LocalScraper localScraper;

    @Scheduled(cron = "0 0 3 ? * SUN")
    public void cronJob() throws Exception {
        localScraper = new SeoulScraper();
        localScraper.getWeeklyMenu();
        localScraper = new GumiScraper();
        localScraper.getWeeklyMenu();
        localScraper = new BusanScraper();
        localScraper.getWeeklyMenu();
        localScraper = new GwangjuScraper();
        localScraper.getWeeklyMenu();
    }

}
