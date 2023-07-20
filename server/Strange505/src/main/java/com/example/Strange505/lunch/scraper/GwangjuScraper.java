package com.example.Strange505.lunch.scraper;

import com.example.Strange505.lunch.Lunch;
import com.example.Strange505.lunch.RestUtil;
import com.example.Strange505.lunch.responseDTO.FreshMealDTO;
import com.example.Strange505.lunch.responseDTO.Meal;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;

public class GwangjuScraper {
    private static final String url = "https://front.cjfreshmeal.co.kr/meal/v1/week-meal?storeIdx=6442&weekType=1";


    public static void main(String[] args) throws Exception {
        getWeeklyMenu();
    }

    public List<Lunch> getDailyMenu(String date) {
        return null;
    }


    public List<Lunch> getWeeklyMenu() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);   // 없는 필드 있어도 에러 안나게
        FreshMealDTO freshMeal = objectMapper.readValue(RestUtil.requestGet(url, new HashMap<>()), FreshMealDTO.class);

        List<Lunch> res = new ArrayList<>();
        for (String d : day.keySet()) {
            List<Meal> meals = freshMeal.getData().get(d).get(day.get(d));
            for (Meal meal : meals) {
                if (!corners.contains(meal.getCorner())) {
                    continue;
                }
                Lunch lunch = new Lunch();
                lunch.setDate(meal.getMealDt());
                lunch.setLocal(location);
                lunch.setName(meal.getName() + " (" + meal.getKcal() + ")");
                lunch.setImageUrl(meal.getThumbnailUrl());
                lunch.setRestaurantId(restaurantCode);
                lunch.setDetail(meal.getSide());
                lunch.setCourseName(meal.getCorner());
                res.add(lunch);
            }
        }
        return res;
    }
}
