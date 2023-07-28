package com.example.Strange505.file.controller;


import com.example.Strange505.file.service.S3UploaderService;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/files")
@Slf4j
@RestController
@RequiredArgsConstructor
public class FileController {

    private final S3UploaderService s3UploaderService;

    @GetMapping
    public void getList() {
        s3UploaderService.getList();
    }

    @DeleteMapping
    public ResponseEntity deleteFile(@RequestBody FileKeyDto dto) {
        System.out.println(dto.getKey());
        s3UploaderService.deleteFile(dto.getKey());
        return ResponseEntity.ok().build();
    }

    @Getter
    public static class FileKeyDto {
        private String key;
    }





    @Data
    public static class ArticleDto {
        private String Content;
        private String title;
    }
}
