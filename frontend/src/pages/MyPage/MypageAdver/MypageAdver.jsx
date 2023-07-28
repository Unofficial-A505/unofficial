import styles from './MypageAdver.module.css'

import { RiDatabase2Line } from '@react-icons/all-files/ri/RiDatabase2Line';

export default function MypageAdver(){
  const mileage = 5100

  const handleAddadv = () => {
    window.open("http://localhost:3000/user/advertisement/form", "hello", "top=200,left=300,width=600,height=600")
  }
 
  return(
    <div>
      <div className={styles.titleContainer}>
        <p>마일리지 및 광고</p>
        
      </div>
      <div className={styles.contentContainer}>
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
      </div>
    </div>
  );
}