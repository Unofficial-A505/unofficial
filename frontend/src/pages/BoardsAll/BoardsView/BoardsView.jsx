import styles from "./BoardsView.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PostsView from "../../../components/PostView/PostView";
import customAxios from "../../../util/customAxios";

export default function BoardsView() {
  const { state: id } = useLocation();
  const [ posts, setPosts ] = useState([]);
  let { boardTitle } = useParams();
  if (!boardTitle) {
    boardTitle = "자유게시판";
  }
  const navigate = useNavigate();
  console.log('id', id)

  useEffect(() => {
    customAxios({
      method: "get",
      url: `/api/articles/board/${id}`,
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
  }, [id]);

  if (posts) {
    return (
      <div>
        {
          posts.map((post, index) => (
            <PostsView key={index} boardTitle={boardTitle} post={post} />
          ))
        }
      </div>
    );
  } else {
    return <div>결과가 없습니다.</div>;
  }
}
//   return(
//     <div>
//       BoardsView
//       {boardTitle}
//     </div>
//   );
// }
