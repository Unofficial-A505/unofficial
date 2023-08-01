package com.example.Strange505.ads.Dto;
import lombok.Data;
import java.time.LocalDate;
import com.example.Strange505.ads.Entity.AdStatus;

@Data
public class AdsDto {
    private Long adsId;

    private String imagePath;

    private String redirectUrl;

    private LocalDate endDate;

    private AdStatus adminConfirmed;

    private Long userId;

    private int adsCost;
}
