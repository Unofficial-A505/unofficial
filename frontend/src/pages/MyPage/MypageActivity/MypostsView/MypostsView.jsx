import styles from "./MypostsView.module.css";
import { useSelector } from "react-redux";

import BoardView from "../../../../components/BoardView/BoardView";
import PostTypeTitleBar from "../../../../components/PostTypeTitleBar/PostTypeTitleBar";
import { useEffect, useState } from "react";
import customAxios from "../../../../util/customAxios";
import { PaginationControl } from "react-bootstrap-pagination-control";

export default function MypostsView() {
  const [myPosts, setMyPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const size = 7;

  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    customAxios
      .get(`/api/articles/user?page=${page - 1}&size=${size}`)
      .then((res) => {
        setMyPosts(res.data.content);
        setPageInfo(res.data.pageInfo);
      });
  }, [page]);

  return (
    <div className={styles.contentContainer}>
      <div className={styles.myContentContainer}>
        <div className={styles.mycontentTop}>
          <div className={styles.mycontentTitle}>
            <h2 className={styles.mypostsTitle}>내 게시글 보기</h2>
            <p className={styles.smallTitle}>
              내가 작성한 게시물을 모아볼 수 있습니다.
            </p>
          </div>
          {/* <p style={{color:'#282828'}}>가입한지 <span style={{color:'#034BB9', fontSize:'1.2rem', fontWeight:'600'}}>+{ date }일</span></p> */}
        </div>
        <div className={styles.PostTypeTitleBarBox}><PostTypeTitleBar /></div>
        {!myPosts.length ? (
          <p className="ms-3 mt-4">아직 작성한 게시글이 없습니다.</p>
        ) : (
          <div className={styles.ContentsBox}><BoardView posts={myPosts} myBoard='myBoard' IsAuth={authUser.accessToken}/></div>
        )}
      <div style={{ width: "100%" }} className="d-flex justify-content-center">
        <PaginationControl
          page={page}
          between={4}
          total={pageInfo.totalElements}
          limit={pageInfo.size}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={1}
        />
      </div>
      </div>
    </div>
  );
}
