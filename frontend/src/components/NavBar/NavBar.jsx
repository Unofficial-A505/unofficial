import styles from './NavBar.module.css'

export default function NavBar(){

  return (
    <header className={styles.header}>
      <div className={styles.headertitle}>
        💻 개발자 커뮤니티 SSABRY Time
      </div>
      <div>
        <span className={styles.navlogo}>logo</span>
        <span className={styles.navtabs}>
          <button className={styles.tab}>게시판</button>
          <button className={styles.tab}>게시판</button>
          <button className={styles.tab}>게시판</button>
        </span>
        <span>
          <div className={styles.darkmode}></div>
        </span>
      </div>
    </header>
  )
} 