import styles from './PostDetail.module.css'

import BoardView from '../../components/BoardView/BoardView'

export default function PostDetail(){
  return(
    <div>
      <span>
        PostDetail
        <hr />
        <input type="text" placeholder="여기 게시글 comment" />
        <div>여기 댓글</div>

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
    </div>
  );
}