import React from 'react';
import styles from './BoardSearchView.module.css';
import { useNavigate, useParams } from 'react-router-dom';

import SearchContent from '../../../components/SearchContent/SearchContent'

import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';

export default function BoardSearchView() {
  const navigate = useNavigate();
  const { boardTitle } = useParams();
  const { keyword } = useParams();

  return (
    <div>
      <div className={styles.searchUpheader}>
        <div><span className={styles.boardTitle}>{boardTitle}</span>의 <span className={styles.searchKeyword}>'{keyword}'</span> 검색 결과</div>
        <button className={styles.grayoutbutton} onClick={() => navigate(`/boards/${boardTitle}`)}><IoIosArrowBack />목록으로 돌아가기</button>
      </div>

      <div className={styles.boardscontentTitles}>
        <SearchContent />
      </div>
    </div>
  );
}

