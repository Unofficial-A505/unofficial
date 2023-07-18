import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';

export default function NavBar(){

  return (
    <header className={styles.header}>
      <div className={styles.headertitle}>
        💻 개발자 커뮤니티 SSABRY Time
      </div>
      <div>
        <span className={styles.navlogo}>logo</span>
        <span className={styles.navtabs}>
          <Link className={styles.tab} to='board'>게시판</Link>
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