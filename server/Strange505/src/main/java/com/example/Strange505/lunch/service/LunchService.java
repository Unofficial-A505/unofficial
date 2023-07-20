package com.example.Strange505.lunch.service;

import com.example.Strange505.lunch.Lunch;
import com.example.Strange505.lunch.cron.LunchScrapCron;
import com.example.Strange505.lunch.repository.LunchRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LunchService {
    LunchRepository lunchRepository;
    LunchScrapCron lunchScrapCron;

    public LunchService(LunchRepository lunchRepository, LunchScrapCron lunchScrapCron) {
        this.lunchRepository = lunchRepository;
        this.lunchScrapCron = lunchScrapCron;
    }

    public List<Lunch> getTodayLunch(String date) {
        return lunchRepository.findByDate(date);
    }

    public List<Lunch> getLunches() {
        return lunchRepository.findAll();
    }

    public boolean forceCron() throws Exception {
        lunchScrapCron.cronJob();
        return true;
    }

    @Transactional
    public boolean like(long id) {
        Lunch lunch = lunchRepository.findById(id).get();
        if (lunch != null) {
            lunch.setLikes(lunch.getLikes() + 1);
            lunchRepository.save(lunch);
            return true;
        }
        return false;
    }
}
