package com.example.Strange505.verificate.controller;

import com.example.Strange505.verificate.service.EmailVerifyService;
import com.example.Strange505.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/verify")
public class EmailVerifyController {

    EmailVerifyService emailVerifyService;

    @Autowired
    public EmailVerifyController(EmailVerifyService emailVerifyService) {
        this.emailVerifyService = emailVerifyService;
    }

    @GetMapping
    public ResponseEntity<Result<Boolean>> verifyEmail(@RequestParam(value = "verificationCode") String verificationCode) {
        emailVerifyService.verifyEmail(verificationCode);
        System.out.println();
        return ResponseEntity.status(HttpStatus.OK).body(Result.success(Boolean.TRUE));
    }
}
