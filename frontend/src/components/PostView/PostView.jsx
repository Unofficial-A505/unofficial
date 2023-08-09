import styles from "./PostView.module.css";

import { useNavigate } from "react-router-dom";
import { FaRegThumbsUp } from "@react-icons/all-files/fa/FaRegThumbsUp";

import {format, register } from 'timeago.js' //임포트하기 register 한국어 선택
import koLocale from 'timeago.js/lib/lang/ko' //한국어 선택

register('ko', koLocale)

export default function PostView({ post, boardId, searchView, keyword, myBoard }) {
  const navigate = useNavigate();

  // const createTime = post.createTime
  // const updateTime = post.modifyTime
  // const createTime_modify = createTime?.slice(0, 10)
  // const updateTime_modify = updateTime?.slice(0, 10)

  return (
    <>
      <div className={styles.boardpostContainer}>
        <div className={styles.postContainerA}>
          <div className={styles.postContent} id={myBoard?styles.boardName:styles.postId}>
            {myBoard?post.boardName:post.id}
          </div>

          {!searchView ?
          <div title={post.title} className={styles.postTitle}
            onClick={() => navigate(`/boards/${boardId}/${post.id}`)}>
            {post.title}
          </div>
          : (<div title={post.title} className={styles.postTitle}
          onClick={() => navigate(`/boards/${boardId}/${post.id}`)}>
          <span>{post.title.split(keyword)[0]}</span>
          <span style={{ color: "#3F51B5", fontWeight: "550",}}>{keyword}</span>
          <span>{post.title.split(keyword)[1]}</span>
          </div>)}

        </div>
        <div className={styles.postContainerB}>
          <div className={styles.postContent} id={myBoard?styles.postcreateBoxsmall:styles.postcreateBox}>{format(post.createTime, 'ko')}</div>
          <div className={styles.postContent} id={myBoard?styles.postrecommendBoxsmall:styles.postrecommendBox}><FaRegThumbsUp className={styles.postIcon}/>{post.likes}</div>
          <div className={styles.postContent} id={myBoard?styles.postviewBoxsmall:styles.postviewBox}>조회수 {post.views}</div>
        </div>
      </div>
    </>
  );
}
