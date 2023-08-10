import styles from "./PostDetail.module.css";

import { useState, useEffect, useDebugValue, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

import BoardView from "../../components/BoardView/BoardView";
import CommentView from "../../components/CommentView/CommentView";
import RecommentsView from "../../components/RecommentsView/RecommentsView";
import BestpostsWidget from "../../components/BestpostsWidget/BestpostsWidget";
import ServerTime from "../../components/ServerTime/ServerTime";
import PostTypeTitleBar from "../../components/PostTypeTitleBar/PostTypeTitleBar";

import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
// 작성 timeago 아이콘
import { IoRocketOutline } from "@react-icons/all-files/io5/IoRocketOutline";
// 추천 아이콘
import { FaRegThumbsUp } from "@react-icons/all-files/fa/FaRegThumbsUp";
import { FaThumbsUp } from "@react-icons/all-files/fa/FaThumbsUp";
// 삭제 아이콘
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";
// 수정 아이콘
import { HiOutlinePencilAlt } from "@react-icons/all-files/hi/HiOutlinePencilAlt";
import { HiOutlineSpeakerphone } from "@react-icons/all-files/hi/HiOutlineSpeakerphone";
// 말풍선 아이콘
import { IoChatboxOutline } from "@react-icons/all-files/io5/IoChatboxOutline";
// 조회수 아이콘
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";

import { boardsArticles } from "../../api/boards";
import {
  postDetailApi,
  postDeleteApi,
  postRecommendInputApi,
} from "../../api/posts";
import {
  postCommentsApi,
  postCommentCreateApi,
  postCommentUpdateApi,
  postCommentDeleteApi,
} from "../../api/comments";

import customAxios from "../../util/customAxios";
import useDocumentTitle from "../../useDocumentTitle";

import {format, register } from 'timeago.js' //임포트하기 register 한국어 선택
import koLocale from 'timeago.js/lib/lang/ko' //한국어 선택

register('ko', koLocale)

// API import
export default function PostDetail() {
  const navigate = useNavigate();

  const { boardId } = useParams();
  const { postId } = useParams();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [postDetail, setpostDetail] = useState({});
  const [createcomment, setcreateComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsInfo, setCommentsInfo] = useState({});
  const [commentnickName, setcommentnickName] = useState("");
  const [currboardPosts, setcurrboardPosts] = useState([]);
  const [recommendedState, setrecommendedState] = useState(null);

  // 탭 제목 설정하기
  useDocumentTitle(boardTitle);

  // 댓글 가져오기
  const getComment = () => {
    customAxios({
      method: "get",
      url: `/api/comments/article/${postId}`,
    })
      .then((res) => {
        console.log('comments', res.data.content)
        setComments(res.data.content);
        setCommentsInfo(res.data);
      })
      .catch((err) => console.log(err));
  };

  useDocumentTitle(boardTitle);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 게시글 상세정보 가져오기
    postDetailApi(postId)
    .then((res) => {
      console.log(res)
      setpostDetail(res);
      setBoardTitle(res.boardName);

      getComment();
    })
    .catch((err) => console.log(err));

    window.scrollTo({ top: 0, behavior: "smooth" });

    // 현재 board 게시글
    boardsArticles(boardId)
    .then((res) => setcurrboardPosts(res.content))
    .catch((err) => console.log(err));

    return () => {
      console.log("unmounted");
    };
  }, [postId]);

  useEffect(() => {
    setrecommendedState(postDetail.isLiked);
    document.getElementById("comment-nickname-input").value = null;
    document.getElementById("comment-input").value = null;
  }, [postDetail]);

  // 게시글 삭제
  const postDelete = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
    postDeleteApi(postId)
      .then(() => {
        navigate(`/boards/${boardId}`);
      })
      .catch((err) => console.log(err));
    }
  };

  // 게시글 추천
  const postRecommendedInput = () => {
    if (!recommendedState) {
      if (window.confirm("해당 게시글을 추천하시겠습니까?")) {
        const articleId = postId;

        postRecommendInputApi(articleId)
          .then(() => {
            if (!recommendedState) {
              postDetail.likes += 1;
            } else {
              postDetail.likes -= 1;
            }
            setrecommendedState((prev) => !prev);
            // console.log(recommendedState)
            // console.log('recommended success !!!!!!!')
            alert("추천 완료!");
          })
          .catch((res) => console.log(res));
      }
    } else {
      alert('이미 추천한 게시글입니다!')
    }
  };

  // 댓글 생성
  const commentCreate = async () => {
    if (!createcomment) {
      alert("댓글을 입력해주세요!");
    } else if (!commentnickName) {
      alert("닉네임을 입력해주세요!");
    } else {
      setIsButtonDisabled(true)
      console.log('isbuttonDisabled state', isButtonDisabled)
      const content = createcomment;
      const parentId = 0;
      const articleId = postId;
      const nickName = commentnickName;

      try {
        await postCommentCreateApi(articleId, content, parentId, nickName);
        await getComment();
  
        document.getElementById("comment-nickname-input").value = null;
        document.getElementById("comment-input").value = null;
        setcreateComment("")
        setcommentnickName("")
      } catch (err) {
        console.log(err);
      } finally {
        setIsButtonDisabled(false);
      }
    }
  };

  // 댓글 수정
  const commentUpdate = (id, articleId, content, parentId, nickName) => {
    postCommentUpdateApi(id, articleId, content, parentId, nickName)
      .then(() => {
        getComment();
      })
      .catch((err) => console.log(err));
  };

  // const createTime = postDetail.createTime;
  // const updateTime = postDetail.modifyTime;
  // const createTime_modify = createTime?.slice(0, 10);
  // const updateTime_modify = updateTime?.slice(0, 10);

  return (
    <>
      <div className={styles.postdetailallContainer}>
        <span className={styles.postviewContainer}>
          
          <div className={styles.postTopbar}>
            <span className={styles.boardTitle}
            onClick={() =>
              navigate(`/boards/${postDetail.boardId}`, {
                state: postDetail.boardId,
              })
            }>{postDetail.boardName}</span>
            <button
              className={styles.grayoutbutton}
              onClick={() =>
                navigate(`/boards/${postDetail.boardId}`, {
                  state: postDetail.boardId,
                })
              }
            >
              <IoIosArrowBack />
              목록으로 돌아가기
            </button>
          </div>

          <div className={styles.postContainer}>
            <div>
              <div className={styles.postTitle}>{postDetail.title}</div>
              <div className={styles.postusername}>
                <span>{postDetail.local} {postDetail.gen}기</span><span> {postDetail.nickName}</span>
              </div>
              <div className={styles.dateViews}>
                <div className={styles.posttimeago}>
                  <IoRocketOutline className={styles.tabIcon} size="20" />
                  {format(postDetail.createTime, 'ko')}
                </div>
                <div className={styles.posttimeago}>
                  <AiOutlineEye className={styles.tabIcon} size="19" />
                  {postDetail.views}
                </div>
              </div>
            </div>

            <hr />
            <div className={styles.postcontentContainer}>
              <div dangerouslySetInnerHTML={{ __html: postDetail.content }} />
            </div>

            <div className={styles.postBottombar}>
              <div
                onClick={postRecommendedInput}
                className={styles.tabthumbIcon}
              >
                {recommendedState ? (
                  <FaThumbsUp className={styles.tabupIcon} />
                ) : (
                  <FaRegThumbsUp className={styles.tabregupIcon} />
                )}
                {postDetail.likes}
              </div>

              {postDetail.isUser && (
                <div className={styles.postupdateBottom}>
                  <div
                    onClick={() =>
                      navigate(`/boards/${boardId}/${postId}/update`, {
                        state: postDetail,
                      })
                    }
                    className={styles.postupdateBottomtab}
                  >
                    <HiOutlinePencilAlt className={styles.tabupIcon} />
                    수정하기
                  </div>
                  <div
                    onClick={postDelete}
                    className={styles.postupdateBottomtab}
                  >
                    <IoTrashOutline className={styles.tabupIcon} />
                    삭제하기
                  </div>
                  {/* <div className={styles.postupdateBottomtab}><HiOutlineSpeakerphone />공지로 설정하기</div> */}
                </div>
              )}
            </div>

            <hr />
          </div>

          <div className={styles.commentInputContainer}>
            <div className={styles.commentTitle}>
              <p>
                댓글{" "}
                {commentsInfo.pageInfo === undefined
                  ? "0"
                  : commentsInfo.pageInfo.totalElements}
              </p>
              {/* <p>댓글 {commentsInfo.pageInfo?.totalElements}</p> */}
            </div>

            <div className={styles.commentnickName}>
              <div>닉네임</div>
              <input
                id="comment-nickname-input"
                className={styles.commentnickNameInput}
                type="text"
                placeholder="닉네임을 입력하세요"
                onChange={(e) => setcommentnickName(e.target.value)}
              />
            </div>
            <div className={styles.commentbox}>
              <textarea
                id="comment-input"
                className={styles.commentInput}
                type="text"
                onChange={(e) => {
                  setcreateComment(e.target.value);
                }}
                placeholder="댓글을 작성해보세요"
              />
              <button className={styles.commentButton} onClick={commentCreate} disabled={isButtonDisabled}>
                <IoChatboxOutline size="23" />
              </button>
            </div>
          </div>

          <div className={styles.postContainer}>
            <hr />
            {comments.map((comment, index) => {
              if (!comment.parentId) {
              return(<div key={index}>
                <CommentView
                  comment={comment}
                  commentUpdate={commentUpdate}
                  getComment={getComment}
                />
              </div>);
           } else {
            return (<div key={index}>
              <RecommentsView recomment={comment} parentId={comment.parentId} getComment={getComment} articleId={comment.articleId}/>
            </div>
            );
           }
           })}
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

          {/* <div className={styles.pageBottomtab}>
            <button
              className={styles.grayoutbutton}
              onClick={() => navigate(`/boards/${boardId}`)}
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
          </div> */}

          <br />

          <div className={styles.moreTopbar}>
            <button
              className={styles.buttonlayoutDel}
              onClick={() =>
                navigate(`/boards/${postDetail.boardId}`, {
                  state: postDetail.boardId,
                })
              }
            >
              <span className={styles.boardmoreTitleA}>
                {postDetail.boardName}
              </span>
              <span className={styles.boardmoreTitleB}>글 더 보기</span>
            </button>
            <button
              className={styles.grayoutbutton}
              onClick={() =>
                navigate(`/boards/${postDetail.boardId}`, {
                  state: postDetail.boardId,
                })
              }
            >
              목록 보기
              <IoIosArrowForward />
            </button>
          </div>
          <PostTypeTitleBar />
          <BoardView posts={currboardPosts} boardId={boardId} />
        </span>

        <span className={styles.sideviewContainer}>
          <div className={styles.sideContentContainer}>
            <div className={styles.sidecontentmiddleBox}>
              <BestpostsWidget />
              <ServerTime />
            </div>
          </div>
        </span>
      </div>
    </>
  );
}
