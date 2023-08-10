import styles from './BestpostsWidget.module.css'

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaCrown } from '@react-icons/all-files/fa/FaCrown';
import { FiRefreshCw } from '@react-icons/all-files/fi/FiRefreshCw';
import customAxios from '../../util/customAxios';

import { bestPostsApi } from '../../api/boards.js'

export default function BestpostsWidget(){
  const navigate = useNavigate();

  const [ posts, setPosts ] = useState([])

  const bestRefresh = () => {
    customAxios({
      method: "get",
      url: `/api/best`,
    })
    .then((res) => {
      setPosts(res.data.slice(0, 11));
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    bestRefresh();
  }, []);

  return(
    <div className={styles.bestpostwidgetContainer}>
      <div className={styles.bestwidgetTopbar}>
        <div className={styles.bestTitle}>Best 게시글<FaCrown className={styles.bestIcons}/></div>
        <FiRefreshCw className={styles.bestrefreshIcon} onClick={bestRefresh}/>
      </div>
      <div className={styles.bestpostsContainer}>
        {posts.map((post, index) => 
          <div key={index} className={styles.bestpostContents}>
            <span className={styles.bestboardTitles} onClick={() => {navigate(`/boards/${post.boardId}`)}}>{post.boardName?.slice(0, -3)}</span>
            <span title={post.title} className={styles.bestcontentTitles} onClick={() => navigate(`/boards/${post.boardId}/${post.articleId}`)}>{post.title}</span>
          </div>
        )}
      </div>  
  </div>
  );
}