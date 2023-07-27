import styles from "./MyPage.module.css";
import styled from "styled-components";

import TopSpace from "../../components/TopSpace/TopSpace";
import UnderSpace from "../../components/UnderSpace/UnderSpace";

import { useState } from "react";
// import { FiSettings } from "@react-icons/all-files/fi/FiSettings";
import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiActivity } from "@react-icons/all-files/fi/FiActivity";
import { RiAdvertisementLine } from "@react-icons/all-files/ri/RiAdvertisementLine";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";

import { Outlet, Link } from "react-router-dom";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("정보");
  // const handleTabClick = (tabName) => setActiveTab(tabName);
  console.log(activeTab);
  // const NavtopSpace = styled.div`
  //   width: 100px;
  //   height: 40px;
  //   margin: 0 auto;
  // `;

  // const Navhr = styled.hr`
  //   width: 220px;
  //   margin: 10px auto;
  // `;

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
                <div
                  className={styles.navnameContainer}
                  onClick={() => setActiveTab("정보")}
                >
                  <FiHome
                    className={styles.mypagenavIcon}
                    style={activeTab === "정보" ? { color: "#034BB9 " } : {}}
                  />
                  <Link
                    to="/user"
                    className={styles.mypagenavtab}
                    style={activeTab === "정보" ? { color: "#034BB9 " } : {}}
                  >
                    비밀번호 변경
                  </Link>
                </div>
                <div
                  className={styles.navnameContainer}
                  onClick={() => setActiveTab("활동")}
                >
                  <FiActivity
                    className={styles.mypagenavIcon}
                    style={activeTab === "활동" ? { color: "#034BB9" } : {}}
                  />
                  <Link
                    to="activity"
                    className={styles.mypagenavtab}
                    style={activeTab === "활동" ? { color: "#034BB9" } : {}}
                  >
                    내 활동 모아보기
                  </Link>
                </div>
                <div
                  className={styles.navnameContainer}
                  onClick={() => setActiveTab("광고")}
                >
                  <RiAdvertisementLine
                    className={styles.mypagenavIcon}
                    style={activeTab === "광고" ? { color: "#034BB9" } : {}}
                  />
                  <Link
                    to="advertisement"
                    className={styles.mypagenavtab}
                    style={activeTab === "광고" ? { color: "#034BB9" } : {}}
                  >
                    광고 및 마일리지 관리
                  </Link>
                </div>
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
      <UnderSpace />
    </>
  );
}
