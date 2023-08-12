package com.example.Strange505.lunch.responseDTO;

import com.example.Strange505.lunch.domain.Lunch;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class LunchResponseDto {
    private Long id;
    private String date;
    private String restaurantId;
    private String imageUrl;
    private String name;
    private String detail;
    private Long likes;
    private String local;
    private String courseName;
    private Boolean isLike;

    public LunchResponseDto(Lunch lunch, Boolean isLike) {
        this.isLike = isLike;
        this.id = lunch.getId();
        this.date = lunch.getDate();
        this.restaurantId = lunch.getRestaurantId();
        this.imageUrl = lunch.getImageUrl();
        this.name = lunch.getName();
        this.detail = lunch.getDetail();
        this.likes = lunch.getLikes();
        this.local = lunch.getLocal();
        this.courseName = lunch.getCourseName();
    }
}
