package com.example.Strange505.lunch;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateUtil {

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

    public static String getToday(int i) {
        LocalDate currentDate = LocalDate.now();
        LocalDate today = currentDate.plusDays(i);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        return today.format(formatter);
    }

}
