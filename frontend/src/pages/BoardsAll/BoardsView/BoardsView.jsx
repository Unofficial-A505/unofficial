import styles from "./BoardsView.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { boardsArticles } from "../../../api/boards"
import PostsView from "../../../components/PostView/PostView";

import customAxios from '../../../util/customAxios'

export default function BoardsView() {
  const [ posts, setPosts ] = useState(null);
  const { state : boardTitle } = useLocation();
  let { boardId } = useParams();
  const navigate = useNavigate();
  // console.log('boardId', boardId)

  useEffect(() => {
    boardsArticles(boardId)
    .then((res) => setPosts(res))
    .catch((err) => console.log(err));
    
  }, [boardId]);

  if (posts) {
    return (
      <div>
        {
          posts.map((post, index) => (
            <PostsView key={index} boardTitle={boardTitle} post={post} boardId={boardId} />
          ))
        }
      </div>
    );
  } else {
    return <div>결과가 없습니다.</div>;
  }
}