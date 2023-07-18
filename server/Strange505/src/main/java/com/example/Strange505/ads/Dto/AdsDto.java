package com.example.Strange505.ads.Dto;
import lombok.Data;
import java.time.LocalDate;
@Data
public class AdsDto {
    private Long id;

    private String imagePath;

    private String redirectUrl;

    private LocalDate endDate;

    private Boolean adminConfirmed;
}
