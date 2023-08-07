package com.example.Strange505.ads.Controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Strange505.ads.Dto.AdsDto;
import com.example.Strange505.ads.Service.AdsService;
import com.example.Strange505.file.service.S3UploaderService;
import org.springframework.web.multipart.MultipartFile;
import com.example.Strange505.pointHistory.dto.PointHistoryDto;
import com.example.Strange505.pointHistory.service.PointHistoryService;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor

public class AdsController {
    private final AdsService adsService;
    private final S3UploaderService s3Uploader;
    private final PointHistoryService pointHistoryService;

    @PostMapping
    public ResponseEntity<AdsDto> createAds(@RequestBody AdsDto adsDto) {
        AdsDto createdAds = adsService.createAds(adsDto);

        PointHistoryDto pointHistoryDto = new PointHistoryDto();
        pointHistoryDto.setUserId(createdAds.getUserId());
        pointHistoryDto.setDiff(-createdAds.getAdsCost()); // 광고 비용만큼 차감하므로 -를 붙입니다.
        pointHistoryDto.setDescription("광고 신청 비용: " + createdAds.getAdsCost());

        // 포인트 차감 후, 남은 포인트가 0 이하가 되는 경우 에러를 반환하도록 합니다.
        if(!pointHistoryService.putNewPointHistory(pointHistoryDto)) {
            throw new RuntimeException("Insufficient points for ad creation.");
        }
        return ResponseEntity.ok(createdAds);
    }

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) throws IOException {
        System.out.println(file);
        return ResponseEntity.ok(s3Uploader.upload(file, "static"));
    }

    @GetMapping("/list")
    public ResponseEntity<List<AdsDto>> getAllAds() {
        List<AdsDto> adsDto = adsService.getAllAds();
        return ResponseEntity.ok(adsDto);
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<AdsDto>> getUserAds(@PathVariable Long userId) {
        List<AdsDto> adsDto = adsService.getAdsByUserId(userId);
        return ResponseEntity.ok(adsDto);
    }
    @GetMapping("/{id}")
    public ResponseEntity<AdsDto> getAdsById(@PathVariable Long id) {
        AdsDto adsDto = adsService.getAdsById(id);
        return ResponseEntity.ok(adsDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdsDto> updateAds(@PathVariable Long id, @RequestBody AdsDto adsDto) {
        AdsDto updatedAds = adsService.updateAds(id, adsDto);
        return ResponseEntity.ok(updatedAds);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAds(@PathVariable Long id) {
        adsService.deleteAds(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/confirm/{id}")
    public ResponseEntity<Void> confirmAds(@PathVariable Long id) {
        adsService.confirmAds(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/reject/{id}")
    public ResponseEntity<Void> rejectAds(@PathVariable Long id) {
        adsService.rejectAds(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/active")
    public ResponseEntity<List<AdsDto>> findActiveAds() {
        List<AdsDto> activeAds = adsService.findActiveAds();
        return ResponseEntity.ok(activeAds);
    }

    @GetMapping("/wait")
    public ResponseEntity<List<AdsDto>> findWaitAds() {
        List<AdsDto> waitAds = adsService.findWaitAds();
        return ResponseEntity.ok(waitAds);
    }
}
