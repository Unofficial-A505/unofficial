import styles from "./MypageActivity.module.css";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

export default function MypageActivity() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <div className={styles.titleContainer}>
        <p
          className={
            location.pathname === "/user/activity/myposts"
              ? styles.titleChecked
              : styles.title
          }
          onClick={() => navigate("/user/activity/myposts")}
        >
          내 게시글 보기
        </p>
        <p
          className={
            location.pathname === "/user/activity/mycomments"
              ? styles.titleChecked
              : styles.title
          }
          onClick={() => navigate("/user/activity/mycomments")}
        >
          내 댓글 보기
        </p>
      </div>
      <Outlet />
    </div>
  );
}
