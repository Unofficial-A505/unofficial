//package com.example.Strange505.user.domain;
//
//import lombok.*;
//
//import jakarta.persistence.*;
//
//@Getter
//@Setter
//@Entity
//@Table(name = "users")
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@AllArgsConstructor
//@Builder
//public class User_target {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false, length = 50, unique = true)
//    private String email;
//    @Column(nullable = false, unique = true)
//    private String encryptedPwd;
//    @Column(nullable = false, unique = true)
//    private String local;
//    @Column(nullable = false, unique = true)
//    private int gen;
//    private int point;
//    private boolean is_activated;
//    private boolean is_auth;
//    private boolean is_withdraw;
//}
