import { useState } from "react";
import styles from "./MyDeleteAccount.module.css";
import customAxios from "../../../../util/customAxios";
import main_logo from "../../../../assets/images/main_logo.png";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setAuthUserEmail } from "../../../../store/loginSlice";

export default function MyDeleteAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropComplete, setDropComplete] = useState(false);
  const authUser = useSelector((state) => state.authUser);
  const userEmail = authUser.authUserEmail;

  const handleAgreementChange = (e) => {
    setAgreement(e.target.checked);
  };

  const handleModalOpen = () => {
    if (agreement) {
      setModalOpen(true);
    } else {
      alert("약관에 먼저 동의를 해주세요");
    }
  };

  const logout = () => {
    customAxios
      .get("api/auth/logout")
      .then(() => {})
      .catch((error) => {
        console.error("Logout failed:", error);
      });
    dispatch(setAccessToken(""));
    dispatch(setAuthUserEmail(""));
    localStorage.removeItem("REFRESH_TOKEN");
    window.location.reload();
    navigate("/");
  };

  const terms = () => {
    return (
      <div>
        <p>[회원탈퇴 약관]</p>
        <p>회원탈퇴 신청 전 안내 사항을 확인 해 주세요.</p>
        <br />
        <p>1. 회원탈퇴를 하더라도, 일정 기간동안 회원 개인정보를 보관합니다.</p>
        <p>2. 회원탈퇴 후에도 재가입이 가능합니다.</p>
        <p>
          3. 회원탈퇴 후에도 온라인에서 데이터 유출이 발생할 수 없으며, 완전한
          보안을 보장합니다.
        </p>
        <p>
          4. 회원탈퇴 신청 후에도 한 번 더 확인 절차를 거쳐 최종 탈퇴 의사를
          확인합니다.
        </p>
        <p>
          5. 회원탈퇴와 관련하여 일정기간 동안 사용하지 않은 회원의 개인정보는
          안전하게 파기합니다.
        </p>
        <p></p>
      </div>
    );
  };

  if (!dropComplete) {
    return (
      <div className={styles.contentContainer}>
        <div className={styles.myContentContainer}>
          <div>
            <div className={styles.mycontentTitle}>
              <h2 className={styles.mypostsTitle}>회원 탈퇴</h2>
              <p className={styles.smallTitle}>
                회원 탈퇴시 주의 사항을 반드시 확인해주세요.
              </p>
            </div>
            <div className={styles.termsContainer}>{terms()}</div>
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
          </div>
          <div className={styles.formContainer}>
            <div />
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleModalOpen}
            >
              탈퇴하기
            </button>
            {modalOpen && (
              <Drop
                setModalOpen={setModalOpen}
                setDropComplete={setDropComplete}
                userEmail={userEmail}
              />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.completeContainer}>
        <h3 className="mb-4">회원탈퇴가 완료되었습니다.</h3>
        <p className="mb-1">
          그동안 UNOFFICIAL을 이용해주시고 사랑해주셔서 감사합니다.
        </p>
        <p className="mb-4">
          더욱더 노력하고 발전하는 UNOFFICIAL이 되겠습니다.
        </p>
        <button type="button" className="btn btn-primary" onClick={logout}>
          확인
        </button>
      </div>
    );
  }
}

function Drop({ setModalOpen, setDropComplete, userEmail }) {
  const [userPassword, setUserPassword] = useState("");
  const passwordHandler = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    customAxios
      .post(`/api/users/drop`, {
        password: userPassword,
      })
      .then((res) => {
        setDropComplete(true);
      })
      .catch((err) => {
        console.log(err);
        alert("입력한 비밀번호를 확인해 주세요.");
      });
  };

  return (
    <>
      <div className={styles.overlay} onClick={() => setModalOpen(false)}></div>

      <div className={styles.container}>
        <img src={main_logo} alt="언오피셜 로고" width={160} />
        <p>정말 탈퇴하시겠습니까?</p>
        <div>
          <input
            type="text"
            disabled
            readOnly
            className="form-control-plaintext mb-2"
            style={{ textAlign: "center" }}
            id="staticEmail2"
            value={userEmail}
          />
          <input
            type="password"
            className="form-control"
            autoComplete="off"
            placeholder="비밀번호를 입력하세요"
            onChange={passwordHandler}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-light me-3"
            onClick={() => setModalOpen(false)}
          >
            돌아가기
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleSubmit}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </>
  );
}
