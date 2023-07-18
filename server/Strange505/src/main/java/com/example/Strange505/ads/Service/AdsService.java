package com.example.Strange505.ads.Service;
import java.util.List;
import com.example.Strange505.ads.Dto.AdsDto;
public interface AdsService {
    AdsDto createAds(AdsDto adsDto);
    List<AdsDto> getAllAds();
    AdsDto getAdsById(Long id);
    void deleteAds(Long id);
    AdsDto updateAds(Long id, AdsDto adsDto);
    void confirmAds(Long id);
    List<AdsDto> findActiveAds();
}
