import styles from "./BoardsView.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { boardArticlesAll } from "../../../api/boards"
import PostsView from "../../../components/PostView/PostView";

export default function BoardsView() {
  const [ posts, setPosts ] = useState(null);
  let { boardId } = useParams();
  const navigate = useNavigate();
  console.log('boardId', boardId)

  useEffect(() => {
    boardArticlesAll
    .then((res) => {
      setPosts(res);
    }).catch((err) => console.log(err));

    return () => {
      console.log("unmounted");
    };
  }, [boardId]);

  if (posts) {
    return (
      <div>
        {posts.map((post, index) => (
          <PostsView key={index} boardId={boardId} post={post} />
        ))}
      </div>
    );
  } else {
    return <div>결과가 없습니다.</div>;
  }
}