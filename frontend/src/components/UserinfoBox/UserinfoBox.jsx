import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setAuthUserEmail } from "../../store/loginSlice";
import customAxios from "../../util/customAxios";

import styles from "./UserinfoBox.module.css";
import Login from "./../../components/Login/Login";

import { RiDatabase2Line } from "@react-icons/all-files/ri/RiDatabase2Line";
import { BsFileEarmarkText } from "@react-icons/all-files/bs/BsFileEarmarkText";
import { AiOutlineComment } from "@react-icons/all-files/ai/AiOutlineComment";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { FaBullhorn } from "@react-icons/all-files/fa/FaBullhorn";

export default function UserinfoBox({userInfo}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser)

  const [isAuth, setIsAuth] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setIsAuth(authUser.accessToken);
  }, [authUser]);

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

  const isEmpty = (obj) => {
    return !Object.keys(obj).length;
  };

  // user정보 없는 상황
  if (!isAuth) {
    return (
      <div className={styles.loginContainer}>
        <p className={styles.unloginmessage}>
          언오피셜을 더 편리하게 이용하세요
        </p>
        <button
          className={styles.loginButton}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          로그인
        </button>
        {modalOpen && <Login setModalOpen={setModalOpen} />}
        <div className={styles.signupBox}>
          <p
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            비밀번호 찾기
          </p>
          <p>&nbsp;&nbsp;|&nbsp;&nbsp;</p>
          <p
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </p>
        </div>
      </div>
    );
  } else {
    // user정보 있는 상황
    return (
      <div className={styles.userContainer}>
        <div className={styles.userTopContainer}>
          <div className="d-flex justify-content-between">
            <p className={styles.helloMessage} style={{ alignSelf: "center" }}>
              안녕하세요!
            </p>
            <button style={{ color: "#606060" }} onClick={logout}>
              로그아웃&nbsp;&nbsp;
              <AiOutlineLogout />
            </button>
          </div>
          <div className={styles.userMidContainer}>
            <div>
              <span
                className={styles.myPage}
                onClick={() => navigate("/user/password")}
              >
                SSAFY{" "}
                {isEmpty(userInfo) ? "" : `${userInfo.local} ${userInfo.gen}기`}
              </span>
              <span className={styles.helloMessage}>님 반갑습니다</span>
            </div>
            <div />
          </div>
          <div className={styles.userMidContainer}>
            <div />
            <div
              className={styles.userPointButton}
              onClick={() => navigate("/user/advertisement/mymile")}
            >
              <RiDatabase2Line className={styles.myIcon} />
              <p className="align-self-center">
                {isEmpty(userInfo) ? "내 포인트" : `${userInfo.point}`}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.userBottomContainer}>
          <div
            className={styles.myButton}
            onClick={() => navigate("/user/advertisement/myadv")}
          >
            <FaBullhorn className={styles.myIcon} />
            <p className="align-self-center">광고 신청</p>
          </div>
          <div
            className={styles.myButton}
            style={{ padding: "10px 0" }}
            onClick={() => navigate("/user/activity/myposts")}
          >
            <div className={styles.midIcon}>
              <BsFileEarmarkText className={styles.myIcon} />
              <p className="align-self-center">내 게시글</p>
            </div>
          </div>
          <div
            className={styles.myButton}
            onClick={() => navigate("/user/activity/mycomments")}
          >
            <AiOutlineComment className={styles.myIcon} />
            <p className="align-self-center">내 댓글</p>
          </div>
        </div>
      </div>
    );
  }
}
