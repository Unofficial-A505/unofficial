import styles from './BoardView.module.css'
import axios from 'axios';
import { useEffect, useState, useParams } from 'react';
import { useNavigate } from 'react-router-dom';

import PostView from '../PostView/PostView'

export default function BoardView( ){
  const [ posts, setPosts ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  return(
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <PostView post={post}/>
        </div>
      ))}
    </div>
  );
}