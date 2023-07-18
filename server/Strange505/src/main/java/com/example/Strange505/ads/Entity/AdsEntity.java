package com.example.Strange505.ads.Entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@Entity
@Getter
@Table(name = "ads")
public class AdsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adsId;

    @Column(nullable = false)
    private String imagePath;

    @Column(nullable = false)
    private String redirectUrl;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Boolean adminConfirmed;

    public void update(Long adsId, String imagePath, String redirectUrl, LocalDate endDate, Boolean adminConfirmed) {
        this.adsId = adsId;
        this.imagePath = imagePath;
        this.redirectUrl = redirectUrl;
        this.endDate = endDate;
        this.adminConfirmed = adminConfirmed;
    }

    public void confirm() {
        this.adminConfirmed = true;
    }
}
