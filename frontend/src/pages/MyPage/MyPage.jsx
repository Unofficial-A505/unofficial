import styles from "./MyPage.module.css";

import TopSpace from "../../components/TopSpace/TopSpace";
import UnderSpace from "../../components/UnderSpace/UnderSpace";

import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiActivity } from "@react-icons/all-files/fi/FiActivity";
import { RiAdvertisementLine } from "@react-icons/all-files/ri/RiAdvertisementLine";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";

import { Outlet, Link, useLocation } from "react-router-dom";

export default function MyPage() {
  const location = useLocation();
  const path = location.pathname;

  // 현재 경로에서 'activity'나 'advertisement' 문자열이 있는지 확인
  const isActiveActivity = path.includes("activity");
  const isActiveAdvertisement = path.includes("advertisement");
  const isManagement = path.includes("management");//관리자
  let activeTab;
  if (isActiveActivity) {
    activeTab = "활동";
  } else if (isActiveAdvertisement) {
    activeTab = "광고";
  } else if (isManagement) {
    activeTab = "관리자"; // This is added for management
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
