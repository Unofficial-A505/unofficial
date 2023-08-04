import styles from './recommentView.module.css'
import { useState, useRef } from 'react';

import { IoRocketOutline } from '@react-icons/all-files/io5/IoRocketOutline';
// 삭제 아이콘
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
// 수정 아이콘
import { HiOutlinePencilAlt } from '@react-icons/all-files/hi/HiOutlinePencilAlt';

import customAxios from "../../util/customAxios";

export default function recommentView(){
  return(
    <div className={styles.commentContainer}>
        {/* <div className={styles.commentTopbar}>
          <div>
            <span className={styles.commentTitle}>9기 구미</span>
            <span className={styles.commentcreateTimeago}><IoRocketOutline className={styles.commentIcons} />15분 전</span>
          </div>
        </div>
  
        <div className={styles.commentContent}>{comment.content}</div>
  
        <div className={styles.commentBottombar}>
          <div className={styles.recommentButton} onClick={() => setrecommentBox((prev) => !prev)}><IoChatboxOutline className={styles.commentIcons}/><span>대댓글</span></div>
          <div>
            <span className={styles.commentIcons} onClick={() => {
              }}>
              <span className={styles.updatetextPosition} ><HiOutlinePencilAlt />수정하기</span></span>
            <span className={styles.commentIcons} onClick={() => {CommentDelete(id)}}><span className={styles.updatetextPosition}><IoTrashOutline />삭제하기</span></span>
          </div>
        </div> */}
    </div>
  );
}