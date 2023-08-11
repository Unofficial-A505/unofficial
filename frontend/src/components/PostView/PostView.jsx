import styles from "./PostView.module.css";

import { useNavigate } from "react-router-dom";
import { FaRegThumbsUp } from "@react-icons/all-files/fa/FaRegThumbsUp";

import {format, register } from 'timeago.js' //임포트하기 register 한국어 선택
import koLocale from 'timeago.js/lib/lang/ko' //한국어 선택

register('ko', koLocale)

export default function PostView({ post, boardId, searchView, keyword, myBoard, currPage }) {
  console.log('myBoard', myBoard)
  const navigate = useNavigate();

  const createTime = post.createTime
  // const updateTime = post.modifyTime
  const createTime_modify = createTime?.slice(0, 10)
  // const updateTime_modify = updateTime?.slice(0, 10)

  return (
    <>
      <div className={styles.boardpostContainer}>
        <div className={styles.postContainerA}>
          <div className={styles.postContent} id={myBoard||searchView?styles.boardName:styles.postId}>
            {myBoard||searchView?post.boardName:post.id}
          </div>

          {!searchView ?
          <div title={post.title} className={styles.postTitle}
            onClick={() => navigate(`/boards/${boardId}/${post.id}`, { state : currPage })}>
            <span >{post.title}</span>
            <span className={styles.postrecommendBox}>[{post.commentsCount}]</span>
          </div>
          : (<div title={post.title} className={styles.postTitle}
          onClick={() => navigate(`/boards/${boardId}/${post.id}`, { state : currPage })}>
          <span>{post.title.split(keyword)[0]}</span>
          <span style={{ color: "#3F51B5", fontWeight: "550",}}>{keyword}</span>
          <span>{post.title.split(keyword)[1]}</span>
          <span className={styles.postrecommendBox}>[{post.commentsCount}]</span>
          </div>)}

        </div>
        {myBoard?
        <div className={myBoard=='myBoard'?styles.postContainerE:styles.postContainerD}>
          {/* <div className={styles.postContent} id={myBoard?styles.postrecommendBoxsmall:styles.postrecommendBox}>{post.commentsCount}</div> */}
          <div className={styles.postContent} id={myBoard=='myBoard'?styles.postcreateBoxmyBoard:styles.postcreateBoxsmall}>{format(post.createTime, 'ko')}</div>
          <div className={styles.postContent} id={myBoard=='myBoard'?styles.postrecommendBoxmyBoard:styles.postrecommendBoxsmall}>
            {/* <FaRegThumbsUp className={styles.postIcon}/> */}
            {post.likes}</div>
          <div className={styles.postContent} id={myBoard=='myBoard'?styles.postviewBoxmyBoard:styles.postviewBoxsmall}>{post.views}</div>
        </div>
        :
        <div className={!searchView?styles.postContainerB:styles.postContainerC}>
          {/* <div className={styles.postContent} id={myBoard?styles.postrecommendBoxsmall:styles.postrecommendBox}>{post.commentsCount}</div> */}
          <div className={styles.postContent} id={myBoard?styles.postcreateBoxsmall:styles.postcreateBox}>{format(post.createTime, 'ko')}</div>
          <div className={styles.postContent} id={myBoard?styles.postrecommendBoxsmall:styles.postrecommendBox}>
            {/* <FaRegThumbsUp className={styles.postIcon}/> */}
            {post.likes}</div>
          {searchView?<div className={styles.postContent} id={styles.postviewBoxSearch}>{post.views}</div>
          :<div className={styles.postContent} id={myBoard?styles.postviewBoxsmall:styles.postviewBox}>{post.views}</div>}
        </div>}
      </div>
    </>
  );
}
