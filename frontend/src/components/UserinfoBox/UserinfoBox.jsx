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

export default function UserinfoBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    setIsAuth(authUser.accessToken);
  }, [authUser]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await customAxios.get("/api/users/user");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user role", error);
      }
    };
    getUserData();
  }, []);

  const logout = () => {
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
      <div className={styles.usercontainer}>
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
      <div className={styles.usercontainer}>
        <div className={styles.userTopContainer}>
          <p style={{ color: "#606060" }}>안녕하세요!</p>
          <button
            className={styles.logout}
            style={{ color: "#606060" }}
            onClick={logout}
          >
            로그아웃&nbsp;
            <AiOutlineLogout />
          </button>
        </div>
        <div className={styles.userMidContainer}>
          <div className="mb-3">
            <span
              className={styles.myPage}
              onClick={() => navigate("/user/password")}
            >
              SSAFY{" "}
              {isEmpty(userInfo) ? "" : `${userInfo.local} ${userInfo.gen}기`}
            </span>
            <span className={styles.secondhelloMessage}>
              님의 이야기를 들려주세요
            </span>
          </div>
          <p
            className={styles.adverButton}
            style={{ color: "#034BB9", fontSize: "0.9rem" }}
            onClick={() => navigate("/user/advertisement/myadv")}
          >
            광고 신청하기
          </p>
        </div>

        <div className={styles.mypageContent}>
          <div
            className={styles.myButton}
            onClick={() => navigate("/user/advertisement/mymile")}
          >
            <RiDatabase2Line className={styles.myIcon} />
            <p className={styles.mileageTotal}>
              {isEmpty(userInfo) ? "내 포인트" : `${userInfo.point}`}
            </p>
          </div>
          <div className="d-flex">
            <div
              className={styles.myButton}
              onClick={() => navigate("/user/activity/myposts")}
            >
              <BsFileEarmarkText className={styles.myIcon} />
              <p className="me-2">내 게시글</p>
            </div>
            <div
              className={styles.myButton}
              onClick={() => navigate("/user/activity/mycomments")}
            >
              <AiOutlineComment className={styles.myIcon} />
              <p>내 댓글</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
