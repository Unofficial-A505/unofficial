package com.example.Strange505.user.controller;

import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.dto.RequestUserDto;
import com.example.Strange505.user.service.AuthService;
import com.example.Strange505.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestHeader("Authorization") String accessToken) {
        Long id = authService.extractID(accessToken);
        User findUser = userService.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(findUser);
    }

    @PostMapping("/password")
    public ResponseEntity updateUser(@RequestBody RequestUserDto dto) {
        userService.updateUser(dto);
        return ResponseEntity.ok().build();
    }
}
