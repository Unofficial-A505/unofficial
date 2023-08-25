package com.example.Strange505.verificate.service;

import com.example.Strange505.lunch.RestUtil;
import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import com.example.Strange505.verificate.Emails;
import com.example.Strange505.verificate.repository.EmailRepository;
import com.example.Strange505.vo.Result;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class EmailVerifyService {

    @Value("${mail.base-url}")
    String baseUrl;

    private final String MAIL_SUBJECT = "언오피셜 이메일 인증 메일입니다.";
    private final String MAIL_CONTENT_FRONT = "<div style=\"width: 80vw;border-top: solid 1vh #034bb9; padding: 30px 10px; border-bottom: solid 1px lightgrey; max-width: 600px;\">\n" +
            "        <div style=\"padding: 10px 0px;\">\n" +
            "            언오피셜\n" +
            "        </div>\n" +
            "        <div style=\"font-size: x-large;margin-bottom: 100px;\">\n" +
            "            <span style=\"color: #0969fb;\">메일인증</span> 안내입니다.\n" +
            "        </div>\n" +
            "        <div>\n" +
            "            안녕하세요.<br/>\n" +
            "            언오피셜을 이용해 주셔서 진심으로 감사드립니다. <br/>\n" +
            "            아래 <span style=\"color: #0969fb;\">'메일 인증'</span> 버튼을 클릭하여 회원가입을 완료해주세요<br/>\n" +
            "            감사합니다.\n" +
            "        </div>\n" +
            "        <div style=\"padding: 5vh 0;\">\n" +
            "            <a href=";
    private final String MAIL_CONTENT_END = " target=\"_blank\">\n" +
            "                <button style=\"background-color: #034bb9; border:0px;cursor: pointer;\">\n" +
            "                    <p style=\"color: aliceblue; width: 30vw; max-width: 225px;\">메일 인증</p>\n" +
            "                </button>\n" +
            "            </a>\n" +
            "        </div>\n" +
            "    </div>";
    private final String MAIL_PARAM = "&email=";


    private final String MAIL_SUBJECT_PASS = "언오피셜 비밀번호 확인 메일입니다.";
    private final String MAIL_CONTENT_FRONT_PASS = "<div style=\"width: 80vw;border-top: solid 1vh #034bb9; padding: 30px 10px; border-bottom: solid 1px lightgrey; max-width: 600px;\">\n" +
            "        <div style=\"padding: 10px 0px;\">\n" +
            "            언오피셜\n" +
            "        </div>\n" +
            "        <div style=\"font-size: x-large;margin-bottom: 100px;\">\n" +
            "            <span style=\"color: #0969fb;\">비밀번호</span> 안내입니다.\n" +
            "        </div>\n" +
            "        <div>\n" +
            "            안녕하세요.<br/>\n" +
            "            언오피셜을 이용해 주셔서 진심으로 감사드립니다. <br/>\n" +
            "            아래의 비밀번호로 로그인을 하신 후 비밀번호 변경을 해주세요 <br/>\n";
    private final String MAIL_CONTENT_END_PASS =
            "        </div>\n" +
            "    </div>";
    private final UserRepository userRepository;
    private final EmailRepository emailRepository;
    private final JavaMailSender javaMailSender;


    public Result<Boolean> verifyEmail(String email) throws Exception {

        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
//           if (user.getIs_activated()) {
//               return Result.success(null);
//            }
            return Result.fail("이미 존재하는 회원 입니다.");
        }
        if (emailRepository.findByEmail(email).orElse(null) != null) {
            return Result.success(null);
        }
        if (!isSsafyMember(email)) {
            return Result.fail("싸피 회원 인증에 실패 하였습니다.");
        }
        return Result.success(null);
    }


    private boolean isSsafyMember(String email) throws Exception {
        if (emailRepository.findByEmail(email).isPresent()) {
            return true;
        }
        Map<String, String> payload = new HashMap<>();
        Map<String, String> header = new HashMap<>();
        payload.put("usernameOrEmail", email);
        payload.put("password", "1");
        String jsonResponse = RestUtil.eduSsafyLogin(payload);

        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> response = mapper.readValue(jsonResponse, Map.class);
        String responseMessage = response.get("message");
        if (responseMessage.startsWith("비밀번호")|| responseMessage.startsWith("퇴소")) {
            Emails emails = new Emails(email);
            emailRepository.save(emails);
            return true;
        }
        return false;
    }

    public void sendEmail(String email, String verification) throws Exception {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

        // 1. 메일 수신자 설정
        String[] receiveList = {email};
        messageHelper.setTo(receiveList);

        // 2. 메일 제목 설정
        messageHelper.setSubject(MAIL_SUBJECT);

        // 3. 메일 내용 설정 HTML 적용됨
        String content = MAIL_CONTENT_FRONT + baseUrl + verification + MAIL_PARAM + email + MAIL_CONTENT_END;
        messageHelper.setText(content, true);

        // 4. 메일 전송
        javaMailSender.send(message);
    }

    public void acceptEmail(String verificationCode, String email) {
        User user = userRepository.findByEmail(email).get();
        if (user.getVerification().equals(verificationCode)) {
            user.activated();
        } else {
            throw new RuntimeException();
        }
    }

    public void sendPasswordEmail(String email, String password) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

        // 1. 메일 수신자 설정
        String[] receiveList = {email};
        messageHelper.setTo(receiveList);

        // 2. 메일 제목 설정
        messageHelper.setSubject(MAIL_SUBJECT_PASS);

        // 3. 메일 내용 설정 HTML 적용됨
        String content = MAIL_CONTENT_FRONT_PASS + password + MAIL_CONTENT_END_PASS;
        messageHelper.setText(content, true);

        // 4. 메일 전송
        javaMailSender.send(message);
    }
}
