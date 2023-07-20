import styles from './BoardsAll.module.css'
import { Link, useNavigate } from 'react-router-dom';
import AdHorizontal from '../../components/AdHorizontal/AdHorizontal'
import BoardView from '../../components/BoardView/BoardView';

import TopSpace from '../../components/TopSpace/TopSpace';
import UnderSpace from '../../components/UnderSpace/UnderSpace';

import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { CgAddR } from '@react-icons/all-files/cg/CgAddR';

export default function BoardsAll(){
  const curr = '지금 게시판에서 검색하기'

  const navigate = useNavigate();

  return(
    <div>
    <TopSpace />

    <div className={styles.searchboxall}>
      <input className={styles.search} id={styles.all} type="text" placeholder="찾고싶은 게시글의 제목 또는 내용의 키워드를 검색" />
      <button className={styles.searchbutton}><FiSearch /></button>
    </div>
    <div class={styles.hotcontainer}>
      <span className={styles.hottitle}>Hot 게시판</span>
      <span className={styles.hotboard}>자유 게시판</span>
      <span className={styles.hotboard}>비밀 게시판</span>
    </div>
    <AdHorizontal />
    
    <div className={styles.boardcontainer}>
      <div className={styles.boardtabcontainer}>
        <div>
          <Link className={styles.boardtab} to="/board">자유게시판</Link>
          <Link className={styles.boardtab} to="/board">비밀게시판</Link>
          <Link className={styles.boardtab} to="/board">9기게시판</Link>
          <Link className={styles.boardtab} to="/board">10기게시판</Link>
        </div>
        <div>
          <Link to='/board/create'><CgAddR size={20}/>새 글 작성</Link>
        </div>
      </div>
        <div>
          <BoardView />
        </div>
    </div>

    <div className={styles.searchboxhere}>
      <input className={styles.search} id={styles.here}type="text" placeholder={curr} />
      <button className={styles.searchbutton}><FiSearch /></button>
    </div>

    <nav className={styles.pagination} aria-label="...">
      <ul className="pagination pagination-sm">
        <li className="page-item active" aria-current="page">
          <span className="page-link">1</span>
        </li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
      </ul>
    </nav>

    <UnderSpace />

    </div>
  );
}                   