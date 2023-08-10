import styles from "./SearchContent.module.css";

import BoardView from "../BoardView/BoardView";
import PostTypeTitleBar from "../PostTypeTitleBar/PostTypeTitleBar";

export default function SearchContent({ searchResults, keyword }) {
  const searchView = true;

  if (searchResults) {
    return (
      <div>
        <PostTypeTitleBar />
        <div className={styles.searchcontentContainer}>
          <BoardView
            posts={searchResults}
            searchView={searchView}
            keyword={keyword}
          />
        </div>
      </div>
    );
  } else if (!searchResults) {
    <div className={styles.searchcontentContainer}>검색 결과가 없습니다.</div>;
  }
}
