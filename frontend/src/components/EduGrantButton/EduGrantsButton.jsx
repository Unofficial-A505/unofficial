import styles from "./EduGrantsButton.module.css";

import { BsBoxArrowInRight } from "@react-icons/all-files/bs/BsBoxArrowInRight";
import { FaReact } from "@react-icons/all-files/fa/FaReact";

export default function EduGrantsButton() {
  const handleClick = () => {
    window.location.href = 'https://dydwkd486.github.io/ssafy-sign/';
  }

  return (
    <button className={styles.edugrantsContainer} onClick={handleClick} >
      <FaReact color="#07FFFF" size="18" className={styles.reactIcon} />
      <p className={styles.edubuttonTitle}>교육지원금 서명 생성기</p>
    </button>
  );
}
