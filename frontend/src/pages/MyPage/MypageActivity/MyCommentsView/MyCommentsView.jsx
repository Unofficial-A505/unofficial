import styles from './MyCommentsView.module.css'

import { useNavigate } from 'react-router-dom'

import BoardView from '../../../../components/BoardView/BoardView'

export default function MyCommentsView(){
  const date = 100
  const navigate = useNavigate();

  return(
    <div className={styles.contentContainer}>
      <div className={styles.welcomeContainer}>
        <div/>
        {/* <p>안녕하세요! <span style={{color:'#282828', fontSize:'1.2rem', fontWeight:'600'}}>{ user }</span>님!</p>  */}
      </div>
      <div className={styles.myContentContainer}>
        <div className={styles.mycontentTop}>
          <div className={styles.mycontentTitle}>
            <h2 className={styles.mypostsTitle}>내 댓글 보기</h2>
            <p className={styles.smallTitle}>내가 작성한 댓글을 모아볼 수 있습니다.</p>
          </div>
          <p style={{color:'#282828'}}>가입한지 <span style={{color:'#034BB9', fontSize:'1.2rem', fontWeight:'600'}}>+{ date }일</span></p>
        </div>
        {/* <div className={styles.temp} /> */}
        
        <hr />
        <div className={styles.CommentsContainer}>
          <div className={styles.commentContentsContainer}>
            <div className={styles.dateContainer}>
              23.08.14 작성
            </div>
            <div className={styles.commentContainer}>
              집사님 주행영상 너무 힐링되네요 말씀까지 재미있게 해주셔서 힘들 때 잘 보고 있습니다.
            </div>
            <div className={styles.boardpostContainer}>
              <div className={styles.postContainer}>
                <div className={styles.postContent} id={styles.boardName}>자유게시판</div>
                <div className={styles.postTitle}>게시글 제목</div>
              </div>
              <div className={styles.postContainer}>
                <div className={styles.postContent}>추천수</div>
                <div className={styles.postContent}>사용자</div>
                <div className={styles.postContent}>23.08.12</div>
              </div>
            </div>
          </div>

          <div className={styles.commentContentsContainer}>
            <div className={styles.dateContainer}>
              23.08.14 작성
            </div>
            <div className={styles.commentContainer}>
              집사님 주행영상 너무 힐링되네요 말씀까지 재미있게 해주셔서 힘들 때 잘 보고 있습니다.
            </div>
            <div className={styles.boardpostContainer}>
              <div className={styles.postContainer}>
                <div className={styles.postContent} id={styles.boardName}>자유게시판</div>
                <div className={styles.postTitle}>게시글 제목</div>
              </div>
              <div className={styles.postContainer}>
                <div className={styles.postContent}>추천수</div>
                <div className={styles.postContent}>사용자</div>
                <div className={styles.postContent}>23.08.12</div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}