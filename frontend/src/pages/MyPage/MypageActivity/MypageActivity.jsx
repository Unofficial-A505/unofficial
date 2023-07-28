import styles from './MypageActivity.module.css'

export default function MypageActivity(){
  // const user = 'SSAFY 서울 9기'
  const date = 100
 
  return(
    <div>
      <div className={styles.titleContainer}>
        <p>내 활동 모아보기</p>
        
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.welcomeContainer}>
          <div/>
          {/* <p>안녕하세요! <span style={{color:'#282828', fontSize:'1.2rem', fontWeight:'600'}}>{ user }</span>님!</p> */}
          <p style={{color:'#282828'}}>가입한지 <span style={{color:'#0969FB', fontSize:'1.2rem', fontWeight:'600'}}>+{ date }일</span></p>
        </div>
        <div className={styles.myContentContainer}>
          <h3>내 게시글</h3>
          <div className={styles.temp} />
        </div>
        <div className={styles.myContentContainer}>
          <h3>내 댓글</h3>
          <div className={styles.temp} />
        </div>
      </div>
    </div>
  );
}