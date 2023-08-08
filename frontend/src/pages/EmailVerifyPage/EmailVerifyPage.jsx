import styles from "./EmailVerifyPage.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useDocumentTitle from "../../useDocumentTitle";

const EmailVerifyPage = () => {
  useDocumentTitle("이메일 인증 완료");

  let query = useQuery();
  let verificationCode = query.get("verificationCode");
  let userEmail = query.get("email");

  requestEmailVerification(verificationCode, userEmail);

  return (
    <div className={styles.emailVerifyPage}>
      <h3>이메일 인증 완료</h3>
      <p>언오피셜 회원이 되신 것을 환영합니다.</p>
      <p>회원가입 절차가 모두 완료되었습니다.</p>
      <p className="mb-4">로그인 후 편리한 서비스를 이용해 보세요.</p>
      <a href={process.env.REACT_APP_SERVER}>언오피셜로 가기</a>
    </div>
  );
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const requestEmailVerification = (code, email) => {
  axios
    .get(
      `${process.env.REACT_APP_SERVER}/api/verify?verificationCode=${code}&email=${email}`
    )
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default EmailVerifyPage;
