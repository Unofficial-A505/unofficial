import styles from "./BoardsView.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { boardsArticles } from "../../../api/boards";
import PostsView from "../../../components/PostView/PostView";
import PaginationCustom from "../../../components/Pagination/Pagination";
import PostTypeTitleBar from "../../../components/PostTypeTitleBar/PostTypeTitleBar";

export default function BoardsView() {
  const [posts, setPosts] = useState(null);
  const { state: boardTitle } = useLocation();
  const [filterByLikes, setFilterByLikes] = useState(false);
  let { boardId } = useParams();
  const [currPage, setcurrPage] = useState(0);
  // const [postPerPage, setpostPerPage] = useState(20)
  const [pageInfo, setPageInfo] = useState([]);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    setcurrPage(1)

    boardsArticles(boardId, currPage - 1, 20)
      .then((res) => {
        // console.log(res);
        setPosts(res.content);
        setPageInfo(res.pageInfo);
        // setcurrPage(res.pageInfo.page + 1);
      })
      .catch((err) => console.log(err));
  }, [boardId]);

  useEffect(() => {
    boardsArticles(boardId, currPage - 1, 20)
      .then((res) => {
        setPosts(res.content);
        setPageInfo(res.pageInfo);
        // setcurrPage(res.pageInfo.page + 1);
      })
      .catch((err) => console.log(err));
  }, [currPage]);

  // const indexOfLastPost = currPage * postPerPage;
  // const indexOfFirstPost = indexOfLastPost - postPerPage;
  // const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNum) => {
    setcurrPage(pageNum);

    const targetElement = document.getElementById("post-top-bar"); // 스크롤할 요소 선택
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY; // 요소의 상단 위치
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  if (posts) {
    return (
      <div id="post-top-bar">
        <PostTypeTitleBar />

        {posts.map((post, index) => (
          <PostsView
            key={index}
            boardTitle={boardTitle}
            post={post}
            boardId={boardId}
            currPage={currPage}
            IsAuth={authUser.accessToken}
          />
        ))}

        <div className={styles.paginationContainer}>
          <PaginationCustom
            totalPages={pageInfo.totalPages}
            paginate={paginate}
            currPage={currPage}
          />
        </div>
      </div>
    );
  } else {
    return <div>결과가 없습니다.</div>;
  }
}
