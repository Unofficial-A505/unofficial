package com.example.Strange505.user.domain;

import com.example.Strange505.user.dto.AuthDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.UUID;


@Entity(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String email; // Principal

    @Column(nullable = false, unique = true)
    private String password; // Credential

    @Enumerated(EnumType.STRING)
    private Role role; // 사용자 권한

    @Column(nullable = false, unique = true)
    private String local;

    @Column(nullable = false, unique = true)
    private int gen;

    private String verification;

    private int point;
    // 이메일 인증이 끝난 사람
    private boolean is_activated;
    // 탈퇴 여부
    private boolean is_withdraw;

    // == 생성 메서드 == //
    public static User registerUser(AuthDto.SignupDto signupDto) {
        User user = new User();

        user.email = signupDto.getEmail();
        user.password = signupDto.getPassword();
        user.role = Role.USER;
        user.local = signupDto.getLocal();
        user.gen = signupDto.getGen();
        user.point = 0;
        user.is_activated = false;
        user.is_withdraw = false;
        user.verification = null;
        return user;
    }
}