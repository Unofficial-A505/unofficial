import styles from "./MyPage.module.css";
import React, { useState, useEffect } from "react";
import TopSpace from "../../components/TopSpace/TopSpace";

import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiActivity } from "@react-icons/all-files/fi/FiActivity";
import { RiAdvertisementLine } from "@react-icons/all-files/ri/RiAdvertisementLine";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";

import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import customAxios from "../../util/customAxios";
import { useSelector } from "react-redux";

export default function MyPage() {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const accessToken = authUser.accessToken;

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, []);

  // 현재 경로에서 'activity'나 'advertisement' 문자열이 있는지 확인
  const location = useLocation();
  const path = location.pathname;
  const isActiveActivity = path.includes("activity");
  const isActiveAdvertisement = path.includes("advertisement");
  const isManagement = path.includes("management");  //관리자
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
  } else {
    activeTab = "정보";
  }
  return (
    <>
      <TopSpace />
      <div className={styles.mypageContainer}>
        <div className={styles.mypageNavContainer}>
          <nav>
            <div className={styles.navtitleContainer}>
              <h4>마이페이지</h4>
            </div>
            <div className={styles.navtopContainer}>
              <div>
                <div className={styles.navnameContainer}>
                  <FiHome
                    className={styles.mypagenavIcon}
                    style={activeTab === "정보" ? { color: "#034BB9 " } : null}
                  />
                  <Link
                    to="/user/password"
                    className={styles.mypagenavtab}
                    style={activeTab === "정보" ? { color: "#034BB9 " } : null}
                  >
                    내 정보 수정
                  </Link>
                </div>
                <div className={styles.navnameContainer}>
                  <FiActivity
                    className={styles.mypagenavIcon}
                    style={activeTab === "활동" ? { color: "#034BB9" } : null}
                  />
                  <Link
                    to="activity/myposts"
                    className={styles.mypagenavtab}
                    style={activeTab === "활동" ? { color: "#034BB9" } : null}
                  >
                    내 활동 모아보기
                  </Link>
                </div>
                <div className={styles.navnameContainer}>
                  <RiAdvertisementLine
                    className={styles.mypagenavIcon}
                    style={activeTab === "광고" ? { color: "#034BB9" } : null}
                  />
                  <Link
                    to="advertisement/mymile"
                    className={styles.mypagenavtab}
                    style={activeTab === "광고" ? { color: "#034BB9" } : null}
                  >
                    광고 및 마일리지 관리
                  </Link>
                </div>
                {role === 'ADMIN' && (
                  <div className={styles.navnameContainer}>
                    <RiAdvertisementLine
                      className={styles.mypagenavIcon}
                      style={activeTab === "관리자" ? { color: "#034BB9" } : null}
                    />
                    <Link
                      to="management"
                      className={styles.mypagenavtab}
                      style={activeTab === "관리자" ? { color: "#034BB9" } : null}
                    >
                      광고 승인 및 취소(관리자)
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <div className={styles.navlogoutContainer}>
            <BiLogOut />
            <button className={styles.logoutButton}>Logout</button>
          </div>
        </div>
        <div className={styles.mypageContentContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
