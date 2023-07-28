import styles from './PostView.module.css'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostView({ post, boardTitle }){
  const [ postContent, setPostContent ] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    setPostContent(post)
  }, [])

  return(
    <>
      <div className={styles.boardpostContainer}>
        <div className={styles.postContainer}>
          <div className={styles.postContent} id={styles.boardName}>{boardTitle ? boardTitle : '자유게시판'}</div>
          <div className={styles.postTitle} onClick={() => navigate(`/boards/${boardTitle ? boardTitle : '자유게시판'}/${postContent.id}`)}>{postContent.title}</div>
        </div>
        <div className={styles.postContainer}>
          <div className={styles.postContent}>추천수</div>
          <div className={styles.postContent}>사용자</div>
          <div className={styles.postContent}>{post.updated_at.slice(0, 10)}</div>
        </div>
      </div>
    </>
  );
}

