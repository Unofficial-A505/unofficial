package com.example.Strange505.file.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public interface S3UploaderService {

    String upload(MultipartFile multipartFile, String dirName) throws IOException;

    void getList();

    boolean deleteFile(String key);

    String putS3(ByteArrayOutputStream baos, String fileName) throws Exception;
}
