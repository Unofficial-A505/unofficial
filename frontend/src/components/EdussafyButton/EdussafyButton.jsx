import styles from './EdussafyButton.module.css'

import { GrSchedulePlay } from '@react-icons/all-files/gr/GrSchedulePlay';

export default function EdussafyButton(){
  return(
    <a className={styles.edussafyAlink} href="https://edu.ssafy.com/">
      <button className={styles.ssafybuttonContainer}>
          <div className={styles.ssafycenterbox}>
            <GrSchedulePlay />
            <p className={styles.ssafybuttonTitle}>삼성 청년 SW 아카데미</p>
          </div>
      </button> 
    </a> 
  );
}