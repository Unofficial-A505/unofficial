package com.example.Strange505.verificate.controller;

import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import com.example.Strange505.user.service.UserService;
import com.example.Strange505.verificate.service.EmailVerifyService;
import com.example.Strange505.vo.Result;
import com.sun.mail.imap.ResyncData;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/verify")
@Slf4j
@RequiredArgsConstructor
public class EmailVerifyController {

    private final EmailVerifyService emailVerifyService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<Result<Boolean>> acceptEmail(@RequestParam("email") String email, @RequestParam(value = "verificationCode") String verificationCode) {
        emailVerifyService.acceptEmail(verificationCode, email);
        System.out.println("억셉트 메서드 실행");
        return ResponseEntity.status(HttpStatus.OK).body(Result.success(Boolean.TRUE));
    }

    @PostMapping
    public ResponseEntity<Result<Boolean>> verifyEmail(@RequestBody EmailDto dto) throws Exception {
        System.out.println(dto.getEmail());
        Result<Boolean> result = emailVerifyService.verifyEmail(dto.getEmail());
        if (result.isSuccess() == false) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        } else {
            return ResponseEntity.ok().body(result);
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendEmail(@RequestBody EmailDto dto) throws Exception {
        User findUser = userService.getUserByEmail(dto.getEmail());
        emailVerifyService.sendEmail(findUser.getEmail(), findUser.getVerification());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Getter
    public static class EmailDto {
        private String email;
    }
}
