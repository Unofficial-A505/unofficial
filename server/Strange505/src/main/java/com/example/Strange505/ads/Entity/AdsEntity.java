package com.example.Strange505.ads.Entity;
import jakarta.persistence.*;
import lombok.*;
import com.example.Strange505.ads.Entity.AdStatus;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AdStatus adminConfirmed;

    @Column
    private Long userId;

    @Column
    private int adsCost;

    public void update(Long adsId, String imagePath, String redirectUrl, LocalDate endDate, AdStatus adminConfirmed, Long userId, int adsCost) {
        this.adsId = adsId;
        this.imagePath = imagePath;
        this.redirectUrl = redirectUrl;
        this.endDate = endDate;
        this.adminConfirmed = adminConfirmed;
        this.userId = userId;
        this.adsCost = adsCost;
    }

    public void confirm() {
        this.adminConfirmed = AdStatus.APPROVED;
    }

    public void reject() {
        this.adminConfirmed = AdStatus.REJECTED;
    }


}
