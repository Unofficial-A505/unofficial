package com.example.Strange505.lunch;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Entity(name = "lunch")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Menu {
    @Id
    @GeneratedValue
    @Column(name = "menu_id")
    private Long id;
    private String date;
    @Column(name="restaurant_id")
    private String restaurantId;
    @Column(name="image_url")
    private String imageUrl;
    private String name;
    private String detail;
    private Long likes;
    private String local;
    @Column(name="course_name")
    private String courseName;
}
