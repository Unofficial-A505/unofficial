import styles from "./ForgotPasswordPage.module.css";
import { useState } from "react";
import axios from "axios";
import useDocumentTitle from "./../../useDocumentTitle";

const ForgotPasswordPage = () => {
  useDocumentTitle("비밀번호 찾기");

  const [isComplete, setIsComplete] = useState("false");
  const [userEmail, setUserEmail] = useState("");
  const [selectedLocal, setSelectedLocal] = useState("");
  const [selectedGen, setSelectedGen] = useState("");

  const onEmailHandler = (e) => {
    setUserEmail(e.target.value);
  };
  const handleLocalChange = (e) => {
    setSelectedLocal(e.target.value);
  };
  const handleGenChange = (e) => {
    setSelectedGen(e.target.value);
  };

  const requestNewPassword = async (e) => {
    e.preventDefault();
    setIsComplete("loading");

    if (!userEmail || !selectedLocal || !selectedGen) {
      alert("지역, 기수 또는 이메일을 입력하세요.");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_SERVER}/api/auth/pwdInit`, {
        email: userEmail,
        local: selectedLocal,
        gen: selectedGen,
      })
      .then(() => {
        setIsComplete("true");
      })
      .catch((err) => {
        setIsComplete("false");
        alert("입력하신 정보를 확인해주세요.");
        return;
      });
  };

  if (isComplete === "false") {
    return (
      <div className={styles.forgotPasswordPage}>
        <form onSubmit={requestNewPassword}>
          <div>
            <h3>비밀번호 찾기</h3>
            <p>
              회원가입에 등록한 이메일을 이용하여 비밀번호를 찾을 수 있습니다.
            </p>
          </div>
          <div className={styles.completeContainer}>
            <div className="d-flex justify-content-between mb-2">
              <div className={styles.selectContainer}>
                <label className="form-label mb-0">지역</label>
                <select
                  name="enter_local"
                  value={selectedLocal}
                  onChange={handleLocalChange}
                >
                  <option value="" disabled>
                    지역을 선택하세요
                  </option>
                  <option value="서울">서울 캠퍼스</option>
                  <option value="대전">대전 캠퍼스</option>
                  <option value="구미">구미 캠퍼스</option>
                  <option value="광주">광주 캠퍼스</option>
                  <option value="부울경">부울경 캠퍼스</option>
                </select>
              </div>
              <div className={styles.selectContainer}>
                <label className="form-label mb-0">기수</label>
                <select
                  name="enter_gen"
                  value={selectedGen}
                  onChange={handleGenChange}
                >
                  <option value="" disabled>
                    기수를 선택하세요
                  </option>
                  <option value="1">1기</option>
                  <option value="2">2기</option>
                  <option value="3">3기</option>
                  <option value="4">4기</option>
                  <option value="5">5기</option>
                  <option value="6">6기</option>
                  <option value="7">7기</option>
                  <option value="8">8기</option>
                  <option value="9">9기</option>
                  <option value="10">10기</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="inputEmail" className="form-label">
                이메일
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                onInput={onEmailHandler}
              />
            </div>
            <button type="submit">비밀번호 변경</button>
          </div>
        </form>
      </div>
    );
  } else if (isComplete === "loading") {
    return (
      <div className={styles.forgotPasswordPage}>
        <div>
          <h3>비밀번호 찾기</h3>
          <p>
            회원가입에 등록한 이메일을 이용하여 비밀번호를 찾을 수 있습니다.
          </p>
        </div>
        <div className={styles.completeContainer}>
          <br />
          <br />
          <br />
          <p st>잠시만 기다려 주세요...</p>
          <br />
          <br />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.forgotPasswordPage}>
        <div>
          <h3>비밀번호 찾기</h3>
          <p>
            회원가입에 등록한 이메일을 이용하여 비밀번호를 찾을 수 있습니다.
          </p>
        </div>
        <div className={styles.completeContainer}>
          <p className="mt-0">비밀번호 변경 요청이 완료되었습니다.</p>
          <p>
            새로운 비밀번호는{" "}
            <span style={{ color: "#034BB9", fontSize: "1.1rem" }}>이메일</span>
            로 발송되었습니다.
          </p>
          <p className="mb-5">
            이메일을 확인하시고,{" "}
            <span style={{ color: "#034BB9", fontSize: "1.1rem" }}>
              새 비밀번호
            </span>
            로 로그인해 주세요.
          </p>
          <a href="/">메인페이지로 이동하기</a>
        </div>
      </div>
    );
  }
};

export default ForgotPasswordPage;
