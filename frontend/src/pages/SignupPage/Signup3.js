/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import emailImg from "./../../assets/images/emailImg.png";
import customAxios from "../../util/customAxios";
import axios from "axios";

export default function Signup3() {
  let user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      navigate("/signup");
    }
    // server에 유저정보 송출
    axios
      .post(`${process.env.REACT_APP_SERVER}/api/auth/signup`, {
        email: user.email,
        password: user.password,
        local: user.local,
        gen: user.gen,
      })
      .then(() => {})
      .catch((err) => console.log(err));
  }, []);

  // 이메일 다시 보내기
  const resendEmail = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/api/verify/resend`, {
        email: user.email,
      })
      .then((res) => {
        alert("인증 이메일이 발송되었습니다.");
        console.log(res);
      })
      .catch((err) => {
        alert("잠시 후 다시 시도해주세요.");
        console.log(err);
      });
  };

  return (
    <div className={styles.complete}>
      <img src={emailImg} alt="" width={180} height={180} className="mb-4" />
      <h2>
        환영합니다! <span>이메일 주소</span>를 인증해 주세요.
      </h2>
      <div className="mb-4" />
      <p>이메일 인증을 위한 메일이 발송 되었습니다.</p>
      <p>회원가입 완료를 위한 이메일 인증을 진행 해 주세요.</p>
      <div className="mb-4" />
      <p className="text-dark" style={{ fontSize: "1rem" }}>
        이메일 주소 : {user.email}
      </p>
      <div className="mb-4" />
      <p className="mb-0">'이메일을 받지 못하셨나요?.</p>
      <button className="mt-2" onClick={resendEmail}>
        이메일 다시 보내기
      </button>
      <div className="mb-4" />
      <a href="/">메인페이지로 이동하기</a>
    </div>
  );
}
