import styles from "./PostDetail.module.css";

import { useState, useEffect, useDebugValue, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

import BoardView from "../../components/BoardView/BoardView";
import CommentView from "../../components/CommentView/CommentView";
import BestpostsWidget from "../../components/BestpostsWidget/BestpostsWidget";
import ServerTime from "../../components/ServerTime/ServerTime";

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
// 조회수 아이콘
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";

import { boardArticlesAll } from '../../api/boards'
import { postDetailApi, postDeleteApi, postRecommendInputApi } from '../../api/posts'
import { postCommentsApi, postCommentCreateApi, postCommentUpdateApi, postCommentDeleteApi } from '../../api/comments'

import customAxios from '../../util/customAxios'
import useDocumentTitle from "../../useDocumentTitle";

// API import
export default function PostDetail() {
  const navigate = useNavigate();
  // const { boardTitleFromUrl } = useParams();
  const { boardId } = useParams();
  const { postId } = useParams();
  const [ boardTitle, setBoardTitle ] = useState('')
  const [ postDetail, setpostDetail ] = useState({})
  const [ createcomment, setcreateComment] = useState("");
  const [ comments, setComments ] = useState([])
  const [ commentsInfo, setCommentsInfo ] = useState({})
  const [ commentnickName, setcommentnickName] = useState("")
  const [ articleList, setarticleList ] = useState([]);
  const [ recommendedState, setrecommendedState ] = useState(false)
  const commentElement = useRef(null);

  useDocumentTitle({boardTitle});

  // 댓글 가져오기
  const getComment = () => {
    customAxios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER}/api/comments/article/${postId}`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
    })
      .then((res) => {
        setComments(res.data.content);
        setCommentsInfo(res.data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    customAxios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER}/api/articles/${postId}`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
    })
      .then((res) => {
        console.log('detail', res.data);
        setpostDetail(res.data)
        // setTitle(res.data.title);
        // setContent(res.data.content);
        setBoardTitle(res.data.boardName)
      })
      .catch((err) => console.log(err));

      window.scrollTo({ top: 0, behavior: "smooth" });

    // 게시글 상세정보 가져오기
    postDetailApi(postId)
    .then((res) => setpostDetail(res))
    .catch((err) => console.log(err));

    window.scrollTo({ top: 0, behavior: "smooth" });
    getComment();

    return () => {  
      console.log('unmounted')}
    }, [postId]);
    
  // 게시글 삭제
  const postDelete = () => {
    postDeleteApi(postId)
    .then(() => {navigate(`/boards/${boardId}`)})
    .catch((err) => console.log(err));
    };
  
  // 게시글 추천
  const postRecommendedInput = () => {
    const articleId = postId;
    postRecommendInputApi(articleId)
    .then(() => setrecommendedState((prev) => !prev))
    .catch((res) => console.log(res))
  }
  
  // 댓글 생성
  const commentCreate = () => {
    let text = document.querySelector(".textarea").value;
    text = text.replaceAll(/(\n|\r\n)/g, "<br>");

    if (!commentnickName) { alert('댓글 닉네임을 입력해주세요!')
    } else if (!createcomment) { alert('댓글을 입력해주세요!')
    } else {
      const content = createcomment
      const parentId = 0;
      const articleId = postId;
      const nickName = commentnickName

    postCommentCreateApi(articleId, content, parentId, nickName)
    .then(() => getComment())
    .catch((err) => console.log(err));} 
  };

  // 댓글 수정
  const commentUpdate = (updateComment, id) => {
    let text = document.querySelector(".textarea").value;
    text = text.replaceAll(/(\n|\r\n)/g, "<br>");

    const content = updateComment
    const parentId = 0;
    const articleId = postId;
    postCommentUpdateApi(id, articleId, content, parentId)
    .then(() => getComment())
    .catch((err) => console.log(err))
    }

  // 댓글 삭제
  const CommentDelete = (id) => {
    postCommentDeleteApi(id)
    .then(() => getComment())
    .catch((err) => console.log(err));
  };

  const username = "9기 서울";
  const timeago = "21분 전";

  const createTime = postDetail.createTime
  const updateTime = postDetail.modifyTime
  const createTime_modify = createTime?.slice(0, 10)
  const updateTime_modify = updateTime?.slice(0, 10)
  // console.log(createTime_modify, updateTime_modify)

  return (
    <>
      <TopSpace />
      <div className={styles.postdetailallContainer}>
        <span className={styles.postviewContainer}>
          <div className={styles.postTopbar}>
            <span className={styles.boardTitle}>{postDetail.boardName}</span>
            <button
              className={styles.grayoutbutton}
              onClick={() => navigate(`/boards/${boardTitle}`, { state : postDetail.boardId })}
            >
              <IoIosArrowBack />
              목록으로 돌아가기
            </button>
          </div>
          <div className={styles.postContainer}>
            <div>
              <div className={styles.postTitle}>{postDetail.title}</div>
              <div className={styles.postusername}>{postDetail.nickName === null || postDetail.nickName===""? "익명" : postDetail.nickName}</div>
              <div className={styles.dateViews}>
                <div className={styles.posttimeago}>
                  <IoRocketOutline className={styles.tabIcon} size="20" />
                  {createTime_modify} 
                  {createTime_modify !== updateTime_modify && ` (수정 : ${updateTime_modify})`}
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
              <div onClick={postRecommendedInput}>
                <FaRegThumbsUp class={styles.tabIcon} size="18" />
                {postDetail.likes}
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
              <p>댓글 {commentsInfo.pageInfo?.totalElements}</p>
            </div>

            <div className={styles.commentnickName}>
              <div>닉네임</div>
              <input className={styles.commentnickNameInput} type="text" placeholder="닉네임을 입력하세요" onChange={(e) => {setcommentnickName(e.target.value); console.log(commentnickName);}}/>
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
              onClick={() => navigate(`/boards/${boardTitle}`, { state : postDetail.boardId })}
            >
              <span className={styles.boardmoreTitleA}>{postDetail.boardName}</span>
              <span className={styles.boardmoreTitleB}>글 더 보기</span>
            </button>
            <button
              className={styles.grayoutbutton}
              onClick={() => navigate(`/boards/${boardTitle}`, { state : postDetail.boardId })}
            >
              목록 보기
              <IoIosArrowForward />
            </button>
          </div>
          <BoardView posts={articleList}/>
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
