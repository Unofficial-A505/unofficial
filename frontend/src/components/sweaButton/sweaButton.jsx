import styles from './SweaButton.module.css'

export default function SweaButton(){
  return(
    <button className={styles.swaebuttonContainer}>
      <p className={styles.sweabuttonTitle}>SW Expert Academy</p>
    </button>
  );
}