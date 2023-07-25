package com.example.Strange505.user.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class RequestUserDto {
    private String email;
    private String newPassword;
    private String oldPassword;
}
