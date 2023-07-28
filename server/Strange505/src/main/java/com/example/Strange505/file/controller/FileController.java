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

    @PostMapping("/articleTest")
    public void test(@RequestBody ArticleDto dto) {
        System.out.println(dto.getTitle());
        System.out.println(dto.getContent());
        System.out.println(parsingArticle(dto.getContent()));
    }


    public List<String> parsingArticle(String data) {
        List<String> urls = new ArrayList<>();
        int flag = 0;
        do {
            data = urlExtract(data, urls);
            flag = data.indexOf("src=\"");
        } while (flag != -1);

        return urls;
    }

    private String urlExtract(String data, List<String> urls) {
        int idx = data.indexOf("src=\"");
        String now = data.substring(idx + 5);
        idx = now.indexOf("\"");

        String URL = now.substring(0, idx);
        String leftover = now.substring(idx + 1);

        System.out.println(URL);
        urls.add(URL.substring(URL.indexOf("/static/")));
        System.out.println(leftover);
        return leftover;
    }


    @Data
    public static class ArticleDto {
        private String Content;
        private String title;
    }
}
