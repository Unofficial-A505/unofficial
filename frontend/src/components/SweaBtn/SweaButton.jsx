import styles from './SweaButton.module.css'

export default function SweaButton(){
  return(
    <a className={styles.sweaAlink} href="https://swexpertacademy.com/main/main.do">
      <button className={styles.swaebuttonContainer}>
          <p className={styles.sweabuttonTitle}>SW Expert Academy</p>
      </button>
    </a>
  );
}