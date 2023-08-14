package com.example.Strange505.lunch.scraper;

import com.example.Strange505.lunch.DateUtil;
import com.example.Strange505.lunch.domain.Lunch;
import com.example.Strange505.lunch.RestUtil;
import com.example.Strange505.lunch.responseDTO.WelstoryDTO;
import com.example.Strange505.lunch.responseDTO.WelstoryMeal;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.naming.AuthenticationException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Welstory {
    private static String JSESSIONID = "";
    private static final String url = "https://welplus.welstory.com";
    private static final String mealPath = "/api/meal";
    private static final String loginPath = "/login";
    private static final String loginId = "fv00245";
    private static final String password = "$wogus30711";

    private static final Map<String, String> restaurantCode = new HashMap<String, String>() {
        {
            put("서울", "REST000133");
            put("구미", "REST000213");
            put("부울경", "REST000595");
        }
    };
    private static Welstory welstory = null;

    private Welstory() {
    }

    public static Welstory getInstance() throws Exception {
        if (welstory != null) {
            return welstory;
        }
        return new Welstory();
    }

    private void refreshJsession() throws Exception {
        Map<String, String> payloads = new HashMap<>();
        payloads.put("username", loginId);
        payloads.put("password", password);
        payloads.put("remember-me", "true");
        String response = RestUtil.requestPostGetHeader(url, loginPath, payloads);
        JSESSIONID = response.split("JSESSIONID=")[1].split(";")[0];
        System.out.println("JSESSIONID has been updated" + JSESSIONID);
    }

    public List<Lunch> getMenu(String date, String location) throws Exception {
        StringBuilder params = new StringBuilder();
        params.append("?")
                .append("menuDt=").append(date).append("&")
                .append("menuMealType=2").append("&")
                .append("restaurantCode=").append(restaurantCode.get(location));

        List<Lunch> lunches = new ArrayList<>();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);   // 없는 필드 있어도 에러 안나게
        Map<String, String> header = new HashMap<>();
        header.put("Cookie", "JSESSIONID=" + JSESSIONID);
        WelstoryDTO welstoryData = null;
        try {
            String mealJson = RestUtil.requestGet(url + mealPath + params, header);
            welstoryData = objectMapper.readValue(mealJson, WelstoryDTO.class);
        } catch (AuthenticationException e) {
            refreshJsession();
            header.put("Cookie", "JSESSIONID=" + JSESSIONID);
            String mealJson = RestUtil.requestGet(url + mealPath + params, header);
            welstoryData = objectMapper.readValue(mealJson, WelstoryDTO.class);
        }

        for (WelstoryMeal meal : welstoryData.getData().get("mealList")) {
            if (meal.getCourseTxt().startsWith("T/O") || meal.getCourseTxt().startsWith("D")) {
                continue;
            }
            Lunch lunch = new Lunch();
            lunch.setDate(date);
            lunch.setLocal(location);
            lunch.setName(meal.getMenuName() + " (" + meal.getSumKcal() + ")");
            if (meal.getPhotoCd()!=null) {
                lunch.setImageUrl(meal.getPhotoUrl() + meal.getPhotoCd());
            } else {
                lunch.setImageUrl("");
            }
            lunch.setRestaurantId(restaurantCode.get(location));
            lunch.setDetail(meal.getSubMenuTxt());
            lunch.setCourseName(meal.getCourseTxt());
            lunch.setLikes(0L);
            lunches.add(lunch);
        }

        return lunches;
    }

    public List<Lunch> getMealForNextWeek(String location) throws Exception {
        List<Lunch> lunches = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            String date = DateUtil.getNextMonday(i);
            List<Lunch> dayMenu = getMenu(date, location);
            lunches.addAll(dayMenu);
        }
        return lunches;
    }


}
