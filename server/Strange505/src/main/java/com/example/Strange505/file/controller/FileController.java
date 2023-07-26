package com.example.Strange505.file.controller;


import com.example.Strange505.file.service.S3UploaderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
