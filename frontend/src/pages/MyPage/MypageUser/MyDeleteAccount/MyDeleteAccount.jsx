import { useState } from "react";
import styles from "./MyDeleteAccount.module.css";

export default function MyDeleteAccount() {
  const [agreement, setAgreement] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAgreementChange = (e) => {
    setAgreement(e.target.checked);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 회원탈퇴 처리 로직을 구현합니다.
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Agreement:", agreement);
    // 실제로는 서버로 데이터를 전송하여 회원 탈퇴를 처리해야 합니다.
  };

  const terms = () => {
    return (
      <div>
        <p>안농</p>
      </div>
    )
  }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.myContentContainer}>
        <div className={styles.mycontentTitle}>
          <h2 className={styles.mypostsTitle}>회원 탈퇴</h2>
          <p className={styles.smallTitle}>
            회원 탈퇴시 주의 사항을 반드시 확인해주세요.
          </p>
        </div>
        <div className={styles.termsContainer}>
          {terms()}
        </div>
        <div className="form-group mb-3">
          <input
            type="checkbox"
            id="agreement"
            name="agreement"
            checked={agreement}
            onChange={handleAgreementChange}
          />
          <label className="checkbox-label" htmlFor="agreement">
            &nbsp;약관에 동의합니다.
          </label>
        </div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <div className="d-flex">
              <label htmlFor="email">이메일 :</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="password">비밀번호 :</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-danger">
            탈퇴하기
          </button>
        </form>
      </div>
    </div>
  );
}