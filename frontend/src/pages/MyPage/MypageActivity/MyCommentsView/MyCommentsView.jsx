import styles from "./MyCommentsView.module.css";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import customAxios from "../../../../util/customAxios";

import {format, register } from 'timeago.js' //임포트하기 register 한국어 선택
import koLocale from 'timeago.js/lib/lang/ko' //한국어 선택

register('ko', koLocale)

export default function MyCommentsView() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const hoursToAdd = 9;
  const size = 5;

  useEffect(() => {
    customAxios
      .get(`/api/comments/user?size=${size}&page=${page - 1}`)
      .then((res) => {
        // console.log(res.data)
        setComments(res.data.content);
        setPageInfo(res.data.pageInfo);
      });
  }, [page]);

  // const formatDate = function (timestamp) {
  //   const inputDate = new Date(timestamp);
  //   const targetDate = new Date(
  //     inputDate.getTime() + hoursToAdd * 60 * 60 * 1000
  //   );

  //   const year = targetDate.getUTCFullYear().toString().slice(-2); // 년도의 마지막 두 자리
  //   const month = (targetDate.getUTCMonth() + 1).toString().padStart(2, "0"); // 월 (1부터 시작하므로 +1)
  //   const day = targetDate.getUTCDate().toString().padStart(2, "0"); // 일

  //   return `${year}.${month}.${day}`;
  // };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.myContentContainer}>
        <div className={styles.mycontentTop}>
          <div className={styles.mycontentTitle}>
            <h2 className={styles.mypostsTitle}>내 댓글 보기</h2>
            <p className={styles.smallTitle}>
              내가 작성한 댓글을 모아볼 수 있습니다.
            </p>
          </div>
          {/* <p style={{ color: '#282828' }}>가입한지 <span style={{ color: '#034BB9', fontSize: '1.2rem', fontWeight: '600' }}>+{date}일</span></p> */}
        </div>

        <div className={styles.CommentsContainer}>
          {!comments.length ? (
            <p className="ms-3 mt-4">아직 작성한 댓글이 없습니다.</p>
          ) : (
            <>
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className={styles.commentContentsContainer}
                  onClick={() =>
                    navigate(`/boards/${comment.boardId}/${comment.articleId}`)
                  }
                >
                  <div className={styles.posttitleContainer}>
                    <div className={styles.postContent} id={styles.boardName}>
                      {comment.boardName}
                    </div>
                    <div className={styles.postTitle} title={comment.articleTitle}>
                      {comment.articleTitle}
                    </div>
                  </div>

                  <div className={styles.commentInd}>
                    <div className={styles.commentContainer} title={comment.content}>
                      {comment.content}
                    </div>
                    <div className={styles.boardpostContainer}>
                      <div
                        className={styles.postContainer}
                      >
                        <div className={styles.commentContent}>
                          {comment.nickName}
                        </div>
                        <div className={styles.commentContent}>
                          {format(comment.createTime, 'ko')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div
          style={{ width: "100%" }}
          className="d-flex justify-content-center"
        >
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
