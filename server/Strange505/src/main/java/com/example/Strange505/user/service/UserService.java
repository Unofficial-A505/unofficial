package com.example.Strange505.user.service;

import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.dto.AuthDto;
import com.example.Strange505.user.dto.RequestUserDto;
import com.example.Strange505.user.repository.UserRepository;
import com.example.Strange505.verificate.UUIDProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

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
    public void updateUser(RequestUserDto dto, Long id) {
        User user = userRepository.findById(id).get();
        user.update(dto.getPassword());
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
