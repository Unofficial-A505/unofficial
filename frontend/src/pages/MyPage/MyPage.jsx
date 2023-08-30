/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./MyPage.module.css";
import React, { useState, useEffect } from "react";
import TopSpace from "../../components/TopSpace/TopSpace";

import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiActivity } from "@react-icons/all-files/fi/FiActivity";
import { RiAdvertisementLine } from "@react-icons/all-files/ri/RiAdvertisementLine";
import { RiLogoutCircleLine } from "@react-icons/all-files/ri/RiLogoutCircleLine";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import customAxios from "../../util/customAxios";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setAuthUserEmail } from "../../store/loginSlice";
import useDocumentTitle from "../../useDocumentTitle";

export default function MyPage() {
  useDocumentTitle("마이페이지");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const accessToken = authUser.accessToken;

  useEffect(() => {
    if (!accessToken) {
      alert("로그인 후에 사용해 주세요.");
      navigate("/");
      return;
    }
  }, []);

  // 현재 경로에서 'activity'나 'advertisement' 문자열이 있는지 확인
  const location = useLocation();
  const path = location.pathname;
  const isActiveActivity = path.includes("activity");
  const isActiveAdvertisement = path.includes("advertisement");
  const isManagement = path.includes("management"); //관리자
  const isSuggestion = path.includes("suggestion");
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const response = await customAxios.get("api/users/user");
        setRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role", error);
      }
    };
    getUserRole();
  }, []);

  let activeTab;
  if (isActiveActivity) {
    activeTab = "활동";
  } else if (isActiveAdvertisement) {
    activeTab = "광고";
  } else if (isManagement) {
    activeTab = "관리자"; // 관리자
  } else if (isSuggestion) {
    activeTab = "건의함"; // 건의함
  } else {
    activeTab = "정보";
  }

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
    <>
      <TopSpace />
      <div className={styles.mypageContainer}>
        <div className={styles.mypageNavContainer}>
          <nav>
            <div className={styles.navTitleContainer}>
              <h4>마이페이지</h4>
            </div>
            <div>
              <div
                className={styles.navTab}
                onClick={() => navigate("password")}
                style={
                  activeTab === "정보"
                    ? { color: "#034BB9" }
                    : { color: "#666a71" }
                }
              >
                <FiHome className="me-2" size={20} />
                <p>내 정보 수정</p>
              </div>
              <div
                className={styles.navTab}
                onClick={() => navigate("activity/myposts")}
                style={
                  activeTab === "활동"
                    ? { color: "#034BB9" }
                    : { color: "#666a71" }
                }
              >
                <FiActivity className="me-2" size={20} />
                <p>내 활동 모아보기</p>
              </div>
              <div
                className={styles.navTab}
                onClick={() => navigate("advertisement/mymile")}
                style={
                  activeTab === "광고"
                    ? { color: "#034BB9" }
                    : { color: "#666a71" }
                }
              >
                <RiAdvertisementLine className="me-2" size={20} />
                <p>광고 및 마일리지 관리</p>
              </div>
              {role === "ADMIN" && (
                <div
                  className={styles.navTab}
                  onClick={() => navigate("management")}
                  style={
                    activeTab === "관리자"
                      ? { color: "#034BB9" }
                      : { color: "#666a71" }
                  }
                >
                  <RiAdvertisementLine className="me-2" size={20} />
                  <p>광고 승인(관리자)</p>
                </div>
              )}
              {role === "ADMIN" && (
                <div
                  className={styles.navTab}
                  onClick={() => navigate("suggestion")}
                  style={
                    activeTab === "건의함"
                      ? { color: "#034BB9" }
                      : { color: "#666a71" }
                  }
                >
                  <RiAdvertisementLine className="me-2" size={20} />
                  <p>건의함(관리자)</p>
                </div>
              )}
            </div>
          </nav>
          <div className={styles.logoutTab} onClick={logout}>
            <RiLogoutCircleLine className="me-2" size={20} />
            <p>Logout</p>
          </div>
        </div>
        <div className={styles.mypageContentContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
