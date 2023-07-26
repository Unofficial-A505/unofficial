package com.example.Strange505.user.service;

import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.dto.AuthDto;
import com.example.Strange505.user.dto.RequestUserDto;
import com.example.Strange505.user.exception.NoMatchPasswordException;
import com.example.Strange505.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    @Transactional
    public void registerUser(AuthDto.SignupDto signupDto) {
        System.out.println(signupDto);
        User user = User.registerUser(signupDto);
        userRepository.save(user);
    }

    @Transactional
    public void updateUser(RequestUserDto dto) {
        User user = userRepository.findByEmail(dto.getEmail()).get();
        if(encoder.matches(dto.getOldPassword(), user.getPassword())) {
            user.update(encoder.encode(dto.getNewPassword()));
        } else {
            throw new NoMatchPasswordException("이전 비밀번호가 일치하지 않습니다.");
        }
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
