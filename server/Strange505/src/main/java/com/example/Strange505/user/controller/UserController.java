package com.example.Strange505.user.controller;

import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.dto.RequestUserDto;
import com.example.Strange505.user.dto.UserDTO;
import com.example.Strange505.user.service.AuthService;
import com.example.Strange505.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://unofficial.kr")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> users = userService.getUsers();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDTO> getUser(@RequestHeader("Authorization") String accessToken) {
        Long id = authService.extractID(accessToken);
        UserDTO findUser = userService.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(findUser);
    }

    @PostMapping("/password")
    public ResponseEntity updateUser(@RequestBody RequestUserDto dto) {
        userService.updateUser(dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/point")
    public ResponseEntity updatePoint(@RequestBody Object data) {

        int point = ((HashMap<String,Integer>)data).get("point");
        userService.pointAdd(point);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/drop")
    public ResponseEntity withdraw(@RequestBody Object data) {
        String password = ((HashMap<String,String>)data).get("password");
        userService.withdrawUser(password);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
