import styles from './BestpostsWidget.module.css'

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaCrown } from '@react-icons/all-files/fa/FaCrown';

export default function BestpostsWidget(){
  const navigate = useNavigate();

  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/v1/articles/`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.slice(0, 10));
      })
      .catch((err) => console.log(err))
    return () => {  
      console.log('unmounted')
     }}, []);

  return(
    <div className={styles.bestpostwidgetContainer}>
      <div className={styles.bestTitle}>Best 게시글<FaCrown className={styles.bestIcons}/></div>
      <div className={styles.bestpostsContainer}>
        {posts.map((post, index) => 
          <div key={index} className={styles.bestpostContents}>
            <span className={styles.bestboardTitles} onClick={() => {navigate(`/boards/자우게시판`)}}>자유</span>
            <span className={styles.bestcontentTitles} onClick={() => navigate(`/boards/자유게시판/${post.id}`)}>{post.title}</span>
          </div>
        )}
      </div>  
  </div>
  );
}