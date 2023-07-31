import styles from './MyMileage.module.css'
import { RiDatabase2Line } from '@react-icons/all-files/ri/RiDatabase2Line';

export default function MyMileage(){
  const mileage = 5100

  return(
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
    </div>
  );
}