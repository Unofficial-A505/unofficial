import styles from "./BoardsView.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { boardArticlesAll } from "../../../api/boards"
import PostsView from "../../../components/PostView/PostView";

import customAxios from '../../../util/customAxios'

export default function BoardsView() {
  const [ posts, setPosts ] = useState(null);
  const { state : boardTitle } = useLocation();
  let { boardId } = useParams();
  const navigate = useNavigate();
  console.log('boardId', boardId)

  useEffect(() => {
    customAxios({
      method: "get",
      url: `/api/articles/board/${boardId}`,
      // headers: {
      // }
    })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.content); 
      })
      .catch((err) => console.log(err));
    return () => {
      console.log("unmounted");
    };
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