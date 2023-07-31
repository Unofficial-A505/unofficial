import styles from './SearchContent.module.css'

import BoardView from '../BoardView/BoardView';

export default function SearchContent(){
  return(
    <div>

        <div className={styles.searchcontentContainer}>
          <h2 className={styles.searchcontentTabs}>제목</h2>
          <BoardView />
        </div>

          <br />

        <div className={styles.searchcontentContainer}>
          <h2 className={styles.searchcontentTabs}>내용</h2>
          <BoardView />
        </div>
    </div>
  );
}