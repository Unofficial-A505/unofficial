package com.example.Strange505.ads.Controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Strange505.ads.Dto.AdsDto;
import com.example.Strange505.ads.Service.AdsService;
import com.example.Strange505.file.service.S3UploaderService;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdsController {
    private final AdsService adsService;
    private final S3UploaderService s3Uploader;

    @PostMapping
    public ResponseEntity<AdsDto> createAds(@RequestBody AdsDto adsDto) {
        AdsDto createdAds = adsService.createAds(adsDto);
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
