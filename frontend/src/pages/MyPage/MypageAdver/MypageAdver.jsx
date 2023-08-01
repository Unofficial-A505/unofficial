import styles from './MypageAdver.module.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function MypageAdver(){
  const mileage = 5100
  const navigate = useNavigate();
  const location = useLocation();
 
  return(
    <div>
      <div className={styles.titleContainer}>
        <p className={ location.pathname == '/user/advertisement/mymile' ? styles.titleChecked : styles.title} onClick={() => navigate('/user/advertisement/mymile')}>마일리지 관리</p>
        <p className={ location.pathname == '/user/advertisement/myadv' ? styles.titleChecked : styles.title } onClick={() => navigate('/user/advertisement/myadv')}>광고 관리</p>
      </div>

      <Outlet />
      {/* <div className={styles.contentContainer}>
        <div className={styles.welcomeContainer}>
          <div/>
          <p style={{color:'#282828'}}>
            <RiDatabase2Line size='30'/>
            <span>내 마일리지 &nbsp;</span>
            <span style={{color:'#0969FB', fontSize:'1.2rem', fontWeight:'600'}}>{mileage} </span>
          </p>
        </div>
        <div className={styles.myMileageContainer}>
          <h3>마일리지 사용 내역</h3>
          <div className={styles.temp} />
        </div>
        <div className={styles.myAdvContainer}>
          <h3>광고 관리</h3>
          <div className={styles.buttonContainer}>
            <button onClick={handleAddadv}>광고 추가하기</button>
            <button>광고 게시종료</button>
          </div>
          <div className={styles.temp} />
        </div>
      </div> */}
    </div>
  );
}