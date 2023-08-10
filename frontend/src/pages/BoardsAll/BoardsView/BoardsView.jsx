import styles from './BoardsView.module.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { boardsArticles } from "../../../api/boards"
import PostsView from "../../../components/PostView/PostView";
import Pagination from "../../../components/Pagination/Pagination";
import PostTypeTitleBar from "../../../components/PostTypeTitleBar/PostTypeTitleBar";

export default function BoardsView() {
  const [ posts, setPosts ] = useState(null);
  const { state : boardTitle } = useLocation();
  let { boardId } = useParams();
  const navigate = useNavigate();
  // console.log('boardId', boardId)
  const [currPage, setcurrPage] = useState(0)
  // const [postPerPage, setpostPerPage] = useState(20)
  const [pageInfo, setPageInfo] = useState([])

  useEffect(() => {
    boardsArticles(boardId, currPage, 20)
    .then((res) => {
      setPosts(res.content);
      setPageInfo(res.pageInfo)
      setcurrPage(res.pageInfo.page)
    })
    .catch((err) => console.log(err));    
  }, [currPage || boardId]);

  // const indexOfLastPost = currPage * postPerPage;
  // const indexOfFirstPost = indexOfLastPost - postPerPage;
  // const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost)


  const paginate = (pageNum) => {
    setcurrPage(pageNum)

    const targetElement = document.getElementById("post-top-bar"); // 스크롤할 요소 선택
    if (targetElement) {
      // comment scroll to
      // console.log('targetElement', targetElement)
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY; // 요소의 상단 위치
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
    }

  if (posts) {
    return (
      <div id="post-top-bar">
        <PostTypeTitleBar/>

        {
        posts.map((post, index) => (
          <PostsView key={index} boardTitle={boardTitle} post={post} boardId={boardId} currPage={currPage} />
        ))
        }

        <div className={styles.paginationContainer}>
          <Pagination totalPages={pageInfo.totalPages} paginate={paginate} currPage={currPage}/>
        </div>

      </div>
    );
  } else {
    return <div>결과가 없습니다.</div>;
  }
}