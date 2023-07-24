package com.example.Strange505;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class Strange505Application {
	public static final String APPLICATION_LOCATIONS = "spring.config.location="
			+ "classpath:application.yml,";
	public static void main(String[] args) {
		SpringApplication.run(Strange505Application.class, args);
	}
}
