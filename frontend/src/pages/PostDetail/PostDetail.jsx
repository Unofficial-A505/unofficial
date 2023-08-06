import styles from "./PostDetail.module.css";

import { useState, useEffect, useDebugValue, useRef } from "react";
import { useParams, useNavigate, redirect, Navigate } from "react-router-dom";

import BoardView from "../../components/BoardView/BoardView";
import CommentView from "../../components/CommentView/CommentView";
import BestpostsWidget from "../../components/BestpostsWidget/BestpostsWidget";
import EduGrantButton from "../../components/EduGrantButton/EduGrantsButton";

import TopSpace from "../../components/TopSpace/TopSpace";
import customAxios from "../../util/customAxios";

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
// 조회수 아이콘
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";

// API import
export default function PostDetail() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { postId } = useParams();
  const [ postDetail, setpostDetail ] = useState({})
  const [ createcomment, setcreateComment] = useState("");
  const [ comments, setComments ] = useState([])
  const [ commentnickName, setcommentnickName] = useState("")
  const [ recommendedState, setrecommendedState ] = useState(false)
  console.log('지금 코멘트', comments)
  const commentElement = useRef(null);
  
  const createTime = postDetail.createTime
  const updateTime = postDetail.modifyTime
  const createTime_modify = createTime?.slice(0, 10)
  const updateTime_modify = updateTime?.slice(0, 10)

  console.log(createTime_modify, updateTime_modify)

  const getComment = () => {
    customAxios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER}/api/comments/article/${postId}`,
    })
      .then((res) => {
        console.log("comments", res.data);
        setComments(res.data.content);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    customAxios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER}/api/articles/${postId}`,
    })
      .then((res) => {
        setpostDetail(res.data)
        console.log(postDetail)
      })
      .catch((err) => console.log(err));

      window.scrollTo({ top: 0, behavior: "smooth" });

      getComment(); 
      return () => {  
        console.log('unmounted')}
      }, [postId]);

const commentCreate = () => {

  if (!commentnickName) {
    alert('댓글 닉네임을 입력해주세요!')
  } else if (!createcomment) {
    alert('댓글을 입력해주세요!')
  } else {
  const content = createcomment
  const parentId = 0;
  const articleId = postId;
  const nickName = commentnickName

  console.log(content)
  customAxios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER}/api/comments`,
    data: { articleId, content, parentId, nickName },
    })
    .then((res) => {
      console.log(res);
      // commentElement.current.value = ''
      setcreateComment("")
      getComment();
    })
      .catch((err) => console.log(err));
    } 
  };

  const commentUpdate = (updateComment, id) => {
    const content = updateComment
    const parentId = 0;
    const articleId = postId;
    console.log(content)
    customAxios({
      method: "put",
      url: `${process.env.REACT_APP_SERVER}/api/comments/${id}`,
      data: { id, articleId, content, parentId },
      })
      .then((res) => {
        console.log(res);
        getComment();
      })
      .catch((err) => console.log(err))
    }

  const CommentDelete = (id) => {
    customAxios({
      method: "delete",
      url: `${process.env.REACT_APP_SERVER}/api/comments/${id}`,
      })
      .then((res) => {
        console.log(res);
        getComment();
      })
      .catch((err) => console.log(err));
  };

  const postDelete = () => {
    console.log('post delete request')
    customAxios({
      method: "delete",
      url: `${process.env.REACT_APP_SERVER}/api/articles/${postId}`,
      })
      .then((res) => {
        console.log(res);
        navigate(`/boards/${boardId}`)
      })
      .catch((err) => console.log(err));
    };

  const postRecommendedInput = () => {
    const articleId = postId;
    console.log('postRecommendedInput')
    customAxios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/likes`,
      data: { articleId },
    })
    .then((res) => {
      console.log(res)
      setrecommendedState((prev) => !prev)
    })
    .catch((res) => console.log(res))
  }

  // const postRecommendedDelete = () => {
  //   console.log('postRecommendedDelete')
  //   customAxios({
  //     method: "delete",
  //     url: `/api/likes`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
  //   })
  //   .then((res) => {
  //     console.log(res)
  //     setrecommendedState((prev) => !prev)
  //   })
  //   .catch((res) => console.log(res))
  // }

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
            <span className={styles.boardTitle}>{postDetail.boardName}</span>
            <button
              className={styles.grayoutbutton}
              onClick={() => navigate(`/boards/${boardId}`)}
            >
              <IoIosArrowBack />
              목록으로 돌아가기
            </button>
          </div>
          <div className={styles.postContainer}>
            <div>
              <div className={styles.postTitle}>{postDetail.title}</div>
              <div className={styles.postusername}>{username}</div>
              <div className={styles.dateViews}>
                <div className={styles.posttimeago}>
                  <IoRocketOutline className={styles.tabIcon} size="20" />
                  {createTime_modify} 
                  {createTime_modify !== updateTime_modify && ` (수정 : ${updateTime_modify})`}
                </div>
                <div className={styles.posttimeago}>
                  <AiOutlineEye className={styles.tabIcon} size="19" />
                  {postDetail.views}10
                </div>
              </div>
            </div>

            <hr />
            <div className={styles.postcontentContainer}>
              <div dangerouslySetInnerHTML={{ __html: postDetail.content }} />
            </div>

            <div className={styles.postBottombar}>
              <div onClick={postRecommendedInput}>
                <FaRegThumbsUp class={styles.tabIcon} size="18" />
                {recommended}
              </div>
              <div className={styles.postupdateBottom}>
                <div onClick={() => navigate(`/boards/${boardId}/${postId}/update`, { state : postDetail })} className={styles.postupdateBottomtab}>
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

            <div className={styles.commentnickName}>
              <div>닉네임</div>
              <input className={styles.commentnickNameInput} type="text" placeholder="닉네임을 입력하세요" onChange={(e) => setcommentnickName(e.target.value)}/>
            </div>
            <div className={styles.commentbox}>
              <textarea
                className={styles.commentInput}
                type="text"
                onChange={(e) => {
                  setcreateComment(e.target.value);
                  console.log(createcomment)
                 }}
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
                <CommentView comment={comment} CommentDelete={CommentDelete} commentUpdate={commentUpdate} postId={postId}/>
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
          </div>

          <hr />

          <div className={styles.moreTopbar}>
            <button
              className={styles.buttonlayoutDel}
              onClick={() => navigate(`/boards/${boardId}`)}
            >
              <span className={styles.boardmoreTitleA}>{postDetail.boardName}</span>
              <span className={styles.boardmoreTitleB}>글 더 보기</span>
            </button>
            <button
              className={styles.grayoutbutton}
              onClick={() => navigate(`/boards/${boardId}`)}
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
