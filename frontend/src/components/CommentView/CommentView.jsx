import styles from './CommentView.module.css'
import axios from 'axios';
import { useState, useRef } from 'react';

import { FaRegThumbsUp } from '@react-icons/all-files/fa/FaRegThumbsUp';
import { IoChatboxOutline } from '@react-icons/all-files/io5/IoChatboxOutline';
import { IoRocketOutline } from '@react-icons/all-files/io5/IoRocketOutline';
import { BsArrowReturnRight } from '@react-icons/all-files/bs/BsArrowReturnRight';

import customAxios from "../../util/customAxios";

// 삭제 아이콘
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
// 수정 아이콘
import { HiOutlinePencilAlt } from '@react-icons/all-files/hi/HiOutlinePencilAlt';

import RecommentsView from '../RecommentsView/RecommentsView';

export default function CommentView({ comment, CommentDelete, commentUpdate, articleId}){
  const [ updateState, setupdateState ] = useState(false)
  const [ recommentBox, setrecommentBox ] = useState(false)
  const [ comments, setComments ] = useState('')
  const [ createComment, setcreateComment ] = useState('')
  const updateContent = useRef('')
  const { content, id } = comment

  const recommentCreate = () => {
    const content = comments
    const parentId = id;
    const articleId = articleId
    console.log(content)
    customAxios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/comments`,
      data: { articleId, content, parentId },
      })
      .then((res) => {
        console.log("댓글 불러오기!!!")
        console.log(res);
        // commentElement.current.value = ''
        setcreateComment("")
      })
        .catch((err) => console.log(err));
    };

  if (!updateState) {
    return(
      <div className={styles.commentContainer}>
        <div className={styles.commentTopbar}>
          <div className={styles.commentTitle}>
            <span className={styles.recommentGenLocalInfo}>{comment.gen}기 {comment.local}</span>
            {comment.nickName ? <span className={styles.recommentnickName}>{comment.nickName}</span> : <span className={styles.recommentnickName}>익명</span>}
            <span className={styles.commentcreateTimeago}><IoRocketOutline className={styles.commentIcons} />{comment.createTime?.slice(0, 10)}</span>
          </div>
        </div>
  
        <div className={styles.commentContent}>{comment.content}</div>
  
        <div className={styles.commentBottombar}>
          <div className={styles.recommentButton} onClick={() => setrecommentBox((prev) => !prev)}><IoChatboxOutline className={styles.commentIcons}/><span>대댓글</span></div>
          <div>
            <span className={styles.commentIcons} onClick={() => {
              setupdateState((prev) => !prev);
              // setcreateComment(createComment.content);
              }}>
            <span className={styles.updatetextPosition} ><HiOutlinePencilAlt />수정하기</span></span>
            <span className={styles.commentIcons} onClick={() => {CommentDelete(id)}}><span className={styles.updatetextPosition}><IoTrashOutline />삭제하기</span></span>
          </div>
        </div>

        {recommentBox &&
        <div className={styles.reCommentContainer}>
          <div className={styles.recommentEnter}><BsArrowReturnRight /></div>
          <div className={styles.commentbox}>
            <textarea
              className={styles.commentInput}
              type="text"
              onChange={(e) => setComments(e.target.value)}
              placeholder="댓글을 작성해보세요"
            />
            <button onClick={recommentCreate} className={styles.commentButton}>
              <IoChatboxOutline size="23" />
            </button>
          </div>
        </div>}
        
        {comment.children.map((recomment, index) => 
          <RecommentsView key={index} recomment={recomment}/>
        )}

        <hr />
  
      </div>
    );
  } else {
    return(
      <div className={styles.commentContainer}>
        <div className={styles.commentTopbar}>
          <div>
            <span className={styles.commentTitle}>9기 구미</span>
            <span className={styles.commentcreateTimeago}><IoRocketOutline className={styles.commentIcons} />15분 전</span>
          </div>
        </div>
        
        <div className={styles.updateinputContainer}>
          <textarea  className={styles.updateInput} type="text" defaultValue={comment.content} ref={updateContent}/>
          {/* <div className={styles.commentContent}>{comment.content}</div> */}
        </div>
  
        <div className={styles.commentupdateBottombar}>
          <button className={styles.updateButtons} onClick={() => {
            const content = updateContent.current.value;
            const nickName = comment.nickName
            console.log('update content', id, articleId, content, 0, nickName);
            commentUpdate(id, articleId, content, 0, nickName);
            setupdateState((prev) => !prev);
            }}><HiOutlinePencilAlt className={styles.updateIcons} />수정 완료</button>
          <button className={styles.updateButtons} onClick={() => setupdateState((prev) => !prev)}>취소</button>
        </div>
        
        {comment.children.map((recomment, index) => 
          <RecommentsView key={index} recomment={recomment}/>
        )}

        <hr />
  
      </div>
  )}
}

// default
// return(
//   <div className={styles.commentContainer}>
//     <div className={styles.commentTopbar}>
//       <div>
//         <span className={styles.commentTitle}>9기 구미</span>
//         <span className={styles.commentcreateTimeago}><IoRocketOutline className={styles.commentIcons} />15분 전</span>
//       </div>
//       <div>
//       </div>
//     </div>

//     <div className={styles.commentContent}>{comment.content}</div>

//     <div className={styles.commentBottombar}>
//       <div><IoChatboxOutline className={styles.commentIcons}/><span>대댓글</span></div>
//       {/* <div><FaRegThumbsUp className={styles.commentIcons}/><span>{commentRecommended}</span></div> */}
//       <div>
//         <span className={styles.commentIcons} ><HiOutlinePencilAlt size='20'/></span>
//         <span className={styles.commentIcons} onClick={CommentDelete}><IoTrashOutline size='20'/></span>
//       </div>
//     </div>
//     <hr />

//   </div>
// )}