import React from 'react';
import styles from './SearchView.module.css'

import { useParams } from 'react-router-dom';

import { FiSearch } from '@react-icons/all-files/fi/FiSearch';

import TopSpace from '../../components/TopSpace/TopSpace';
import UnderSpace from '../../components/UnderSpace/UnderSpace';

export default function SearchView() {
  const { keyword } = useParams();

  return (
    <div>
      <TopSpace />

      <div className={styles.searchboxall}>
        <input className={styles.search} id={styles.all} type="text" placeholder="찾고싶은 게시글의 제목 또는 내용의 키워드를 검색" />
        <button className={styles.searchbutton}><FiSearch /></button>
      </div>

      <UnderSpace />
    </div>
  );
}

