import styles from './SweaButton.module.css'

export default function SweaButton(){
  const handleClick = () => {
    window.open('https://swexpertacademy.com/main/main.do','_blank')
  }

  return(
    <button className={styles.swaebuttonContainer} onClick={handleClick}>
      <div className={styles.swaeLogo} />
      <p className={styles.sweabuttonTitle}>SW Expert Academy</p>
    </button>
  );
}