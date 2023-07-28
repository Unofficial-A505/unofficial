import styles from './NavBar.module.css'
import { useNavigate } from 'react-router-dom';

export default function NavBar(){
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headertitle}>
        💻 개발자 커뮤니티 SSABRY Time
      </div>
      
      <div className={styles.navContainerBox}>
        <div className={styles.navContainer}>
          <div onClick={() => navigate('/')} className={styles.navlogo}>logo</div>
          <span className={styles.navtabs}>
            <button className={styles.tab} onClick={() => {navigate('/boards/자유게시판')}}>게시판</button>
            <button className={styles.tab}>건의하기</button>
            <button className={styles.tab}>칠판</button>
          </span>
          <span>
            <div className={styles.darkmode}></div>
          </span>
        </div>
      </div>
    </header>
  )
} 