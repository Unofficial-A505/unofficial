import styles from './PostDetail.module.css'

import BoardView from '../../components/BoardView/BoardView'
import CommentView from '../../components/CommentView/CommentView'
import BestpostsWidget from '../../components/BestpostsWidget/BestpostsWidget'
import EduGrantButton from '../../components/EduGrantButton/EduGrantsButton'

import TopSpace from '../../components/TopSpace/TopSpace';
import UnderSpace from '../../components/UnderSpace/UnderSpace';

export default function PostDetail(){
  const title = '거기 시간 있어?'
  const username = '9기 서울'
  const timeago = '21분 전'
  const content = `아껴써.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua.`

  const recommended = 37

  const commentsNum = 3
  
  return(
    <>
      <TopSpace/>
      <div className={styles.postdetailallContainer}>
        <span className={styles.postviewContainer}>
          <div className={styles.postContainer}>
            <div className={styles.posttitleTopbar}>
              <span>자유게시판</span>
              <button>목록 돌아가기</button>
            </div>

            <div>
              <div>{title}</div>
              <div>{username}</div>
              <div>{timeago}</div>
            </div>

            <hr />

            <div>{content}</div>

            <div>
              <div>{recommended}</div>

              <div>update</div>
              <div>delete</div>
              <div>공지로 설정하기</div>
            </div>

            <hr />
          </div>

          <hr />

          <div>댓글 {commentsNum}</div>

          <input type="text" placeholder="여기 게시글 comment" />
          <div>
            <CommentView />
          </div>

          <nav aria-label="...">
            <ul className="pagination pagination-sm">
              <li className="page-item active" aria-current="page">
                <span className="page-link">1</span>
              </li> 
              <li><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
            </ul>
          </nav>

          <div>
            <button>이전 글 보기</button>
            <button>다음 글 보기</button>
          </div>

          <hr />

          <BoardView />
        </span>

        <span className={styles.sideviewContainer}>
          <BestpostsWidget />
          <EduGrantButton />
        </span>
      </div>
    <UnderSpace />
  </>
  );
}