import styles from './MyAdvertisement.module.css'

export default function MyAdvertisement(){
  const handleAddadv = () => {
    window.open("http://localhost:3000/user/advertisement/form", "hello", "top=200,left=300,width=600,height=600")
  }

  return(
    <div className={styles.myAdvContainer}>
      <h3>광고 관리</h3>
      <div className={styles.buttonContainer}>
        <button onClick={handleAddadv}>광고 추가하기</button>
        <button>광고 게시종료</button>
      </div>
      <div className={styles.temp} />
    </div>
  );
}