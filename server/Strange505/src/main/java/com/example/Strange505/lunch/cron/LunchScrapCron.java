package com.example.Strange505.lunch.cron;

import com.example.Strange505.lunch.DateUtil;
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
    public void cronJobNextWeek() throws Exception {
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

    @Scheduled(cron = "0 0 7 * * 0-4")
    public void dailyCron() throws Exception {
        localScraper = new GwangjuScraper();
        List<Lunch> lunches = localScraper.getWeeklyMenu();
        updateMenu(lunches);

        localScraper = new GumiScraper();
        lunches = localScraper.getDailyMenu(DateUtil.getToday(1));
        updateMenu(lunches);

    }

    @Scheduled(cron = "0 10 11 ? * 1-5")
    public void dailyCronImg() throws Exception {
        localScraper = new GwangjuScraper();
        List<Lunch> lunches = localScraper.getWeeklyMenu();
        updateMenu(lunches);

        localScraper = new GumiScraper();
        lunches = localScraper.getDailyMenu(DateUtil.getToday(0));
        updateMenu(lunches);

    }

    public void forceCron() throws Exception {

        localScraper = new GumiScraper();
        List<Lunch> lunches = localScraper.getDailyMenu(DateUtil.getToday(0));
        updateMenu(lunches);

        localScraper = new SeoulScraper();
        lunches = localScraper.getDailyMenu(DateUtil.getToday(0));
        updateMenu(lunches);

        localScraper = new BusanScraper();
        lunches = localScraper.getDailyMenu(DateUtil.getToday(0));
        updateMenu(lunches);

        localScraper = new GwangjuScraper();
        lunches = localScraper.getDailyMenu(DateUtil.getToday(0));
        updateMenu(lunches);

    }

    public void updateMenu(List<Lunch> lunches) {
        for (Lunch lunch : lunches) {
            System.out.println(lunch);
            Lunch fromDB = lunchRepository.findByDateAndLocalAndCourseName(lunch.getDate(), lunch.getLocal(), lunch.getCourseName());
            if (lunch.equals(fromDB)) {
                lunch.setId(fromDB.getId());
                lunch.setLikes(fromDB.getLikes());
            }
            lunchRepository.save(lunch);
        }
    }
}
