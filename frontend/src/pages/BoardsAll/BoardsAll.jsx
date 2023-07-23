import styles from './BoardsAll.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams, Outlet } from 'react-router-dom';

import AdHorizontal from '../../components/AdHorizontal/AdHorizontal'
import BoardsView from './BoardsView/BoardsView';
import TopSpace from '../../components/TopSpace/TopSpace';
import UnderSpace from '../../components/UnderSpace/UnderSpace';

import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { CgAddR } from '@react-icons/all-files/cg/CgAddR';

export default function BoardsAll(){
  const curr = '지금 게시판에서 검색하기'
  const [ boardTitles, setboardTitles ] = useState([]);
  const { boardTitle } = useParams();
  const [ keywordAll, setKeywordAll ] = useState('')
  const [ keywordBoard, setKeywordBoard ] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/v1/articles/boards/`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
      })
      .then((res) => {
        setboardTitles(res.data)
        console.log('boards', boardTitles)
      })
      .catch((err) => console.log(err))
    return () => {  
      console.log('unmounted')
     }}, []);

  return(
    <div>
    <TopSpace />

    <div className={styles.searchboxall}>
      <input className={styles.search} id={styles.all} type="text" placeholder="찾고싶은 게시글의 제목 또는 내용의 키워드를 검색" onChange={(e) => {setKeywordAll(e.target.value)}}/>
      <button className={styles.searchbutton} onClick={() => navigate(`search/${keywordAll}`)}><FiSearch /></button>
    </div>
    <div className={styles.hotcontainer}>
      <span className={styles.hottitle}>Hot 게시판</span>
      <span className={styles.hotboard}>자유 게시판</span>
      <span className={styles.hotboard}>비밀 게시판</span>
    </div>
    <AdHorizontal />
    
    <div className={styles.boardcontainer}>
      <div className={styles.boardtabcontainer}>
        <div>
          {boardTitles.map((data, index) => 
            <button key={index} className={styles.boardtab} onClick={() => navigate(`/boards/${data.title}`)}>{data.title}</button>
          )}
        </div>
        <div>
          <button onClick={() => navigate(`/boards/${boardTitle}/create`)}><CgAddR size={20}/>새 글 작성</button>
        </div>
      </div>
        <div>
          <Outlet />
        </div>
    </div>

    <div className={styles.searchboxhere}>
      <input className={styles.search} id={styles.here}type="text" placeholder={curr} onChange={(e) => {setKeywordBoard(e.target.value)}}/>
      <button className={styles.searchbutton} onClick={() => navigate(`/boards/${boardTitle}/search/${keywordBoard}`)}><FiSearch /></button>
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