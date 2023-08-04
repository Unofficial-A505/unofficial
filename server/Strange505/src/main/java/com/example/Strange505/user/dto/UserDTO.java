package com.example.Strange505.user.dto;

import com.example.Strange505.user.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserDTO {

    private Long id;

    private String email;

    private Role role;

    private String local;

    private int gen;

    private String verification;

    private int point;
    private boolean is_activated;
    private boolean is_withdraw;

}
