import styles from "./BoardsView.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PostsView from "../../../components/PostView/PostView";
import customAxios from "../../../util/customAxios";

export default function BoardsView() {
  const [ posts, setPosts ] = useState(null);
  let { boardId } = useParams();

  const navigate = useNavigate();
  console.log('id', boardId)

  useEffect(() => {
    customAxios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER}/api/articles`,
      // url: `${process.env.REACT_APP_SERVER}/api/articles/${boardId}`,
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
        {posts.map((post, index) => (
          <PostsView boardId={boardId} post={post} />
        ))}
      </div>
    );
  } else {
    return <div>결과가 없습니다.</div>;
  }
}