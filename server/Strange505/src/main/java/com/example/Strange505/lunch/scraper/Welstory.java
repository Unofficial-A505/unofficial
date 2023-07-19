package com.example.Strange505.lunch.scraper;

import com.example.Strange505.lunch.Menu;
import com.example.Strange505.lunch.RestUtil;
import com.example.Strange505.lunch.responseDTO.WelstoryDTO;
import com.example.Strange505.lunch.responseDTO.WelstoryMeal;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.naming.AuthenticationException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    public List<Menu> getMenu(String date, String location) throws Exception {
        StringBuilder params = new StringBuilder();
        params.append("?")
                .append("menuDt=").append(date).append("&")
                .append("menuMealType=2").append("&")
                .append("restaurantCode=").append(restaurantCode.get(location));

        List<Menu> menus = new ArrayList<>();

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
            Menu menu = new Menu();
            menu.setDate(date);
            menu.setLocal(location);
            menu.setName(meal.getMenuName() + " (" + meal.getSumKcal() + ")");
            menu.setImageUrl(meal.getPhotoUrl() + meal.getPhotoCd());
            menu.setRestaurantId(restaurantCode.get(location));
            menu.setDetail(meal.getSubMenuTxt());
            menus.add(menu);
        }

        return menus;
    }

    public List<Menu> getMealForNextWeek(String location) throws Exception {
        List<Menu> menus = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            String date = getNextMonday(i);
            List<Menu> dayMenu = getMenu(date, location);
            menus.addAll(dayMenu);
        }
        return menus;
    }

    public static String getNextMonday(int i) {
        LocalDate currentDate = LocalDate.now();
        DayOfWeek currentDayOfWeek = currentDate.getDayOfWeek();
        int daysUntilNextMonday = DayOfWeek.MONDAY.getValue() - currentDayOfWeek.getValue();

        if (daysUntilNextMonday <= 0) {
            // 이미 오늘이 월요일인 경우 다음주 월요일로 넘김
            daysUntilNextMonday += 7;
        }

        LocalDate nextMonday = currentDate.plusDays(daysUntilNextMonday + i);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        return nextMonday.format(formatter);
    }

}
