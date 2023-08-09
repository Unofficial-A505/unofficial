package com.example.Strange505.user.dto;

import com.example.Strange505.user.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class UserDTO {

    private Long id;

    private String email;

    private Role role;

    private String local;

    private Integer gen;

    private String verification;

    private Integer point;
    private boolean is_activated;

    private LocalDateTime withdrawalDate;

    private LocalDateTime createDate;

}
