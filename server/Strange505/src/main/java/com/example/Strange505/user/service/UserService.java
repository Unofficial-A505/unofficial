package com.example.Strange505.user.service;

import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.dto.AuthDto;
import com.example.Strange505.user.dto.RequestUserDto;
import com.example.Strange505.user.exception.NoMatchPasswordException;
import com.example.Strange505.user.exception.SendEmailFailException;
import com.example.Strange505.user.repository.UserRepository;
import com.example.Strange505.verificate.service.EmailVerifyService;
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
    private final EmailVerifyService emailVerifyService;

    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    @Transactional
    public void registerUser(AuthDto.SignupDto signupDto) throws Exception {
        System.out.println(signupDto);
        User user = User.registerUser(signupDto);
        userRepository.save(user);

        // 인증 이메일 발송
        try {
            emailVerifyService.sendEmail(signupDto.getEmail(), signupDto.getVerification());
        } catch (Exception e) {
            throw new SendEmailFailException("이메일 발송에 실패 하였습니다.");
        }
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
