import styles from "./RecommentsView.module.css";
import { useState, useRef } from "react";

import { IoRocketOutline } from "@react-icons/all-files/io5/IoRocketOutline";
// 삭제 아이콘
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";
// 수정 아이콘
import { HiOutlinePencilAlt } from "@react-icons/all-files/hi/HiOutlinePencilAlt";
import { BsArrowReturnRight } from "@react-icons/all-files/bs/BsArrowReturnRight";

import { postCommentDeleteApi, postCommentUpdateApi } from "../../api/comments";

import { format, register } from "timeago.js"; //임포트하기 register 한국어 선택
import koLocale from "timeago.js/lib/lang/ko"; //한국어 선택

register("ko", koLocale);

export default function RecommentsView({
  recomment,
  getComment,
  articleId,
  parentId,
  currcommentPage,
}) {
  const [updateState, setupdateState] = useState(false);
  const [updatereComment, setupdatereComment] = useState("");
  const { isUser } = recomment;

  // 대댓글 삭제
  const recommentDelete = (id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      postCommentDeleteApi(id)
        .then(() => {
          getComment(currcommentPage);
        })
        .catch((err) => console.log(err));
    }
  };

  const recommentUpdate = (id) => {
    const content = updatereComment;
    const nickName = recomment.nickName;
    postCommentUpdateApi(id, articleId, content, parentId, nickName)
      .then(() => {
        getComment(currcommentPage);

        setupdatereComment("");
        setupdateState((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  if (!updateState) {
    return (
      <>
        <div className={styles.recommentContainer}>
          <div className={styles.recommentEnter}>
            <BsArrowReturnRight />
          </div>
          <div className={styles.recommentContentContainer}>
            <div className={styles.commentContainer}>
              <div className={styles.commentTopbar}>
                <div className={styles.commentTitle}>
                  <span className={styles.recommentGenLocalInfo}>
                    {recomment.gen}기 {recomment.local}
                  </span>
                  <span className={styles.recommentnickName}>
                    {recomment.nickName}
                  </span>
                </div>
                <div className={styles.commentcreateTimeago}>
                  <IoRocketOutline className={styles.commentIcons} />
                  <div>{format(recomment.createTime, "ko")}</div>
                </div>
              </div>
            </div>

            <div className={styles.commentContent}>
              <pre className="mb-0">{recomment.content}</pre>
            </div>

            {isUser && (
              <div className={styles.recommentUnderContainer}>
                <span
                  className={styles.updatetextPosition}
                  onClick={() => setupdateState((prev) => !prev)}
                >
                  <HiOutlinePencilAlt className={styles.commentbottomIcons} />
                  수정하기
                </span>
                <span
                  className={styles.updatetextPosition}
                  onClick={() => recommentDelete(recomment.id)}
                >
                  <IoTrashOutline className={styles.commentbottomIcons} />
                  삭제하기
                </span>
              </div>
            )}
          </div>
        </div>
        <hr />
      </>
    );
  } else {
    return (
      <>
        <div className={styles.recommentContainer}>
          <div className={styles.recommentEnter}>
            <BsArrowReturnRight />
          </div>
          <div className={styles.recommentContentContainer}>
            <div className={styles.commentContainer}>
              <div className={styles.commentTopbar}>
                <div className={styles.commentTitle}>
                  <span className={styles.recommentGenLocalInfo}>
                    {recomment.gen}기 {recomment.local}
                  </span>
                  {recomment.nickName ? (
                    <span className={styles.recommentnickName}>
                      {recomment.nickName}
                    </span>
                  ) : (
                    <span className={styles.recommentnickName}>익명</span>
                  )}
                </div>
                {/* <div className={styles.commentcreateTimeago}><IoRocketOutline className={styles.commentIcons} /><div>{recomment.createTime?.slice(0, 10)}</div></div> */}
              </div>
            </div>

            <div className={styles.updateinputContainer}>
              <textarea
                className={styles.updateInput}
                type="text"
                defaultValue={recomment.content}
                onChange={(e) => setupdatereComment(e.target.value)}
                maxlength="299"
              />
            </div>

            <div className={styles.recommentUnderContainer}>
              <span className={styles.commentIcons}>
                <span
                  className={styles.updatetextPosition}
                  onClick={() => recommentUpdate(recomment.id)}
                >
                  <HiOutlinePencilAlt />
                  수정 완료
                </span>
              </span>
              <span
                className={styles.commentIcons}
                onClick={() => setupdateState((prev) => !prev)}
              >
                <span className={styles.updatetextPosition}>취소</span>
              </span>
            </div>
          </div>
        </div>
        <hr />
      </>
    );
  }
}
