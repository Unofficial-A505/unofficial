import styles from './MySignout.module.css'

export default function MySignout(){
  return(
    <div className={styles.contentContainer}>
      <div className={styles.myContentContainer}>
        <div className={styles.mycontentTitle}>
          <h2 className={styles.mypostsTitle}>회원 탈퇴</h2>
          <p className={styles.smallTitle}>회원 탈퇴시 주의 사항을 반드시 확인해주세요.</p>
        </div>
        <div className={styles.signoutContainer}>
        </div>
      </div>
    </div>
  );
}