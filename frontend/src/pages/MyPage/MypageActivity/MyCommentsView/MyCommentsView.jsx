import styles from './MyCommentsView.module.css'

import { useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import customAxios from '../../../../util/customAxios';

export default function MyCommentsView() {
  const date = 100
  const navigate = useNavigate();
  const [comments, setComments] = useState([])
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({})
  const hoursToAdd = 9
  const size = 4;

  useEffect(() => {
    customAxios.get(`/api/comments/user?size=${size}&page=${page - 1}`)
      .then((res) => {
        // console.log(res.data)
        setComments(res.data.content)
        setPageInfo(res.data.pageInfo)
      })
  }, [page])

  const formatDate = function (timestamp) {
    const inputDate = new Date(timestamp);
    const targetDate = new Date(
      inputDate.getTime() + hoursToAdd * 60 * 60 * 1000
    );

    const year = targetDate.getUTCFullYear().toString().slice(-2); // 년도의 마지막 두 자리
    const month = (targetDate.getUTCMonth() + 1).toString().padStart(2, "0"); // 월 (1부터 시작하므로 +1)
    const day = targetDate.getUTCDate().toString().padStart(2, "0"); // 일

    return `${year}.${month}.${day}`;
  };



  return (
    <div className={styles.contentContainer}>
      <div className={styles.welcomeContainer}>
        <div />
      </div>
      <div className={styles.myContentContainer}>
        <div className={styles.mycontentTop}>
          <div className={styles.mycontentTitle}>
            <h2 className={styles.mypostsTitle}>내 댓글 보기</h2>
            <p className={styles.smallTitle}>내가 작성한 댓글을 모아볼 수 있습니다.</p>
          </div>
          {/* <p style={{ color: '#282828' }}>가입한지 <span style={{ color: '#034BB9', fontSize: '1.2rem', fontWeight: '600' }}>+{date}일</span></p> */}
        </div>

        <hr />
        <div className={styles.CommentsContainer}>
          {comments.map((comment, index) => (
            <div className={styles.commentContentsContainer} key={index} onClick={() =>navigate(`/boards/${ comment.boardId}/${comment.articleId}`)}>
              <div className={styles.postContainer}>
                <div className={styles.postContent} id={styles.boardName}>{comment.boardName}</div>
                <div className={styles.postTitle}>{comment.articleTitle}</div>
              </div>

              <div className={styles.commentInd}>
                <div className={styles.commentContainer}>
                  {comment.content}
                </div>
                <div className={styles.boardpostContainer}>
                  <div className={styles.postContainer} id={styles.nickName}>
                    <div className={styles.postContent} >{comment.nickName}</div>
                    <div className={styles.postContent} >{formatDate(comment.createTime)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
  );
}