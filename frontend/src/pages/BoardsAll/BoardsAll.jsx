import styles from './BoardsAll.module.css'
import { Link, useNavigate } from 'react-router-dom';
import AdHorizontal from '../../components/AdHorizontal/AdHorizontal'
import BoardView from '../../components/BoardView/BoardView'

export default function BoardsAll(){
  const curr = '지금 게시판에서 검색하기'

  const navigate = useNavigate();

  return(
    <div>
        <input className={styles.search} id={styles.all} type="text" placeholder="찾고싶은 게시글의 제목 또는 내용의 키워드를 검색" />
      <div className={styles.searchbox}>
        <span className={styles.hotboard}>Hot 게시판</span>
        <span>자유 게시판</span>
      </div>
      <AdHorizontal />
      
      <div>
        <Link className={styles.boardtab} to="/board">자유게시판</Link>
        <Link className={styles.boardtab} to="/board">비밀게시판</Link>
        <Link className={styles.boardtab} to="/board">9기게시판</Link>
        <Link className={styles.boardtab} to="/board">10기게시판</Link>
        <Link to='/board/create'>새 글 생성</Link>
      </div>

      <BoardView />
      <input className={styles.search} id={styles.here}type="text" placeholder={curr} />

      <nav className={styles.pagination} aria-label="...">
        <ul className="pagination pagination-sm">
          <li className="page-item active" aria-current="page">
            <span className="page-link">1</span>
          </li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
        </ul>
      </nav>

    </div>
  );
}                   