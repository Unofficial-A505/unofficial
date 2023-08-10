import React, { useEffect, useState } from 'react';
import styles from './BoardSearchView.module.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import SearchContent from '../../../components/SearchContent/SearchContent'

import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';

import { searchViewApi } from "../../../api/boards"

export default function BoardSearchView() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { keyword } = useParams();
  const [ currboardName, setcurrboardName ] = useState('')
  const [ searchResults, setsearchResults ] = useState([]);

  useEffect(() => {
    // 특정 게시판에서 게시글 검색
    searchViewApi(keyword, boardId)
    .then((res) => {
      console.log(res)
      setsearchResults(res.data.content)
      setcurrboardName(res[0].boardName)
    }).catch((err) => console.log(err));

  }, []);

  return (
    <div>
      <div className={styles.searchUpheader}>
        <div><span className={styles.boardTitle}>{currboardName}</span>의 <span className={styles.searchKeyword}>'{keyword}'</span> 검색 결과</div>
        <button className={styles.grayoutbutton} onClick={() => navigate(`/boards/${boardId}`)}><IoIosArrowBack />목록으로 돌아가기</button>
      </div>
        
      <div className={styles.boardscontentTitles}>
        <SearchContent searchResults={searchResults} keyword={keyword}/>
      </div>
    </div>
  );
}

