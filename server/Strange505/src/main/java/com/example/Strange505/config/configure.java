package com.example.Strange505.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class configure implements WebMvcConfigurer {

    @Configuration
    public class WebConfig implements WebMvcConfigurer {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("https://unofficial.kr","https://dev.unofficial.kr")
                    .allowedMethods("PUT", "DELETE","POST","GET")
                    .allowCredentials(false).maxAge(3600);
        }
    }
}
