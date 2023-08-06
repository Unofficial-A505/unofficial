import React from "react";
import styles from "./SearchView.module.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

import TopSpace from "../../components/TopSpace/TopSpace";
import SearchContent from "../../components/SearchContent/SearchContent";
import AdHorizontal from "../../components/AdHorizontal/AdHorizontal";

import { searchViewApi } from "../../api/boards"

export default function SearchView() {
  const { keyword } = useParams();
  const [ keywordAll, setKeywordAll ] = useState("");
  const [ searchResults, setsearchResults ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 전체게시판에서 게시글 검색
    searchViewApi(keyword, 0)
    .then((res) => {
      console.log('search success', res);
      setsearchResults(res);
    }).catch((err) => console.log(err));

    return () => {  
      console.log('unmounted')}
  }, []);

  return (
    <div>
      <TopSpace />

      <form className={styles.searchboxall}>
        <input
          className={styles.search}
          id={styles.all}
          type="text"
          placeholder="찾고싶은 게시글의 제목 또는 내용의 키워드를 검색"
          onChange={(e) => {
            setKeywordAll(e.target.value);
          }}
        />
        <button
          className={styles.searchbutton}
          onClick={() => navigate(`/boards/search/${keywordAll}`)}
        >
          <FiSearch />
        </button>
      </form>

      <div className={styles.searchcontentContainer}>
        <AdHorizontal />

        <div className={styles.searchUpheader}>
          <div>
            <span className={styles.boardTitle}>전체게시판</span>의
            <span className={styles.searchKeyword}>'{keyword}'</span> 검색 결과
          </div>
          <button
            className={styles.grayoutbutton}
            onClick={() => navigate("/boards/1")}
          >
            <IoIosArrowBack />
            게시판으로 돌아가기
          </button>
        </div>

        <div className={styles.searchcontentBox}>
          <SearchContent searchResults={searchResults} keyword={keyword}/>
        </div>
      </div>
    </div>
  );
}
