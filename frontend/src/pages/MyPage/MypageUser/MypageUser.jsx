import styles from "./MypageUser.module.css";

import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function MypageUser(){
  const navigate = useNavigate();
  const location = useLocation();
  // console.log('location', location.pathname)

  return(
    <div>
      <div className={styles.titleContainer}>
        <p className={ location.pathname === '/user/password' ? styles.titleChecked : styles.title} onClick={() => navigate('/user/password')}>비밀번호 변경</p>
        <p className={ location.pathname === '/user/deletion' ? styles.titleChecked : styles.title } onClick={() => navigate('/user/deletion')}>회원 탈퇴</p>
      </div>
      <Outlet />
    </div>
  );
}