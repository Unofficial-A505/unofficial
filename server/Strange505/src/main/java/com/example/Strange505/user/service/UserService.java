package com.example.Strange505.user.service;

import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.dto.AuthDto;
import com.example.Strange505.user.dto.RequestUserDto;
import com.example.Strange505.user.exception.NoMatchPasswordException;
import com.example.Strange505.user.exception.SendEmailFailException;
import com.example.Strange505.user.repository.UserRepository;
import com.example.Strange505.verificate.UUIDProvider;
import com.example.Strange505.verificate.service.EmailVerifyService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

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

    @Transactional
    public void passwordInit(String email) throws MessagingException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("존재하지 않는 유저입니다."));
        String password = makePassword();
        user.update(encoder.encode(password));
        emailVerifyService.sendPasswordEmail(email, password);
    }

    private String makePassword() {
        String uuid = "";
        for (int i = 0; i < 5; i++) {
            uuid = UUID.randomUUID().toString().replaceAll("-", ""); // -를 제거해 주었다.
            uuid = uuid.substring(0, 10); //uuid를 앞에서부터 10자리 잘라줌.
        }
        return uuid;
    }

    @Transactional
    public void pointAdd(int point) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("유저 정보가 없습니다."));
        user.pointAdd(point);
    }
}
