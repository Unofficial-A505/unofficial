import styles from './CommentView.module.css'

import { FaRegThumbsUp } from '@react-icons/all-files/fa/FaRegThumbsUp';
import { IoChatboxOutline } from '@react-icons/all-files/io5/IoChatboxOutline';
import { IoRocketOutline } from '@react-icons/all-files/io5/IoRocketOutline';

// 삭제 아이콘
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
// 수정 아이콘
import { HiOutlinePencilAlt } from '@react-icons/all-files/hi/HiOutlinePencilAlt';

export default function CommentView(){
  const commentRecommended = 0
  const comentContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis velit id justo vulputate eleifend. Integer maximus sapien enim, vel faucibus risus auctor vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus hendrerit tincidunt diam sed accumsan. Aenean rhoncus erat et nisi lobortis, nec tincidunt elit finibus. Cras ipsum nulla, egestas non nisl vel, pharetra mollis tellus. Nullam dignissim metus lectus, at faucibus ex lacinia a. Proin tristique augue ut turpis tincidunt lacinia.'
  return(
    <div className={styles.commentContainer}>
      <div className={styles.commentTopbar}>
        <div>
          <span className={styles.commentTitle}>9기 구미</span>
          <span className={styles.commentcreateTimeago}><IoRocketOutline className={styles.commentIcons} />15분 전</span>
        </div>
        <div>
          <span className={styles.commentIcons}><HiOutlinePencilAlt size='20'/></span>
          <span className={styles.commentIcons}><IoTrashOutline size='20'/></span>
        </div>
      </div>

      <div className={styles.commentContent}>{comentContent}</div>

      <div className={styles.commentBottombar}>
        <div><FaRegThumbsUp className={styles.commentIcons}/><span>{commentRecommended}</span></div>
        <div><IoChatboxOutline className={styles.commentIcons}/><span>대댓글</span></div>
      </div>
      <hr />

      <div className={styles.commentTopbar}>
        <div>
          <span className={styles.commentTitle}>9기 구미</span>
          <span className={styles.commentcreateTimeago}><IoRocketOutline className={styles.commentIcons} />15분 전</span>
        </div>
        <div>
          <span className={styles.commentIcons}><HiOutlinePencilAlt size='20'/></span>
          <span className={styles.commentIcons}><IoTrashOutline size='20'/></span>
        </div>
      </div>

      <div className={styles.commentContent}>{comentContent}</div>

      <div className={styles.commentBottombar}>
        <div><FaRegThumbsUp className={styles.commentIcons}/><span>{commentRecommended}</span></div>
        <div><IoChatboxOutline className={styles.commentIcons}/><span>대댓글</span></div>
      </div>
      <hr />

    </div>
  );
}