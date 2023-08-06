import styles from "./PostView.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegThumbsUp } from "@react-icons/all-files/fa/FaRegThumbsUp";

export default function PostView({ post, boardId }) {
  const navigate = useNavigate();

  const createTime = post.createTime
  const updateTime = post.modifyTime

  const createTime_modify = createTime?.slice(0, 10)
  const updateTime_modify = updateTime?.slice(0, 10)

  return (
    <>
      <div className={styles.boardpostContainer}>
        <div className={styles.postContainer}>
          <div className={styles.postContent} id={styles.boardName}>
            {post.id}
          </div>
          <div
            className={styles.postTitle}
            onClick={() =>
              navigate(`/boards/${boardId}/${post.id}`)
            }
          >
            {post.title}
          </div>
        </div>
        <div className={styles.postContainer}>
          <div className={styles.postContent}>{createTime_modify} (수정 : {updateTime_modify})</div>
          <div className={styles.postContent} id={styles.postrecommendBox}><FaRegThumbsUp className={styles.postIcon}/>{post.likes}</div>
          {/* <div className={styles.postContent}>사용자</div> */}
          <div className={styles.postContent} id={styles.postviewBox}>조회수 {post.views}</div>
        </div>
      </div>
    </>
  );
}
