package com.example.Strange505;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableScheduling
public class Strange505Application {
	@Value("${test}")
	private String test;
	@Value("${main}")
	private String main;

	public static final String APPLICATION_LOCATIONS = "spring.config.location="
			+ "classpath:application.yml,";
	public static void main(String[] args) {
		SpringApplication.run(Strange505Application.class, args);
	}

	@PostConstruct
	private void start() {
		System.out.println("main = " + main);
		System.out.println("test = " + test);
	}

	@Bean
	JPAQueryFactory jpaQueryFactory(EntityManager em) {
		return new JPAQueryFactory(em);
	}
}
