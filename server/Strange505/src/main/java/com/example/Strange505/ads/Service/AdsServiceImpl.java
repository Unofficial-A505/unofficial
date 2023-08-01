package com.example.Strange505.ads.Service;
import com.example.Strange505.ads.Entity.AdsEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import com.example.Strange505.ads.Jpa.AdsRepository;
import com.example.Strange505.ads.Dto.AdsDto;
import com.example.Strange505.ads.Entity.AdStatus;
import java.time.LocalDate;
@Service
public class AdsServiceImpl implements AdsService {
    private final AdsRepository adsRepository;

    public AdsServiceImpl(AdsRepository adsRepository) {
        this.adsRepository = adsRepository;
    }
    @Override
    @Transactional
    public AdsDto createAds(AdsDto adsDto) {
        AdsEntity ads = new AdsEntity();
        ads.update(adsDto.getAdsId(),adsDto.getImagePath(), adsDto.getRedirectUrl(), adsDto.getEndDate(), adsDto.getAdminConfirmed(), adsDto.getUserId(), adsDto.getAdsCost());
        AdsEntity savedAds = adsRepository.save(ads);
        return convertToDto(savedAds);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdsDto> getAllAds() {
        return adsRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AdsDto getAdsById(Long id) {
        AdsEntity ads = adsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ads not found"));
        return convertToDto(ads);
    }

    @Override
    @Transactional
    public void deleteAds(Long id) {
        adsRepository.deleteById(id);
    }

    @Override
    @Transactional
    public AdsDto updateAds(Long id, AdsDto adsDto) {
        AdsEntity ads = adsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ads not found"));
        ads.update(adsDto.getAdsId(), adsDto.getImagePath(), adsDto.getRedirectUrl(), adsDto.getEndDate(), adsDto.getAdminConfirmed(), adsDto.getUserId(), adsDto.getAdsCost());
        AdsEntity updatedAds = adsRepository.save(ads);
        return convertToDto(updatedAds);
    }
    @Override
    @Transactional(readOnly = true)
    public List<AdsDto> getAdsByUserId(Long userId) {
        List<AdsEntity> userAds = adsRepository.findByUserId(userId);
        return userAds.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
//    @Override
//    @Transactional
//    public void confirmAdStatus(Long id, AdStatus status) {
//        AdsEntity ads = adsRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Ads not found"));
//        ads.confirm(status);
//        adsRepository.save(ads);
//    }
    @Override
    @Transactional
    public void confirmAds(Long id) {
        AdsEntity ads = adsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ads not found"));
        ads.confirm();
        adsRepository.save(ads);
    }
    @Override
    @Transactional
    public void rejectAds(Long id) {
        AdsEntity ads = adsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ads not found"));
        ads.reject();
        adsRepository.save(ads);
    }
    @Override
    @Transactional(readOnly = true)
    public List<AdsDto> findActiveAds() {
        LocalDate currentDate = LocalDate.now();
        List<AdsEntity> activeAds = adsRepository.findByEndDateAfterAndAdminConfirmed(currentDate, AdStatus.APPROVED);
        return activeAds.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdsDto> findWaitAds() {
        LocalDate currentDate = LocalDate.now();
        List<AdsEntity> waitAds = adsRepository.findByEndDateAfter(currentDate);
        return waitAds.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private AdsDto convertToDto(AdsEntity ads) {
        AdsDto adsDto = new AdsDto();
        adsDto.setAdsId(ads.getAdsId());
        adsDto.setImagePath(ads.getImagePath());
        adsDto.setRedirectUrl(ads.getRedirectUrl());
        adsDto.setEndDate(ads.getEndDate());
        adsDto.setAdminConfirmed(ads.getAdminConfirmed());
        adsDto.setUserId(ads.getUserId());
        adsDto.setAdsCost(ads.getAdsCost());
        return adsDto;
    }
}
