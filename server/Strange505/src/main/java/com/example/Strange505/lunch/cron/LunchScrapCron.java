package com.example.Strange505.lunch.cron;

import com.example.Strange505.lunch.Lunch;
import com.example.Strange505.lunch.repository.LunchRepository;
import com.example.Strange505.lunch.scraper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LunchScrapCron {

    LocalScraper localScraper;
    LunchRepository lunchRepository;

    @Autowired
    public LunchScrapCron(LunchRepository lunchRepository) {
        this.lunchRepository = lunchRepository;
    }

    @Scheduled(cron = "0 0 3 ? * SUN")
    public void cronJob() throws Exception {
        localScraper = new SeoulScraper();
        List<Lunch> lunches = localScraper.getWeeklyMenu();
        updateMenu(lunches);

        localScraper = new GumiScraper();
        lunches = localScraper.getWeeklyMenu();
        updateMenu(lunches);

        localScraper = new BusanScraper();
        lunches = localScraper.getWeeklyMenu();
        updateMenu(lunches);

        localScraper = new GwangjuScraper();
        lunches = localScraper.getWeeklyMenu();
        updateMenu(lunches);
    }


    @Scheduled(cron = "0 10 11 ? * MON-FRI")
    public void gwangjuCron() throws Exception {
        localScraper = new GwangjuScraper();
        List<Lunch> lunches = localScraper.getWeeklyMenu();
        updateMenu(lunches);
    }

    public void updateMenu(List<Lunch> lunches) {
        for (Lunch lunch : lunches) {
            Lunch fromDB = lunchRepository.findByDateAndLocalAndCourseName(lunch.getDate(), lunch.getLocal(), lunch.getCourseName());
            if (lunch.equals(fromDB)) {
                lunch.setId(fromDB.getId());
                lunch.setLikes(fromDB.getLikes());
            }
            lunchRepository.save(lunch);
        }
    }


}
