import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';

export default function NavBar(){

  return (
    <header className={styles.header}>
      <div className={styles.headertitle}>
        💻 개발자 커뮤니티 SSABRY Time
      </div>

      <div>
        <div className={styles.navContainer}>
          <Link to='' className={styles.navlogo}>logo</Link>
          <span className={styles.navtabs}>
            <Link className={styles.tab} to='boards/자유게시판'>게시판</Link>
            <button className={styles.tab}>게시판</button>
            <button className={styles.tab}>게시판</button>
          </span>
          <span>
            <div className={styles.darkmode}></div>
          </span>
        </div>
      </div>
    </header>
  )
} 