import styles from "./BoardsView.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { boardsArticles } from "../../../api/boards"
import PostsView from "../../../components/PostView/PostView";
import Pagination from "../../../components/Pagination/Pagination";

export default function BoardsView() {
  const [ posts, setPosts ] = useState(null);
  const { state : boardTitle } = useLocation();
  let { boardId } = useParams();
  const navigate = useNavigate();
  // console.log('boardId', boardId)
  const [currPage, setcurrPage] = useState(0)
  const [postPerPage, setpostPerPage] = useState(20)
  const [pageInfo, setPageInfo] = useState([])

  useEffect(() => {
    boardsArticles(boardId, currPage, 20)
    .then((res) => {
      console.log('hello', res)
      setPosts(res.content);
      setPageInfo(res.pageInfo)
      setcurrPage(res.pageInfo.page)
    })
    .catch((err) => console.log(err));    
  }, [currPage || boardId]);

  const indexOfLastPost = currPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  // const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNum) => {
    console.log('pageNum', pageNum)
    setcurrPage(pageNum)
    }

  if (posts) {
    return (
      <div>
        {
        posts.map((post, index) => (
          <PostsView key={index} boardTitle={boardTitle} post={post} boardId={boardId} currPage={currPage} />
        ))
        }
      
        <Pagination totalPages={pageInfo.totalPages} paginate={paginate}/>

      </div>
    );
  } else {
    return <div>결과가 없습니다.</div>;
  }
}