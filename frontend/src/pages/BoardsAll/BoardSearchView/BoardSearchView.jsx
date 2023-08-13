import React, { useEffect, useState } from 'react';
import styles from './BoardSearchView.module.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import SearchContent from '../../../components/SearchContent/SearchContent'

import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { searchViewApi } from "../../../api/boards"

export default function BoardSearchView() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { keyword } = useParams();
  // console.log('boardId', boardId)
  const { state : boardName } = useLocation();
  // const [ currboardName, setcurrboardName ] = useState('')
  const [ searchResults, setsearchResults ] = useState([]);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    // 특정 게시판에서 게시글 검색
    searchViewApi(encodeURIComponent(keyword), boardId)
    .then((res) => {
      setsearchResults(res)
      // setcurrboardName(res[0].boardName)
    }).catch((err) => console.log(err));

  }, [keyword]);

  return (
    <div>
      <div className={styles.searchUpheader}>
        <div><span className={styles.boardTitle}>{boardName}</span>의 <span className={styles.searchKeyword}>'{keyword}'</span> 검색 결과</div>
        <button className={styles.grayoutbutton} onClick={() => navigate(`/boards/${boardId}`)}><IoIosArrowBack />목록으로 돌아가기</button>
      </div>
        
      <div className={styles.boardscontentTitles}>
        <SearchContent searchResults={searchResults} keyword={keyword} searchView={true} IsAuth={authUser.accessToken}/>
        {searchResults.length == 0 && (
          <div className={styles.noSearchSentence}>검색된 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

