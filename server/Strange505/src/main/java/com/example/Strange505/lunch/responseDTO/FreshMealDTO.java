package com.example.Strange505.lunch.responseDTO;

import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
public class FreshMealDTO {
    Map<String, Map<String, List<Meal>>> data;
    String date;
    String retCode;
    String retMsg;
    String status;

}
