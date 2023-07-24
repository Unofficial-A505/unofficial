package com.example.Strange505.user.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackages = "com.example.Strange505.user") // 외에 여러 지정 방법이 있다.
public class ExControllerAdvice {
    @ExceptionHandler
    public ResponseEntity<String> userExHandler(NotActivatedException e) {
        log.error("[exceptionHandler] ex", e);
        return new ResponseEntity<>("아직 인증 안됨", HttpStatus.UNAUTHORIZED);
    }
}
