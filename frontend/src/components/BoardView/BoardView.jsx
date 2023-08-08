import styles from './BoardView.module.css'
import axios from 'axios';
import { useEffect, useState, useParams } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PostView from '../PostView/PostView'
import customAxios from '../../util/customAxios';

export default function BoardView({ posts, searchView, keyword, myBoard, boardId }){
  if (!posts) { posts = [] }

  const [ currentPage, setCurrentPage ] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  return(
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <PostView post={post} searchView={searchView} keyword={keyword} myBoard={myBoard} boardId={boardId}/>
        </div>
      ))}
    </div>
  ) 
}
