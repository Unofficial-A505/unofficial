package com.example.Strange505.user.domain;

import com.example.Strange505.user.dto.AuthDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String email; // Principal

    @Column(nullable = false)
    private String password; // Credential

    @Enumerated(EnumType.STRING)
    private Role role; // 사용자 권한

    @Column(nullable = false)
    private String local;

    @Column(nullable = false)
    private Integer gen;

    private String verification;

    private Integer point;
    // 이메일 인증이 끝난 사람
    private Boolean is_activated;

    private LocalDateTime createDate;

    private LocalDateTime withdrawalDate;

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
        user.verification = signupDto.getVerification();
        user.createDate = LocalDateTime.now();
        user.withdrawalDate = null;
        return user;
    }

    // 수정 메서드
    public void update(String password) {
        this.password = password;
    }

    // point add 로직
    public void pointAdd(int point) {
        this.point += point;
    }

    // 이메일 인증 로직
    public void activated() {
        this.is_activated = true;
    }

    public void withdraw() {
        this.withdrawalDate = LocalDateTime.now();
        this.email = this.email + UUID.randomUUID().toString();
    }
}
