package com.example.Strange505.board.exception;

import com.example.Strange505.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackages = "com.example.Strange505.board")
public class ExceptionControllerAdvice {
    @ExceptionHandler
    public ResponseEntity<Result> handleNotAuthorException(NotAuthorException e) {
        log.error("[exceptionHandler] ex", e);
        return new ResponseEntity<>(Result.fail(e.getMessage()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler
    public ResponseEntity<Result> handleNoResultException(NoResultException e) {
        log.error("[exceptionHandler] ex", e);
        return new ResponseEntity<>(Result.fail(e.getMessage()), HttpStatus.NOT_FOUND);
    }
}
