package com.example.Strange505.config;

import com.example.Strange505.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@Order(1)
@RestControllerAdvice(basePackages = "com.example.Strange505") // 외에 여러 지정 방법이 있다.
public class BasicAdvice {
    @ExceptionHandler
    public ResponseEntity<Result> RuntimeExHandler(RuntimeException e) {
        log.error("[exceptionHandler] {}", e);
        return new ResponseEntity<>(Result.fail(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
