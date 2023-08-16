package com.example.Strange505.lunch.scraper;

import com.example.Strange505.lunch.domain.Lunch;
import com.example.Strange505.lunch.RestUtil;
import com.example.Strange505.lunch.responseDTO.FreshMealDTO;
import com.example.Strange505.lunch.responseDTO.Meal;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;

public class GwangjuScraper implements LocalScraper {
    private final String urlThisWeek = "https://front.cjfreshmeal.co.kr/meal/v1/week-meal?storeIdx=6444&weekType=1";
    private final String url = "https://front.cjfreshmeal.co.kr/meal/v1/week-meal?storeIdx=6444&weekType=2";
    private final String location = "광주";
    private final Set<String> corners = new HashSet<>() {{
        add("소담상");
        add("육수고집");
        add("더고메");
        add("차이나호");
        add("속이찬새참(라면)");
    }};
    private final String restaurantCode = "6442";
    private final Map<String, String> day = new HashMap<String, String>() {
        {
            put("mo", "2");
            put("tu", "2");
            put("we", "2");
            put("th", "2");
            put("fr", "2");
        }
    };

    public List<Lunch> getDailyMenu(String date) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);   // 없는 필드 있어도 에러 안나게
        FreshMealDTO freshMeal = objectMapper.readValue(RestUtil.requestGet(urlThisWeek, new HashMap<>()), FreshMealDTO.class);

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
                lunch.setLikes(0L);
                res.add(lunch);
            }
        }
        return res;
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
                lunch.setLikes(0L);
                res.add(lunch);
            }
        }
        return res;
    }
}
