package com.example.Strange505.pointHistory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PointHistoryDto {

    private int diff;
    private String description;
    private Long userId;

}
