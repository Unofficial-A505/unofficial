/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./PostDetail.module.css";

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import BoardView from "../../components/BoardView/BoardView";
import CommentView from "../../components/CommentView/CommentView";
import RecommentsView from "../../components/RecommentsView/RecommentsView";
import BestpostsWidget from "../../components/BestpostsWidget/BestpostsWidget";
import ServerTime from "../../components/ServerTime/ServerTime";
import PostTypeTitleBar from "../../components/PostTypeTitleBar/PostTypeTitleBar";
import PaginationCustom from "../../components/Pagination/Pagination";

import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
// 작성 timeago 아이콘
import { IoRocketOutline } from "@react-icons/all-files/io5/IoRocketOutline";
// 추천 아이콘
import FavoriteIcon from "@mui/icons-material/Favorite";
// import { FaRegThumbsUp } from "@react-icons/all-files/fa/FaRegThumbsUp";
// import { FaThumbsUp } from "@react-icons/all-files/fa/FaThumbsUp";
// 삭제 아이콘
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";
// 수정 아이콘
import { HiOutlinePencilAlt } from "@react-icons/all-files/hi/HiOutlinePencilAlt";
// import { HiOutlineSpeakerphone } from "@react-icons/all-files/hi/HiOutlineSpeakerphone";
// 말풍선 아이콘
// import { IoChatboxOutline } from "@react-icons/all-files/io5/IoChatboxOutline";
// 조회수 아이콘
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";

import { boardsArticles } from "../../api/boards";
import {
  postDetailApi,
  postDeleteApi,
  postRecommendInputApi,
} from "../../api/posts";
import {
  // postCommentsApi,
  postCommentCreateApi,
  postCommentUpdateApi,
  // postCommentDeleteApi,
} from "../../api/comments";

import customAxios from "../../util/customAxios";
import useDocumentTitle from "../../useDocumentTitle";

import { format, register } from "timeago.js"; //임포트하기 register 한국어 선택
import koLocale from "timeago.js/lib/lang/ko"; //한국어 선택

register("ko", koLocale);

// API import
export default function PostDetail() {
  const { state: currPage } = useLocation();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

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

  const [currcommentPage, setcurrcommentPage] = useState(1);
  const [commentPageInfo, setcommentPageInfo] = useState([]);

  const [currpostPage, setcurrpostPage] = useState(1);
  const [pageInfo, setPageInfo] = useState([]);

  // 탭 제목 설정하기
  useDocumentTitle(boardTitle);

  // 댓글 가져오기
  const getComment = (curr) => {
    customAxios({
      method: "get",
      url: `/api/comments/article/${postId}?page=${curr - 1}&size=${20}`,
    })
      .then((res) => {
        setComments(res.data.content);
        setCommentsInfo(res.data);

        setcommentPageInfo(res.data.pageInfo);
        setcurrcommentPage(res.data.pageInfo.page + 1);
      })
      .catch((err) => console.log(err));
  };

  useDocumentTitle(boardTitle);

  useEffect(() => {
    setcurrpostPage(currPage);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 게시글 상세정보 가져오기
    postDetailApi(postId)
      .then((res) => {
        setpostDetail(res);
        setBoardTitle(res.boardName);
        getComment(1);
      })
      .catch((err) => console.log(err));

    //현재 board 게시글
    boardsArticles(boardId, currPage - 1, 20)
      .then((res) => {
        setcurrboardPosts(res.content);
        setPageInfo(res.pageInfo);
        // setcurrpostPage(res.pageInfo.page);
      })
      .catch((err) => console.log(err));

    document.getElementById("comment-nickname-input").value = null;
    document.getElementById("comment-input").value = null;
  }, [postId]);

  useEffect(() => {
    setrecommendedState(postDetail.isLiked);
  }, [postDetail]);

  useEffect(() => {
    boardsArticles(boardId, currpostPage - 1, 20)
      .then((res) => {
        setcurrboardPosts(res.content);
        setPageInfo(res.pageInfo);
        // setcurrpostPage(res.pageInfo.page + 1);
      })
      .catch((err) => console.log(err));
  }, [!postId, currpostPage]);

  useEffect(() => {
    getComment(currcommentPage);
  }, [!postId, currcommentPage]);

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
    if (recommendedState) {
      alert("이미 추천한 게시글입니다!");
      return;
    }
    setTimeout(() => setrecommendedState(true), 300);

    postRecommendInputApi(postId)
      .then(() => {
        postDetailApi(postId).then((res) => {
          setpostDetail(res);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 댓글 생성
  const commentCreate = async () => {
    if (!createcomment) {
      alert("댓글을 입력해주세요!");
    } else if (!commentnickName) {
      alert("닉네임을 입력해주세요!");
    } else {
      setIsButtonDisabled(true);
      const content = createcomment;
      const parentId = 0;
      const articleId = postId;
      const nickName = commentnickName;

      try {
        await postCommentCreateApi(articleId, content, parentId, nickName);
        await getComment(currcommentPage);

        document.getElementById("comment-nickname-input").value = null;
        document.getElementById("comment-input").value = null;
        setcreateComment("");
        setcommentnickName("");
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
        getComment(currcommentPage);
      })
      .catch((err) => console.log(err));
  };

  // 게시글 더보기 pagination
  const postsmorePaginate = (pageNum) => {
    setcurrpostPage(pageNum);

    const targetElement = document.getElementById("board-posts-more"); // 스크롤할 요소 선택
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY; // 요소의 상단 위치
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  // 댓글 pagination
  const comentPaginate = (pageNum) => {
    setcurrcommentPage(pageNum);

    const targetElement = document.getElementById("comment-input-box"); // 스크롤할 요소 선택
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY; // 요소의 상단 위치
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  // const createTime = postDetail.createTime;
  // const updateTime = postDetail.modifyTime;
  // const createTime_modify = createTime?.slice(0, 10);
  // const updateTime_modify = updateTime?.slice(0, 10);

  if (authUser.accessToken) {
    return (
      <>
        <div className={styles.postdetailallContainer}>
          <span className={styles.postviewContainer}>
            <div className={styles.postTopbar}>
              <span
                className={styles.boardTitle}
                onClick={() =>
                  navigate(`/boards/${postDetail.boardId}`, {
                    state: postDetail.boardName,
                  })
                }
              >
                {postDetail.boardName}
              </span>
              <button
                className={styles.grayoutbutton}
                onClick={() => 
                  navigate(`/boards/${postDetail.boardId}`, {
                    state: postDetail.boardName,
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
                  <span>
                    {postDetail.local} {postDetail.gen}기
                  </span>
                  <span> {postDetail.nickName}</span>
                </div>
                <div className={styles.dateViews}>
                  <div className={styles.posttimeago}>
                    <IoRocketOutline className={styles.tabIcon} size="20" />
                    {format(postDetail.createTime, "ko")}
                  </div>
                  <div className={styles.posttimeago}>
                    <AiOutlineEye className={styles.tabIcon} size="19" />
                    {postDetail.views}
                  </div>
                </div>
              </div>

              <hr />
              <div className={styles.postContentContainer}>
                <div dangerouslySetInnerHTML={{ __html: postDetail.content }} />
              </div>

              <div id="comment-input-box" className={styles.postBottombar}>
                <div
                  onClick={postRecommendedInput}
                  className={styles.tabthumbIcon}
                >
                  {recommendedState ? (
                    <FavoriteIcon
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        marginBottom: "0.3rem",
                        color: "#e8308c",
                      }}
                    />
                  ) : (
                    <lord-icon
                      src="https://cdn.lordicon.com/pnhskdva.json"
                      trigger="click"
                      colors="primary:#e8308c"
                      state="morph"
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        marginBottom: "0.3rem",
                      }}
                    ></lord-icon>
                  )}
                  <p>좋아요</p>
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
                <label htmlFor="comment-nickname-input">닉네임</label>
                <input
                  id="comment-nickname-input"
                  className={styles.commentnickNameInput}
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  onChange={(e) => setcommentnickName(e.target.value)}
                  maxLength="19"
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
                  maxLength="299"
                />
                <button
                  className={styles.commentButton}
                  onClick={commentCreate}
                  disabled={isButtonDisabled}
                >
                  등록
                </button>
              </div>
            </div>

            <div className={styles.postContainer}>
              <hr />
              {comments.map((comment, index) => {
                if (!comment.parentId) {
                  return (
                    <div key={index}>
                      <CommentView
                        comment={comment}
                        commentUpdate={commentUpdate}
                        getComment={getComment}
                        currcommentPage={currcommentPage}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      <RecommentsView
                        recomment={comment}
                        parentId={comment.parentId}
                        getComment={getComment}
                        articleId={comment.articleId}
                        currcommentPage={currcommentPage}
                      />
                    </div>
                  );
                }
              })}
            </div>
            {comments.length ? (
              <div id="board-posts-more" className={styles.commentPagination}>
                <PaginationCustom
                  totalPages={commentPageInfo.totalPages}
                  paginate={comentPaginate}
                  currPage={currcommentPage}
                />
              </div>
            ) : (
              ""
            )}

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
                    state: postDetail.boardName,
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
                    state: postDetail.boardName,
                  })
                }
              >
                목록 보기
                <IoIosArrowForward />
              </button>
            </div>
            <PostTypeTitleBar />
            <BoardView
              posts={currboardPosts}
              boardId={boardId}
              currPage={currpostPage}
              IsAuth={authUser.accessToken}
            />
            <div className={styles.postmorePagination}>
              <PaginationCustom
                totalPages={pageInfo.totalPages}
                paginate={postsmorePaginate}
                currPage={currpostPage}
              />
            </div>
          </span>

          <span className={styles.sideviewContainer}>
            <div className={styles.sideContentContainer}>
              <div className={styles.sidecontentmiddleBox}>
                <BestpostsWidget IsAuth={authUser.accessToken} />
                <ServerTime />
              </div>
            </div>
          </span>
        </div>
      </>
    );
  } else {
    alert("로그인 후 이용해주세요! 메인 화면으로 이동합니다.");
    window.document.location.href = "/";
  }
}
