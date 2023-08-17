package com.example.Strange505.user.controller;

import com.example.Strange505.user.dto.AuthDto;
import com.example.Strange505.user.service.AuthService;
import com.example.Strange505.user.service.UserService;
import com.example.Strange505.verificate.UUIDProvider;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://unofficial.kr")
public class AuthApiController {

    private final AuthService authService;
    private final UserService userService;
    private final BCryptPasswordEncoder encoder;


    private final long COOKIE_EXPIRATION = 7776000; // 90일

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody @Valid AuthDto.SignupDto signupDto) throws Exception {
        String encodedPassword = encoder.encode(signupDto.getPassword());
        AuthDto.SignupDto newSignupDto = AuthDto.SignupDto.encodePassword(signupDto, encodedPassword);
        newSignupDto.setVerification(UUIDProvider.getUuid(signupDto.getEmail()));
        userService.registerUser(newSignupDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //비밀번호 초기화 메일
    @PostMapping("/pwdInit")
    public ResponseEntity<?> passwordInit(@RequestBody AuthDto.EmailDto dto) throws MessagingException {
        userService.passwordInit(dto.getEmail());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 로그인 -> 토큰 발급
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthDto.LoginDto loginDto) {
        // User 등록 및 Refresh Token 저장
//        loginDto.setPassword("{noop}" + loginDto.getPassword());
        AuthDto.TokenDto tokenDto = authService.login(loginDto);

        // RT 저장
//        HttpCookie httpCookie = ResponseCookie.from("refresh-token", tokenDto.getRefreshToken())
//                .maxAge(COOKIE_EXPIRATION)
//                .httpOnly(true)
//                .secure(true)
//                .build();

        return ResponseEntity.ok()
//                .header("REFRESH_TOKEN", httpCookie.toString())
                .header("REFRESH_TOKEN", tokenDto.getRefreshToken())
                // AT 저장
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.getAccessToken())
                .build();
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("이메일 인증 안됨");
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestHeader("Authorization") String requestAccessToken) {
        if (!authService.validate(requestAccessToken)) {
            return ResponseEntity.status(HttpStatus.OK).build(); // 재발급 필요X
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 재발급 필요
        }
    }
    // 토큰 재발급
    @PostMapping("/reissue")
//    public ResponseEntity<?> reissue(@CookieValue(name = "refresh-token") String requestRefreshToken,
    public ResponseEntity<?> reissue(@RequestHeader() Map<String, String> headers) {
        System.out.println("headers: "+headers);
        String requestAccessToken = headers.get("authorization");
        String requestRefreshToken = headers.get("refresh_token");
        AuthDto.TokenDto reissuedTokenDto = authService.reissue(requestAccessToken, requestRefreshToken);

        if (reissuedTokenDto != null) { // 토큰 재발급 성공
            // RT 저장
//            ResponseCookie responseCookie = ResponseCookie.from("refresh-token", reissuedTokenDto.getRefreshToken())
//                    .maxAge(COOKIE_EXPIRATION)
//                    .httpOnly(true)
//                    .secure(true)
//                    .build();
            return ResponseEntity
                    .status(HttpStatus.OK)
//                    .header("REFRESH_TOKEN", responseCookie.toString())
                    .header("REFRESH_TOKEN", reissuedTokenDto.getRefreshToken())
                    // AT 저장
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + reissuedTokenDto.getAccessToken())
                    .build();

        } else { // Refresh Token 탈취 가능성
            System.out.println("재로그인 유도");
            // Cookie 삭제 후 재로그인 유도
//            ResponseCookie responseCookie = ResponseCookie.from("refresh-token", "")
//                    .maxAge(0)
//                    .path("/")
//                    .build();
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
//                    .header("REFRESH_TOKEN", responseCookie.toString())
                    .header("REFRESH_TOKEN", "")
                    .build();
        }
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String requestAccessToken) {
        authService.logout(requestAccessToken);
//        ResponseCookie responseCookie = ResponseCookie.from("refresh-token", "")
//                .maxAge(0)
//                .path("/")
//                .build();

        return ResponseEntity
                .status(HttpStatus.OK)
//                .header("REFRESH_TOKEN", responseCookie.toString())
                .header("REFRESH_TOKEN", "")
                .build();
    }
}
