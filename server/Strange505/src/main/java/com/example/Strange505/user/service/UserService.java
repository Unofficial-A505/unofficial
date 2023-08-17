package com.example.Strange505.user.service;

import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.dto.AuthDto;
import com.example.Strange505.user.dto.RequestUserDto;
import com.example.Strange505.user.dto.UserDTO;
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

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("존재하지 않는 유저 입니다."));
        UserDTO dto = UserDTO.builder()
                .createDate(user.getCreateDate())
                .withdrawalDate(user.getWithdrawalDate())
                .id(user.getId())
                .role(user.getRole())
                .email(user.getEmail())
                .is_activated(user.getIs_activated())
                .gen(user.getGen())
                .local(user.getLocal())
                .point(user.getPoint())
                .verification(user.getVerification())
                .build();
        return dto;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
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

    public List<UserDTO> getUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> UserDTO.builder()
                .is_activated(user.getIs_activated())
                .id(user.getId())
                .email(user.getEmail())
                .gen(user.getGen())
                .withdrawalDate(user.getWithdrawalDate())
                .createDate(user.getCreateDate())
                .local(user.getLocal())
                .point(user.getPoint())
                .role(user.getRole())
                .build()).toList();
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

    @Transactional
    public void withdrawUser(String password) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User finduser = userRepository.findByEmail(email).orElseThrow();

        if(!encoder.matches(password, finduser.getPassword())) {
            throw new NoMatchPasswordException("비밀번호가 일치하지 않습니다.");
        }
        finduser.withdraw();
    }
}
