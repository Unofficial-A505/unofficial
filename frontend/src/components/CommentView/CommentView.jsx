import styles from './CommentView.module.css'
import axios from 'axios';
import { useState } from 'react';

import { FaRegThumbsUp } from '@react-icons/all-files/fa/FaRegThumbsUp';
import { IoChatboxOutline } from '@react-icons/all-files/io5/IoChatboxOutline';
import { IoRocketOutline } from '@react-icons/all-files/io5/IoRocketOutline';

// 삭제 아이콘
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
// 수정 아이콘
import { HiOutlinePencilAlt } from '@react-icons/all-files/hi/HiOutlinePencilAlt';

export default function CommentView({ comment }){
  const commentRecommended = 0
  const comentContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis velit id justo vulputate eleifend. Integer maximus sapien enim, vel faucibus risus auctor vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus hendrerit tincidunt diam sed accumsan. Aenean rhoncus erat et nisi lobortis, nec tincidunt elit finibus. Cras ipsum nulla, egestas non nisl vel, pharetra mollis tellus. Nullam dignissim metus lectus, at faucibus ex lacinia a. Proin tristique augue ut turpis tincidunt lacinia.'
  const [ updateState, setupdateState ] = useState(false)
  console.log('rendering')
  
  const CommentDelete = (id) => {
    axios({
      method: "delete",
      url: `http://127.0.0.1:8000/api/v1/comments/${comment.id}/`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
    }

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
            <span className={styles.commentIcons}><HiOutlinePencilAlt size='20'/></span>
            <span className={styles.commentIcons} onClick={CommentDelete}><IoTrashOutline size='20' /></span>
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

        <input type="text" value={comment.content}/>
        {/* <div className={styles.commentContent}>{comment.content}</div> */}
  
        <div className={styles.commentBottombar}>
          <button onClick={setupdateState((prev) => !prev)}>취소</button>
          <button>수정</button>
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