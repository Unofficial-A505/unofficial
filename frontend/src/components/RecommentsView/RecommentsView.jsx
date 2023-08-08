import styles from './RecommentsView.module.css'
import { useState, useRef } from 'react';

import { IoRocketOutline } from '@react-icons/all-files/io5/IoRocketOutline';
// 삭제 아이콘
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
// 수정 아이콘
import { HiOutlinePencilAlt } from '@react-icons/all-files/hi/HiOutlinePencilAlt';
import { BsArrowReturnRight } from '@react-icons/all-files/bs/BsArrowReturnRight';

import { postCommentDeleteApi, postCommentUpdateApi } from '../../api/comments'

export default function RecommentsView({ recomment, getComment, articleId, parentId }){
  const [ updateState, setupdateState ] = useState(false)
  const [ updatereComment, setupdatereComment ] = useState("")

  // 대댓글 삭제
  const recommentDelete = (id) => {
    console.log('id', id)
    postCommentDeleteApi(id)
    .then((res) => {
      console.log(res)
      console.log('대댓글 삭제 성공!');
      getComment();
    })
    .catch((err) => console.log(err))
  }

  const recommentUpdate = (id) => {
    const content = updatereComment
    const nickName = recomment.nickName
    postCommentUpdateApi(id, articleId, content, parentId, nickName)
    .then((res) => {
      getComment();
      setupdateState((prev) => !prev)
    }).catch((err) => console.log(err))
  }
  
  if (!updateState) {

    return(
    <>
      <hr />
      <div className={styles.recommentContainer}>
        <div className={styles.recommentEnter}><BsArrowReturnRight /></div>
        <div className={styles.recommentContentContainer}>
          <div className={styles.commentContainer}>
            <div className={styles.commentTopbar}>
              <div className={styles.commentTitle}>
                <span className={styles.recommentGenLocalInfo}>{recomment.gen}기 {recomment.local}</span>
                {recomment.nickName ? <span className={styles.recommentnickName}>{recomment.nickName}</span> : <span className={styles.recommentnickName}>익명</span>}
              </div>
              <div className={styles.commentcreateTimeago}><IoRocketOutline className={styles.commentIcons} /><div>{recomment.createTime?.slice(0, 10)}</div></div>
            </div>
          </div>
  
          <div className={styles.commentContent}>{recomment.content}</div>
  
          <div className={styles.recommentUnderContainer}>
            <span className={styles.commentIcons}> 
              <span className={styles.updatetextPosition} onClick={() => setupdateState((prev) => !prev)}><HiOutlinePencilAlt />수정하기</span></span>
            <span className={styles.commentIcons} onClick={() => recommentDelete(recomment.id)}><span className={styles.updatetextPosition}><IoTrashOutline />삭제하기</span></span>
          </div>
        </div>
      
      </div>
    </>
    );
  } else {
    return (
      <>
        <hr />
        <div className={styles.recommentContainer}>
          <div className={styles.recommentEnter}><BsArrowReturnRight /></div>
          <div className={styles.recommentContentContainer}>
            <div className={styles.commentContainer}>
              <div className={styles.commentTopbar}>
                <div className={styles.commentTitle}>
                  <span className={styles.recommentGenLocalInfo}>{recomment.gen}기 {recomment.local}</span>
                  {recomment.nickName ? <span className={styles.recommentnickName}>{recomment.nickName}</span> : <span className={styles.recommentnickName}>익명</span>}
                </div>
                <div className={styles.commentcreateTimeago}><IoRocketOutline className={styles.commentIcons} /><div>{recomment.createTime?.slice(0, 10)}</div></div>
              </div>
            </div>
    
            <div className={styles.updateinputContainer}>
              <textarea  className={styles.updateInput} type="text" defaultValue={recomment.content} onChange={(e) => setupdatereComment(e.target.value)}/>
            </div>
    
            <div className={styles.recommentUnderContainer}>
              <span className={styles.commentIcons}> 
              <span className={styles.updatetextPosition} onClick={() => recommentUpdate(recomment.id)}><HiOutlinePencilAlt/>수정 완료</span></span>
              <span className={styles.commentIcons} onClick={() => setupdateState((prev) => !prev)}><span className={styles.updatetextPosition} >취소</span></span>
            </div>
          </div>
        
        </div>
      </>
    )
  }

}