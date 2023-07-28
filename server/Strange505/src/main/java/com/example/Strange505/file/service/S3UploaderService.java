package com.example.Strange505.file.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface S3UploaderService {

    String upload(MultipartFile multipartFile, String dirName) throws IOException;

    void getList();

    boolean deleteFile(String key);
}
