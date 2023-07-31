import styles from './SweaButton.module.css'

export default function SweaButton(){
  const handleClick = () => {
    window.location.href = "https://swexpertacademy.com/main/main.do"
  }

  return(
    <button className={styles.swaebuttonContainer} onClick={handleClick}>
      <div className={styles.swaeLogo} />
      <p className={styles.sweabuttonTitle}>SW Expert Academy</p>
    </button>
  );
}