package com.example.Strange505.lunch;


import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import javax.imageio.ImageIO;

public class ImageResizeUtil {

    public static ByteArrayOutputStream imageResize(String imageUrl, int width, int height) throws IOException {
        URL url = new URL(imageUrl); // 원본 이미지 ( http/https url )
//        int width = 404;
//        int height = 280;

        String[] path = url.getFile().split("/");
        String[] filename = path[path.length - 1].split("\\.");
        String format = filename[filename.length - 1];

        BufferedImage resizedImage = resize(url, width, height); //리사이즈 된 이미지를 Buffered Image 로 반환

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(resizedImage, format, baos);
        baos.flush();
        InputStream imageStream = new ByteArrayInputStream(baos.toByteArray());
        baos.close();
        return baos;
    }

    public static BufferedImage resize(URL url, int width, int height) throws IOException {

        BufferedImage inputImage = ImageIO.read(url); // 받은 이미지 읽기

        BufferedImage outputImage = new BufferedImage(width, height, inputImage.getType()); // Buffered Image객체 생성 후

        // 이미지를 BufferedImage 객체에 그림
        Graphics2D graphics2D = outputImage.createGraphics();
        graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        graphics2D.drawImage(inputImage, 0, 0, width, height, null); // 그리기
        graphics2D.dispose(); // 자원해제

        return outputImage;
    }
}
