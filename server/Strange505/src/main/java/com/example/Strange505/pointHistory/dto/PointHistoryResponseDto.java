package com.example.Strange505.pointHistory.dto;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
@NoArgsConstructor
public class PointHistoryResponseDto {

    private Long pointId;
    private int diff;
    private String description;
    private Timestamp actionDate;
    private int remainingPoints;

}
