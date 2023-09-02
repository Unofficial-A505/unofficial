import styles from "./CommentView.module.css";
import { useState, useRef } from "react";

import { FaRegThumbsUp } from "@react-icons/all-files/fa/FaRegThumbsUp";
import { IoChatboxOutline } from "@react-icons/all-files/io5/IoChatboxOutline";
import { IoRocketOutline } from "@react-icons/all-files/io5/IoRocketOutline";
import { BsArrowReturnRight } from "@react-icons/all-files/bs/BsArrowReturnRight";
import Button from "@mui/material/Button";
// 삭제 아이콘
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";
// 수정 아이콘
import { HiOutlinePencilAlt } from "@react-icons/all-files/hi/HiOutlinePencilAlt";

import RecommentsView from "../RecommentsView/RecommentsView";
import { postCommentCreateApi, postCommentDeleteApi } from "../../api/comments";

import { format, register } from "timeago.js"; //임포트하기 register 한국어 선택
import koLocale from "timeago.js/lib/lang/ko"; //한국어 선택

register("ko", koLocale);

export default function CommentView({ comment, commentUpdate, getComment, currcommentPage }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [updateState, setupdateState] = useState(false);
  const [recommentBox, setrecommentBox] = useState(false);
  const [recomments, setreComments] = useState("");
  const [recommentNickname, setrecommentNickname] = useState("");
  const updateContent = useRef("");
  const { id, isUser, hasChildren, articleId } = comment;

  // 댓글 삭제
  const CommentDelete = (id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      if (hasChildren) {
        alert("대댓글이 존재해 댓글을 삭제할 수 없습니다!");
      } else {
        postCommentDeleteApi(id)
          .then(() => getComment(currcommentPage))
          .catch((err) => console.log(err));
      }
    }
  };

  // 대댓글 생성
  const recommentCreate = () => {
    if (!recomments) {
      alert("댓글을 입력해주세요!");
    } else if (!recommentNickname) {
      alert("닉네임을 입력해주세요!");
    } else {
      setIsButtonDisabled(true);
      postCommentCreateApi(articleId, recomments, id, recommentNickname)
        .then(() => {
          getComment(currcommentPage);
          document.getElementById("recomment-nickname-input").value = null;
          document.getElementById("recomment-input").value = null;

          setreComments("");
          setrecommentNickname("");
          setrecommentBox((prev) => !prev);
          setIsButtonDisabled(false);
        })
        .catch((err) => console.log(err));
    }
  };

  if (!updateState) {
    return (
      <>
        <div className={styles.commentContainer}>
          <div className={styles.commentTopbar}>
            <div className={styles.commentTitle}>
              <span className={styles.commentGenLocalInfo}>
                {comment.gen}기 {comment.local}
              </span>
              <span className={styles.commentNickName}>{comment.nickName}</span>
              <span className={styles.commentcreateTimeago}>
                <IoRocketOutline className={styles.commentIcons} />
                {format(comment.createTime, "ko")}
              </span>
            </div>
          </div>

          <div className={styles.commentContent}>
            <pre className={styles.contentPretag}>{comment.content}</pre>
          </div>

          <div className={styles.commentBottombar}>
            <button
              className={styles.recommentButton}
              onClick={() => setrecommentBox((prev) => !prev)}
            >
              <IoChatboxOutline />
              &nbsp; 답글
            </button>
            {isUser && (
              <div>
                <span
                  className={styles.updatetextPosition}
                  onClick={() => {
                    setupdateState((prev) => !prev);
                    // setcreateComment(createComment.content);
                  }}
                >
                  <HiOutlinePencilAlt className={styles.commentIcons} />
                  수정하기
                </span>
                <span
                  onClick={() => {
                    CommentDelete(id);
                  }}
                  className={styles.updatetextPosition}
                >
                  <IoTrashOutline className={styles.commentIcons} />
                  삭제하기
                </span>
              </div>
            )}
          </div>

          {recommentBox && (
            <div className={styles.recommentBoxContainer}>
              <div className={styles.recommentEnter}>
                <BsArrowReturnRight />
              </div>
              <div style={{ width: "100%" }}>
                <div className={styles.recommentNicknameBox}>
                  <label htmlFor="comment-nickname-input" className="me-2">
                    닉네임
                  </label>
                  <input
                    id="recomment-nickname-input"
                    className={styles.recommentNicknameInput}
                    type="text"
                    placeholder="닉네임을 입력하세요"
                    onChange={(e) => setrecommentNickname(e.target.value)}
                    maxlength="19"
                  />
                </div>
                <div className={styles.reCommentContainer}>
                  <div className={styles.commentbox}>
                    <textarea
                      className={styles.commentInput}
                      type="text"
                      id="recomment-input"
                      onChange={(e) => setreComments(e.target.value)}
                      placeholder="댓글을 작성해보세요"
                      maxLength="299"
                    />
                    <button
                      onClick={recommentCreate}
                      className={styles.commentButton}
                      disabled={isButtonDisabled}
                    >
                      등록
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* {comment.children.map((recomment, index) => 
          <RecommentsView key={index} recomment={recomment} parentId={comment.id} getComment={getComment} articleId={articleId}/>
        )} */}
        </div>
        <hr />
      </>
    );
  } else {
    return (
      <div className={styles.commentContainer}>
        <div className={styles.commentTopbar}>
          <div className={styles.commentTitle}>
            <span className={styles.recommentGenLocalInfo}>
              {comment.gen}기 {comment.local}
            </span>
            {comment.nickName ? (
              <span className={styles.recommentnickName}>
                {comment.nickName}
              </span>
            ) : (
              <span className={styles.recommentnickName}>익명</span>
            )}
            {/* <span className={styles.commentcreateTimeago}><IoRocketOutline className={styles.commentIcons} />{comment.createTime?.slice(0, 10)}</span> */}
          </div>
        </div>

        <div className={styles.updateinputContainer}>
          <textarea
            className={styles.updateInput}
            type="text"
            defaultValue={comment.content}
            ref={updateContent}
            maxlength="299"
          />
          {/* <div className={styles.commentContent}>{comment.content}</div> */}
        </div>

        <div className={styles.commentupdateBottombar}>
          <button
            className={styles.updateButtons}
            onClick={() => {
              const content = updateContent.current.value;
              const nickName = comment.nickName;
              commentUpdate(id, articleId, content, 0, nickName);
              setupdateState((prev) => !prev);
            }}
          >
            <HiOutlinePencilAlt className={styles.updateIcons} />
            수정 완료
          </button>
          <button
            className={styles.updateButtons}
            onClick={() => setupdateState((prev) => !prev)}
          >
            취소
          </button>
        </div>

        {/* {comment.children.map((recomment, index) => 
          <RecommentsView key={index} recomment={recomment}/>
        )} */}
      </div>
    );
  }
}
