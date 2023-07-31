import styles from './MypageActivity.module.css'
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

export default function MypageActivity(){
  // const user = 'SSAFY 서울 9기'
  // const date = 100
  const navigate = useNavigate();
  const location = useLocation();
 
  return(
    <div>
      <div className={styles.titleContainer}>
        <p className={ location.pathname == '/user/activity/myposts' ? styles.titleChecked : styles.title} onClick={() => navigate('/user/activity/myposts')}>내 게시글 보기</p>
        <p className={ location.pathname == '/user/activity/mycomments' ? styles.titleChecked : styles.title } onClick={() => navigate('/user/activity/mycomments')}>내 댓글 보기</p>
      </div>

      <Outlet />
      {/* <div className={styles.contentContainer}>
        <div className={styles.welcomeContainer}>
          <div/> */}
          {/* <p>안녕하세요! <span style={{color:'#282828', fontSize:'1.2rem', fontWeight:'600'}}>{ user }</span>님!</p> */}
          {/* <p style={{color:'#282828'}}>가입한지 <span style={{color:'#0969FB', fontSize:'1.2rem', fontWeight:'600'}}>+{ date }일</span></p>
        </div>
        <div className={styles.myContentContainer}>
          <h3>내 게시글</h3>
          <div className={styles.temp} />
        </div>
        <div className={styles.myContentContainer}>
          <h3>내 댓글</h3>
          <div className={styles.temp} />
        </div>
      </div> */}
    </div>
  );
}