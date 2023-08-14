import styles from './PostTypeTitleBar.module.css'

export default function PostTypeTitleBar() {
  return (
    <div>
      <div className={styles.postsTitletab}>
          <div className={styles.postsTitletabLeft}>
            <div>제목</div>
          </div>
          <div className={styles.postsTitletabRight}>
            {/* <div className={styles.postTitles}>댓글</div> */}
            <div className={styles.postTitles}>작성일</div>
            <div className={styles.postTitles}>추천</div>
            <div className={styles.postTitles}>조회수</div>
          </div>
        </div>
    </div>
  )
}