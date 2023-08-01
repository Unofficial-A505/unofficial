import styles from './EdussafyButton.module.css'
import eduSSAFY_logo from './../../assets/images/eduSSAFY_logo.jpg'
import { GrSchedulePlay } from '@react-icons/all-files/gr/GrSchedulePlay';

export default function EdussafyButton(){
  const handleClick = () => {
    window.open('https://edu.ssafy.com/','_blank');
  }

  return(
    <button className={styles.ssafybuttonContainer} onClick={handleClick}>
      <img src={eduSSAFY_logo} alt="eduSSAFY_logo" width={24} />
      <p className={styles.ssafybuttonTitle}>삼성 청년 SW 아카데미</p>
    </button> 
  );
}