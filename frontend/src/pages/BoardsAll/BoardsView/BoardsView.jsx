import styles from "./BoardsView.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostsView from "../../../components/PostView/PostView";

export default function BoardsView() {
  const [posts, setPosts] = useState([]);
  let { boardTitle } = useParams();
  if (!boardTitle) {
    boardTitle = "자유게시판";
  }
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://unofficial.kr/api/articles`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
    })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
    return () => {
      console.log("unmounted");
    };
  }, []);

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