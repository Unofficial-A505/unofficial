import styles from './CommentView.module.css'
import axios from 'axios';
import { useState, useRef } from 'react';

import { FaRegThumbsUp } from '@react-icons/all-files/fa/FaRegThumbsUp';
import { IoChatboxOutline } from '@react-icons/all-files/io5/IoChatboxOutline';
import { IoRocketOutline } from '@react-icons/all-files/io5/IoRocketOutline';

// 삭제 아이콘
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
// 수정 아이콘
import { HiOutlinePencilAlt } from '@react-icons/all-files/hi/HiOutlinePencilAlt';

export default function CommentView({ comment, CommentDelete, commentUpdate}){
  const commentRecommended = 0
  const comentContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis velit id justo vulputate eleifend. Integer maximus sapien enim, vel faucibus risus auctor vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus hendrerit tincidunt diam sed accumsan. Aenean rhoncus erat et nisi lobortis, nec tincidunt elit finibus. Cras ipsum nulla, egestas non nisl vel, pharetra mollis tellus. Nullam dignissim metus lectus, at faucibus ex lacinia a. Proin tristique augue ut turpis tincidunt lacinia.'
  const [ updateState, setupdateState ] = useState(false)
  const updateContent = useRef('')
  // const [ updateComment, setUpdateComment ] = useState('');
  const { id, content } = comment
  console.log('rendering')

  if (!updateState) {
    return(
      <div className={styles.commentContainer}>
        <div className={styles.commentTopbar}>
          <div>
            <span className={styles.commentTitle}>9기 구미</span>
            <span className={styles.commentcreateTimeago}><IoRocketOutline className={styles.commentIcons} />15분 전</span>
          </div>
          <div>
          </div>
        </div>
  
        <div className={styles.commentContent}>{comment.content}</div>
  
        <div className={styles.commentBottombar}>
          <div><IoChatboxOutline className={styles.commentIcons}/><span>대댓글</span></div>
          {/* <div><FaRegThumbsUp className={styles.commentIcons}/><span>{commentRecommended}</span></div> */}
          <div>
            <span className={styles.commentIcons} onClick={() => {
              setupdateState((prev) => !prev);
              // setUpdateComment(comment.content);
              }}>
              <span className={styles.updatetextPosition} ><HiOutlinePencilAlt />수정하기</span></span>
            <span className={styles.commentIcons} onClick={() => {CommentDelete(id)}}><span className={styles.updatetextPosition}><IoTrashOutline />삭제하기</span></span>
          </div>
        </div>
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
          <div>
          </div>
        </div>
        
        <div className={styles.updateinputContainer}>
          <textarea  className={styles.updateInput} type="text" defaultValue={comment.content} ref={updateContent}/>
          {/* <div className={styles.commentContent}>{comment.content}</div> */}
        </div>
  
        <div className={styles.commentupdateBottombar}>
          <button className={styles.updateButtons} onClick={() => {
            const Content = updateContent.current.value;
            console.log('update content', updateContent.current.value);
            commentUpdate(Content, id);
            setupdateState((prev) => !prev);
            }}><HiOutlinePencilAlt className={styles.updateIcons} />수정 완료</button>
          <button className={styles.updateButtons} onClick={() => setupdateState((prev) => !prev)}>취소</button>
        </div>
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