package com.example.Strange505.file.Service;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.UUID;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class S3UploaderServiceImpl implements S3UploaderService {
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        return upload(uploadFile, dirName);
    }

    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());

        convertFile.createNewFile(); // Ignore the result of createNewFile

        try (FileOutputStream fos = new FileOutputStream(convertFile)) {
            fos.write(file.getBytes());
        }

        return Optional.of(convertFile);
    }

    private String upload(File uploadFile, String dirName) {
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

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            return;
        }
        throw new IllegalArgumentException("파일을 삭제하는데 실패했습니다. 파일이 존재하지 않을 수 있습니다.");
    }
}
