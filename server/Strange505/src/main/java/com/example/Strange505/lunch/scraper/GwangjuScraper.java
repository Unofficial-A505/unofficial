package com.example.Strange505.lunch.scraper;

import com.example.Strange505.lunch.RestUtil;
import com.example.Strange505.lunch.responseDTO.FreshMealDTO;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;

public class GwangjuScraper {
    private static final String url = "https://front.cjfreshmeal.co.kr/meal/v1/week-meal?storeIdx=6442&weekType=1";


    public static void main(String[] args) throws Exception {
        getWeeklyMenu();
    }

    public boolean getDailyMenu() {
        return false;
    }


    public static boolean getWeeklyMenu() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);   // 없는 필드 있어도 에러 안나게

        FreshMealDTO freshMeal = objectMapper.readValue(RestUtil.requestGet(url, new HashMap<>()), FreshMealDTO.class);

        System.out.println(freshMeal.getData().get("tu").get("1").get(1).getName()); //sample

        return false;
    }
}
