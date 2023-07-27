import styles from './SweaButton.module.css'

export default function SweaButton(){
  return(
    <button className={styles.swaebuttonContainer}>
      <a className={styles.sweaAlink} href="https://swexpertacademy.com/main/main.do">
        <p className={styles.sweabuttonTitle}>SW Expert Academy</p>
      </a>
    </button>
  );
}