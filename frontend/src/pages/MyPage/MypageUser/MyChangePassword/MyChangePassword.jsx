import styles from "./MyChangePassword.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import customAxios from "../../../../util/customAxios";
import { setAccessToken, setAuthUserEmail } from "../../../../store/loginSlice";

export default function MyChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const userEmail = authUser.authUserEmail;

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
    }
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(true);

  const onOldPasswordHandler = (e) => {
    setOldPassword(e.target.value);
  };
  const onNewPassword1Handler = (e) => {
    setNewPassword1(e.target.value);
    setPasswordMismatch(newPassword2 !== e.target.value);
  };
  const onNewPassword2Handler = (e) => {
    setNewPassword2(e.target.value);
    setPasswordMismatch(newPassword1 !== e.target.value);
  };
  const reset = () => {
    window.location.reload();
  };

  const checkPassword = () => {
    let pw = newPassword2;
    let num = pw.search(/[0-9]/g);
    let eng = pw.search(/[a-z]/gi);
    // let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
      alert("8 ~ 20자리 이내로 입력해주세요.");
      return false;
    } else if (pw.search(/\s/) !== -1) {
      alert("비밀번호는 공백 없이 입력해주세요.");
      return false;
    } else if (num < 0 || eng < 0) {
      alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      return false;
    } else if (passwordMismatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (oldPassword === newPassword1 || oldPassword === newPassword2) {
      alert("기존 비밀번호와 다른 비밀번호를 입력해 주세요.");
      return;
    } else if (!checkPassword()) {
      alert("새로 입력한 비밀번호를 확인해 주세요.");
      return;
    }

    try {
      await requestChangePassword(userEmail, oldPassword, newPassword2);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const requestChangePassword = async (email, oldPassword, newPassword) => {
    try {
      const response = await customAxios.post("/api/users/password", {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
      alert("비밀번호 변경이 완료되었습니다. 다시 로그인 해주시기 바랍니다.");
      logout();
      navigate("/");
    } catch (err) {
      alert("비밀번호 변경이 실패하였습니다. 다시 시도 해주시기 바랍니다.");
      console.log("실패", err);
      return;
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

  return (
    <div className={styles.contentContainer}>
      <div className={styles.myContentContainer}>
        <div className={styles.mycontentTitle}>
          <h2 className={styles.mypostsTitle}>비밀번호 변경</h2>
          <p className={styles.smallTitle}>
            주기적인 비밀번호 변경을 권장드립니다.
          </p>
        </div>
        <div className={styles.inputContainer}>
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-3 col-form-label">
              이메일
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail"
                value={userEmail}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword1" className="col-sm-3 col-form-label">
              기존 비밀번호
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="inputPassword1"
                autoComplete="off"
                onChange={onOldPasswordHandler}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword2" className="col-sm-3 col-form-label">
              새 비밀번호
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="inputPassword2"
                onChange={onNewPassword1Handler}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">
              새 비밀번호 확인
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="inputPassword3"
                onChange={onNewPassword2Handler}
              />
              {newPassword1 && newPassword2 && passwordMismatch && (
                <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" className="btn btn-light" onClick={reset}>
            돌아가기
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={changePassword}
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
}
