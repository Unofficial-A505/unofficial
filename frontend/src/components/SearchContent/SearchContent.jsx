import styles from './SearchContent.module.css'

import BoardView from '../BoardView/BoardView';

export default function SearchContent(){
  return(
    <div>
      <div className={styles.searchcontentContainer}>
        <BoardView />
      </div>
    </div>
  );
}