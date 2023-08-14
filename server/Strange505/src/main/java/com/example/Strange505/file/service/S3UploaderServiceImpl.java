package com.example.Strange505.file.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Optional;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class S3UploaderServiceImpl implements S3UploaderService {
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public void getList() {
        ListObjectsRequest listObject = new ListObjectsRequest();
        listObject.setBucketName(bucket);
        listObject.setPrefix("");
        ObjectListing objects = amazonS3.listObjects(listObject);
        do {
            objects = amazonS3.listObjects(listObject);
            //1000개 단위로 읽음
            for (S3ObjectSummary objectSummary : objects.getObjectSummaries()) {
                System.out.println(objectSummary);
            }
            //objects = s3.listNextBatchOfObjects(objects);  <--이녀석은 1000개 단위로만 가져옴..
            listObject.setMarker(objects.getNextMarker());
        } while (objects.isTruncated());
    }

    @Override
    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        return s3upload(uploadFile, dirName);
    }

    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());

        convertFile.createNewFile(); // Ignore the result of createNewFile

        try (FileOutputStream fos = new FileOutputStream(convertFile)) {
            fos.write(file.getBytes());
        }

        return Optional.of(convertFile);
    }

    private String s3upload(File uploadFile, String dirName) {
        String originalFileName = uploadFile.getName();
        String extension = "";
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex > -1) {
            extension = originalFileName.substring(dotIndex);
        }
        String uniqueFileName = UUID.randomUUID().toString() + extension;
        String fileName = dirName + "/" + uniqueFileName;
        String uploadUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile);
        return uploadUrl;
    }

    private String putS3(File uploadFile, String fileName) {
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    @Override
    public String putS3(ByteArrayOutputStream baos, String fileName) throws IOException {
        baos.flush();
        InputStream imageStream = new ByteArrayInputStream(baos.toByteArray());
        baos.close();
        // S3에 이미지 업로드
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(baos.size()); // 이미지 크기 설정
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, imageStream, metadata));

        // 업로드한 파일의 URL 생성
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            return;
        }
        throw new IllegalArgumentException("파일을 삭제하는데 실패했습니다. 파일이 존재하지 않을 수 있습니다.");
    }

    @Override
    public boolean deleteFile(String key) {
        amazonS3.deleteObject(bucket,key);
        return true;
    }
}
