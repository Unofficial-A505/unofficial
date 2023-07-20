import styles from './SsafyButton.module.css'

import { GrSchedulePlay } from '@react-icons/all-files/gr/GrSchedulePlay';

export default function SsafyButton(){
  return(
    <button className={styles.ssafybuttonContainer}>
      <div className={styles.ssafycenterbox}>
        <GrSchedulePlay />
        <p className={styles.ssafybuttonTitle}>삼성 청년 SW 아카데미</p>
      </div>
    </button> 
  );
}