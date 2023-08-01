package com.example.Strange505.user.dto;

import com.example.Strange505.user.domain.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

public class AuthDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class LoginDto {
        private String email;
        private String password;

        @Builder
        public LoginDto(String email, String password) {
            this.email = email;
            this.password = password;
        }
    }

    @Data
    public static class EmailDto {
        private String email;
    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @ToString
    @Builder
    @AllArgsConstructor
    public static class SignupDto {
        private String email;
        private String password;
        private String local;
        private int gen;
        private String verification;

        @Builder
        public SignupDto(String email, String password, String local, int gen) {
            this.email = email;
            this.password = password;
            this.local = local;
            this.gen = gen;
        }

        public static SignupDto encodePassword(SignupDto signupDto, String encodedPassword) {
            SignupDto newSignupDto = new SignupDto();
            newSignupDto.email = signupDto.getEmail();
            newSignupDto.password = encodedPassword;
            newSignupDto.gen = signupDto.getGen();
            newSignupDto.local = signupDto.getLocal();
            return newSignupDto;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class TokenDto {
        private String accessToken;
        private String refreshToken;

        public TokenDto(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }
}
