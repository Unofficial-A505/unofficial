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
      url: `${process.env.REACT_APP_SERVER}/api/articles`,
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTIxNjE1MzcsInN1YiI6ImFjY2Vzcy10b2tlbiIsImh0dHBzOi8vbG9jYWxob3N0OjgwODAiOnRydWUsInVzZXJfaWQiOjEsInJvbGUiOiJST0xFX0FETUlOIn0.-yKThjZOeyLxvlpVzVHxMAfEw2jbtwVZ-wcX0pYWdgJETpiALTD3H0re8KngsVHx3Zu_rzF8wB_24jkAmv6O5g`,
      }
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
        {posts.map((post, index) => (
          <PostsView key={index} boardTitle={boardTitle} post={post} />
        ))}
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