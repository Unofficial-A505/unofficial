import styles from './EduGrantsButton.module.css'

import { BsBoxArrowInRight } from '@react-icons/all-files/bs/BsBoxArrowInRight';
import { FaReact } from '@react-icons/all-files/fa/FaReact';

export default function EduGrantsButton(){
  return(
    <button className={styles.edugrantsContainer}>
      <div className={styles.educenterbox}>
        <FaReact color="#07FFFF" size="20" className={styles.reactIcon}/>
        <p className={styles.edubuttonTitle}>교육지원금 서명 생성기</p>
        <BsBoxArrowInRight color="white" className={styles.boxarrowIcon}/>
      </div>
    </button>
  );
}