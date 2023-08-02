import styles from "./PostDetail.module.css";
import axios from "axios";

import { useState, useEffect, useDebugValue, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, redirect, Navigate } from "react-router-dom";

import BoardView from "../../components/BoardView/BoardView";
import CommentView from "../../components/CommentView/CommentView";
import BestpostsWidget from "../../components/BestpostsWidget/BestpostsWidget";
import EduGrantButton from "../../components/EduGrantButton/EduGrantsButton";

import TopSpace from "../../components/TopSpace/TopSpace";

import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
// 작성 timeago 아이콘
import { IoRocketOutline } from "@react-icons/all-files/io5/IoRocketOutline";
// 하얀색 추천 아이콘
import { FaRegThumbsUp } from "@react-icons/all-files/fa/FaRegThumbsUp";
// 삭제 아이콘
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";
// 수정 아이콘
import { HiOutlinePencilAlt } from "@react-icons/all-files/hi/HiOutlinePencilAlt";
import { HiOutlineSpeakerphone } from "@react-icons/all-files/hi/HiOutlineSpeakerphone";
// 말풍선 아이콘
import { IoChatboxOutline } from "@react-icons/all-files/io5/IoChatboxOutline";

// API import
export default function PostDetail() {
  const navigate = useNavigate();
  const { boardTitle } = useParams();
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [ comments, setComments ] = useState([])
  console.log('지금 코멘트', comments)
  const commentElement = useRef(null);

  const getComment = () => {
    axios({
      method: "get",
      url: `https://unofficial.kr/api/comments/article/${postId}`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
    })
      .then((res) => {
        console.log("comments", res.data);
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `https://unofficial.kr/api/articles/${postId}`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
    })
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => console.log(err));

      window.scrollTo({ top: 0, behavior: "smooth" });

      getComment(); 
      return () => {  
        console.log('unmounted')}
      }, [postId]);

  // const { isLoading, error, data: hello } = useQuery(
  //   ['hello', postId ], () =>
  //     axios({
  //     method: "get",
  //     url: `http://127.0.0.1:8000/api/v1/articles/${postId}/`,
  //     // headers: {
  //     //   Authorization: `Token ${this.$store.state.token}`,
  //     // }
  //     })
  //     .then((res) => res.data)
  //     .catch((err) => console.log(err))
  //   );

const commentCreate = () => {
  const content = commentElement.current.value
  const parentId = 0;
  const articleId = postId;
  console.log(content)
  axios({
    method: "post",
    url: `https://unofficial.kr/api/comments`,
    data: { articleId, content, parentId },
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTA1NzE4NjcsInN1YiI6ImFjY2Vzcy10b2tlbiIsImh0dHBzOi8vbG9jYWxob3N0OjgwODAiOnRydWUsInVzZXJfaWQiOjIsInJvbGUiOiJST0xFX1VTRVIifQ.YOofxvS5cyC4WHNgQo1CqA77wwUd2fSLJTw01ubAlU8i2M7XSWoSSPcDWy7kLadmAFt2ZzcbqmX2h904Y4USYA`,
    }
    })
    .then((res) => {
      console.log("댓글 불러오기!!!")
      console.log(res);
      commentElement.current.value = ''
      getComment();
    })
      .then((res) => {
        console.log(res);
        setComments("");
        getComment();
      })
      .catch((err) => console.log(err));
  };

  const commentUpdate = (updateComment, id) => {
    const content = updateComment
    const parentId = 0;
    const articleId = postId;
    console.log(content)
    axios({
      method: "put",
      url: `https://unofficial.kr/api/comments/${id}`,
      data: { id, articleId, content, parentId },
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTA1NzE4NjcsInN1YiI6ImFjY2Vzcy10b2tlbiIsImh0dHBzOi8vbG9jYWxob3N0OjgwODAiOnRydWUsInVzZXJfaWQiOjIsInJvbGUiOiJST0xFX1VTRVIifQ.YOofxvS5cyC4WHNgQo1CqA77wwUd2fSLJTw01ubAlU8i2M7XSWoSSPcDWy7kLadmAFt2ZzcbqmX2h904Y4USYA`,
      }
      })
      .then((res) => {
        console.log("댓글 불러오기!!!")
        console.log(res);
        getComment();
      })
      .catch((err) => console.log(err))
    }

  const CommentDelete = (id) => {
    axios({
      method: "delete",
      url: `https://unofficial.kr/api/comments/${id}`,
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTA1NzE4NjcsInN1YiI6ImFjY2Vzcy10b2tlbiIsImh0dHBzOi8vbG9jYWxob3N0OjgwODAiOnRydWUsInVzZXJfaWQiOjIsInJvbGUiOiJST0xFX1VTRVIifQ.YOofxvS5cyC4WHNgQo1CqA77wwUd2fSLJTw01ubAlU8i2M7XSWoSSPcDWy7kLadmAFt2ZzcbqmX2h904Y4USYA`,
      }
      })
      .then((res) => {
        console.log(res);
        getComment();
      })
      .catch((err) => console.log(err));
  };

  const postDelete = () => {
    console.log('post delete request')
    axios({
      method: "delete",
      url: `https://unofficial.kr/api/articles/${postId}`,
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTA1NzE4NjcsInN1YiI6ImFjY2Vzcy10b2tlbiIsImh0dHBzOi8vbG9jYWxob3N0OjgwODAiOnRydWUsInVzZXJfaWQiOjIsInJvbGUiOiJST0xFX1VTRVIifQ.YOofxvS5cyC4WHNgQo1CqA77wwUd2fSLJTw01ubAlU8i2M7XSWoSSPcDWy7kLadmAFt2ZzcbqmX2h904Y4USYA`,
      }
      })
      .then((res) => {
        console.log(res);
        navigate(`/boards/${boardTitle}`)
      })
      .catch((err) => console.log(err));
    };

  const username = "9기 서울";
  const timeago = "21분 전";
  const recommended = 37;
  const commentsNum = 3;

  return (
    <>
      <TopSpace />
      <div className={styles.postdetailallContainer}>
        <span className={styles.postviewContainer}>
          <div className={styles.postTopbar}>
            <span className={styles.boardTitle}>{boardTitle}</span>
            <button
              className={styles.grayoutbutton}
              onClick={() => navigate(`/boards/${boardTitle}`)}
            >
              <IoIosArrowBack />
              목록으로 돌아가기
            </button>
          </div>
          <div className={styles.postContainer}>
            <div>
              <div className={styles.postTitle}>{title}</div>
              <div className={styles.postusername}>{username}</div>
              <div className={styles.posttimeago}>
                <IoRocketOutline className={styles.tabIcon} size="20" />
                {timeago}
              </div>
            </div>

            <hr />
            <div className={styles.postcontentContainer}>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>

            <div className={styles.postBottombar}>
              <div>
                <FaRegThumbsUp class={styles.tabIcon} size="18" />
                {recommended}
              </div>
              <div className={styles.postupdateBottom}>
                <div onClick={() => navigate(`/boards/${boardTitle}/${postId}/update`, { state : { title, content }})} className={styles.postupdateBottomtab}>
                  <HiOutlinePencilAlt size="15" />
                  update
                </div>
                <div onClick={postDelete} className={styles.postupdateBottomtab}>
                  <IoTrashOutline size="15" />
                  delete
                </div>
                {/* <div className={styles.postupdateBottomtab}><HiOutlineSpeakerphone />공지로 설정하기</div> */}
              </div>
            </div>

            <hr />
          </div>
          <div className={styles.commentInputContainer}>
            <div className={styles.commentTitle}>
              <p>댓글 {commentsNum}</p>
            </div>

            <div className={styles.commentbox}>
              <textarea
                className={styles.commentInput}
                type="text"
                onChange={(e) => setComments(e.target.value)}
                placeholder="댓글을 작성해보세요"
              />
              <button className={styles.commentButton} onClick={commentCreate}>
                <IoChatboxOutline size="23" />
              </button>
            </div>
          </div>

          <div className={styles.postContainer}>
            <hr />
            {comments.map((comment, index) =>
              <div key={index}> 
                <CommentView comment={comment} CommentDelete={CommentDelete} commentUpdate={commentUpdate}/>
              </div>
            )}
          </div>
          <div>
            <nav className={styles.commentPagination} aria-label="...">
              <ul className="pagination pagination-sm">
                <li className="page-item active" aria-current="page">
                  <span className="page-link">1</span>
                </li>
                <li>
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles.pageBottomtab}>
            <button
              className={styles.grayoutbutton}
              onClick={() => navigate(`/boards/${boardTitle}`)}
            >
              <IoIosArrowBack />
              이전글 보기
            </button>
            <button
              className={styles.grayoutbutton}
              onClick={() => navigate(+1)}
            >
              다음글 보기
              <IoIosArrowForward />
            </button>
          </div>

          <hr />

          <div className={styles.moreTopbar}>
            <button
              className={styles.buttonlayoutDel}
              onClick={() => navigate(`/boards/${boardTitle}`)}
            >
              <span className={styles.boardmoreTitleA}>{boardTitle}</span>
              <span className={styles.boardmoreTitleB}>글 더 보기</span>
            </button>
            <button
              className={styles.grayoutbutton}
              onClick={() => navigate(`/boards/${boardTitle}`)}
            >
              목록 보기
              <IoIosArrowForward />
            </button>
          </div>
          <BoardView />
        </span>

        <span className={styles.sideviewContainer}>
          <div className={styles.sideContentContainer}>
            <div className={styles.sidecontentmiddleBox}>
              <BestpostsWidget />
              <EduGrantButton />
            </div>
          </div>
        </span>
      </div>
    </>
  );
}
