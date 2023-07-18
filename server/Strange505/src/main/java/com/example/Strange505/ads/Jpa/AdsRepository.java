package com.example.Strange505.ads.Jpa;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Strange505.ads.Entity.AdsEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;
public interface AdsRepository extends JpaRepository<AdsEntity, Long>{
    @Query(value = "SELECT a FROM Ads a WHERE a.endDate > :currentDate AND a.adminConfirmed = true",nativeQuery = true)
    List<AdsEntity> findActiveAds(@Param("currentDate") LocalDate currentDate);
}
