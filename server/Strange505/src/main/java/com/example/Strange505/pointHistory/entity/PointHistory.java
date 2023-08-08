package com.example.Strange505.pointHistory.entity;

import com.example.Strange505.pointHistory.dto.PointHistoryResponseDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@Setter
public class PointHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pointId;
    private int diff;
    private String description;
    @CreationTimestamp
    private Timestamp actionDate;
    private int remainingPoints;
    private Long userId;

    public PointHistoryResponseDto convertToDto() {
        PointHistoryResponseDto responseDto = new PointHistoryResponseDto();
        responseDto.setDiff(this.getDiff());
        responseDto.setDescription(this.getDescription());
        responseDto.setPointId(this.getPointId());
        responseDto.setActionDate(this.getActionDate());
        responseDto.setRemainingPoints(this.getRemainingPoints());
        return responseDto;
    }
}
