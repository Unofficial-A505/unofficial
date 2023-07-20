package com.example.Strange505.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("config");
        registry.addMapping("/**")
                .allowedOrigins("http:///70.12.247.35:8080")
                .maxAge(3600);
    }
}
