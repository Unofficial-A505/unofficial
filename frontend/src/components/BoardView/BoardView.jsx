import styles from './BoardView.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PostView from '../PostView/PostView'

export default function BoardView({ posts, searchView, keyword, myBoard, boardId, currPage, IsAuth}){
  if (!posts) { posts = [] }

  const [ currentPage, setCurrentPage ] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  return(
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <PostView post={post} boardId={post.boardId} searchView={searchView} keyword={keyword} myBoard={myBoard} currPage={currPage} IsAuth={IsAuth}/>
        </div>
      ))}
    </div>
  ) 
}
