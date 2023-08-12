package com.example.Strange505.lunch.service;

import com.example.Strange505.lunch.domain.Lunch;
import com.example.Strange505.lunch.cron.LunchScrapCron;
import com.example.Strange505.lunch.repository.LunchRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LunchServiceImpl implements LunchService {
    LunchRepository lunchRepository;
    LunchScrapCron lunchScrapCron;

    public LunchServiceImpl(LunchRepository lunchRepository, LunchScrapCron lunchScrapCron) {
        this.lunchRepository = lunchRepository;
        this.lunchScrapCron = lunchScrapCron;
    }

    @Override
    public List<Lunch> getTodayLunch(String date) {
        return lunchRepository.findByDate(date);
    }

    @Override
    public List<Lunch> getLunches() {
        return lunchRepository.findAll();
    }

    @Override
    public boolean forceCron() throws Exception {
        lunchScrapCron.forceCron();
        return true;
    }

    @Override
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
