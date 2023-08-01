import styles from './MyMileage.module.css'
import { RiDatabase2Line } from '@react-icons/all-files/ri/RiDatabase2Line';

import MymileInfos from './MymileInfos'

export default function MyMileage(){
  const mileage = 5100

  return(
    <div className={styles.contentContainer}>
      <div className={styles.mycontentContainer}>
        <div className={styles.mycontentTitle}>
          <h2 className={styles.mypostsTitle}>마일리지 관리</h2> 
          <p className={styles.smallTitle}>마일리지 적립 및 사용 내역을 확인할 수 있습니다.</p>
        </div> 
        
        <div className={styles.myMileContainer}>
          <div className={styles.myMiletitleContainer}>
            <div className={styles.myMiledescrip}>설명</div>
            <div className={styles.myMiledetails}>
              <div>마일리지</div>
              <div>적립날짜</div>
              <div>잔여</div>
            </div>
          </div>
        
          <MymileInfos />
          <MymileInfos />
          <MymileInfos />
          <MymileInfos />
          <MymileInfos />
          <MymileInfos />
        
        </div>
      </div>
    </div>
  );
}