package com.example.Strange505.lunch.cron;

import com.example.Strange505.file.service.S3UploaderService;
import com.example.Strange505.lunch.DateUtil;
import com.example.Strange505.lunch.ImageResizeUtil;
import com.example.Strange505.lunch.domain.Lunch;
import com.example.Strange505.lunch.repository.LunchRepository;
import com.example.Strange505.lunch.scraper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Component
public class LunchScrapCron {
    private final int WIDTH=404;
    private final int HEIGHT=280;

    LocalScraper localScraper;
    LunchRepository lunchRepository;
    S3UploaderService s3Uploader;

    @Autowired
    public LunchScrapCron(LunchRepository lunchRepository, S3UploaderService s3UploaderService) {
        this.lunchRepository = lunchRepository;
        this.s3Uploader = s3UploaderService;
    }

    @Scheduled(cron = "0 0 3 ? * SUN", zone = "Asia/Seoul")
    public void cronJobNextWeek() throws Exception {
        localScraper = new SeoulScraper();
        List<Lunch> lunches = localScraper.getWeeklyMenu();
        updateMenu(lunches);

        localScraper = new BusanScraper();
        lunches = localScraper.getWeeklyMenu();
        updateMenu(lunches);

        localScraper = new GwangjuScraper();
        lunches = localScraper.getWeeklyMenu();
        updateMenu(lunches);

    }

    @Scheduled(cron = "0 0 23 ? * FRI", zone = "Asia/Seoul")
    public void cronJobNextWeek2() throws Exception {
        localScraper = new SeoulScraper();
        List<Lunch> lunches = localScraper.getDailyMenu(DateUtil.getNextMonday(0));
        updateMenu(lunches);

        localScraper = new GumiScraper();
        lunches = localScraper.getDailyMenu(DateUtil.getNextMonday(0));
        updateMenu(lunches);

        localScraper = new BusanScraper();
        lunches = localScraper.getDailyMenu(DateUtil.getNextMonday(0));
        updateMenu(lunches);

        localScraper = new GwangjuScraper();
        lunches = localScraper.getWeeklyMenu();
        updateMenu(lunches);

    }

    @Scheduled(cron = "0 0 7 * * 0-4", zone = "Asia/Seoul")
    public void dailyCron() throws Exception {
        localScraper = new GwangjuScraper();
        List<Lunch> lunches = localScraper.getDailyMenu(DateUtil.getToday(1));
        updateMenu(lunches);

        localScraper = new GumiScraper();
        lunches = localScraper.getDailyMenu(DateUtil.getToday(1));
        updateMenu(lunches);

        localScraper = new BusanScraper();
        lunches = localScraper.getDailyMenu(DateUtil.getNextMonday(1));
        updateMenu(lunches);

    }

    @Scheduled(cron = "0 10 11 ? * 1-5", zone = "Asia/Seoul")
    public void dailyCronImg() throws Exception {
        localScraper = new GwangjuScraper();
        List<Lunch> lunches = localScraper.getDailyMenu(DateUtil.getToday(0));
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

    public void updateMenu(List<Lunch> lunches) throws Exception {
        for (Lunch lunch : lunches) {
            System.out.println(lunch);
            Lunch fromDB = lunchRepository.findByDateAndLocalAndCourseName(lunch.getDate(), lunch.getLocal(), lunch.getCourseName()).orElse(null);
            if (lunch.equals(fromDB)) {
                lunch.setId(fromDB.getId());
                lunch.setLikes(fromDB.getLikes());
            }
            if (fromDB != null && fromDB.getImageUrl().startsWith("https://505bucket")) {
                lunch.setImageUrl(fromDB.getImageUrl());
            } else if (!lunch.getImageUrl().equals("")) {
                lunch.setImageUrl(upload(lunch.getImageUrl()));
            }
            lunchRepository.save(lunch);
        }
    }

    public String upload(String url) throws Exception {
        ByteArrayOutputStream baos = ImageResizeUtil.imageResize(url, WIDTH, HEIGHT);
        String[] urlDiv = url.split("/");
        return s3Uploader.putS3(baos, urlDiv[urlDiv.length-1]);
    }
}
