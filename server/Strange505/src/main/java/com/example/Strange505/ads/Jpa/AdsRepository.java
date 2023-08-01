package com.example.Strange505.ads.Jpa;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Strange505.ads.Entity.AdsEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface AdsRepository extends JpaRepository<AdsEntity, Long>{
    List<AdsEntity> findByEndDateAfterAndAdminConfirmedTrue(LocalDate date);
    List<AdsEntity> findByEndDateAfter(LocalDate date);
    List<AdsEntity> findByUserId(Long userId);
}
