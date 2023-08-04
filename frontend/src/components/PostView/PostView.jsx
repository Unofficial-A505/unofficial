import styles from "./PostView.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegThumbsUp } from "@react-icons/all-files/fa/FaRegThumbsUp";

export default function PostView({ post, boardTitle }) {
  const [postContent, setPostContent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setPostContent(post);
  }, []);

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
              navigate(`/boards/${boardTitle ? boardTitle : "자유게시판"}/${postContent.id}`)
            }
          >
            {postContent.title}
          </div>
        </div>
        <div className={styles.postContainer}>
          <div className={styles.postContent}>{post.createTime}</div>
          <div className={styles.postContent}><FaRegThumbsUp className={styles.postIcon}/>{post.likes}</div>
          <div className={styles.postContent}>사용자</div>
          <div className={styles.postContent}>조회수 {post.views}</div>
        </div>
      </div>
    </>
  );
}
