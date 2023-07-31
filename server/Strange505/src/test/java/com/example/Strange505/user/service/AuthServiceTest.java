package com.example.Strange505.user.service;

import com.example.Strange505.user.dto.AuthDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Commit
class AuthServiceTest {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;

    @Test
    public void 유저_생성() throws Exception {
        AuthDto.SignupDto signupDto = new AuthDto.SignupDto("ssafyKim@ssafy.net", "ssafy1234", "대전", 11);
        userService.registerUser(signupDto);
    }

//    @Test
//    public void 로그인() throws Exception {
//        authService.login(new AuthDto.LoginDto("hmdasom@naver.com", "hmdasom1234"));
//    }
}