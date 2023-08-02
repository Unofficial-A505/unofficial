import styles from "./ForgotPasswordPage.module.css";
import { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {
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

    if (!userEmail || !selectedLocal || !selectedGen) {
      alert("지역, 기수 또는 이메일을 입력하세요.");
      return;
    }

    try {
      const response = await axios.post(
        "https://unofficial.kr/api/auth/pwdInit",
        {
          email: userEmail,
          local: selectedLocal,
          gen: selectedGen,
        }
      );
      console.log(response);
    } catch (err) {
      alert("입력하신 정보를 확인해주세요.");
    }
  };

  return (
    <div className={styles.forgotPasswordPage}>
      <form>
        <div>
          <h3>비밀번호 찾기</h3>
          <p>
            회원가입에 등록한 이메일을 이용하여 비밀번호를 찾을 수 있습니다.
          </p>
        </div>
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <div className={styles.selectContainer}>
              <label className="form-label mb-0">지역</label>
              <select name="enter_local" onChange={handleLocalChange}>
                <option disabled selected>
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
              <select name="enter_gen" onChange={handleGenChange}>
                <option disabled selected>
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
          <label for="inputEmail" className="form-label">이메일</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            onInput={onEmailHandler}
          />
        </div>
        <button type="submit" onClick={requestNewPassword}>
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
