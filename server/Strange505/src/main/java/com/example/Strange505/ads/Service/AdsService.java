package com.example.Strange505.ads.Service;
import java.util.List;
import com.example.Strange505.ads.Dto.AdsDto;
public interface AdsService {
    AdsDto createAds(AdsDto adsDto);
    List<AdsDto> getAllAds();
    AdsDto getAdsById(Long adsId);
    void deleteAds(Long adsId);
    AdsDto updateAds(Long adsId, AdsDto adsDto);
    void confirmAds(Long adsId);
    List<AdsDto> findActiveAds();
    List<AdsDto> findWaitAds();
    List<AdsDto> getAdsByUserId(Long userId);

    void rejectAds(Long id);
}
