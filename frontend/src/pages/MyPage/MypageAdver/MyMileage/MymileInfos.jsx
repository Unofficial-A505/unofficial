import styles from './MymileInfos.module.css'

export default function MymileInfos(){

  return(
    <div className={styles.myMiletitleContainer}>
      <div className={styles.myMiledescription}>게시판 글 작성 마일리지 적립</div>
      <div className={styles.myMiledetails}>
        <div>(+) 100</div>
        <div>23.07.31</div>
        <div>5100</div>
      </div>
    </div>
  );
}