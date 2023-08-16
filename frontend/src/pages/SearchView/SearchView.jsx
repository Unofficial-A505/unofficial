import React from "react";
import styles from "./SearchView.module.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

import SearchContent from "../../components/SearchContent/SearchContent";
import AdHorizontal from "../../components/AdHorizontal/AdHorizontal";

import { bestPostsApi, searchViewApi, boardNamesApi } from "../../api/boards";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useDocumentTitle from "../../useDocumentTitle";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function SearchView() {
  const searchView = true
  useDocumentTitle("게시글 찾기");

  // const { keyword } = useParams();
  const { state: keyword } = useLocation();
  const [keywordAll, setKeywordAll] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [bestPostlist, setbestPostlist] = useState([]);
  const [boardNames, setboardNames] = useState([]);
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const handleChange = (e, index) => {
    setValue(index);
  };

  const authUser = useSelector((state) => state.authUser);

  const settings = {
    dots: false,
    infinite: true,
    vertical: true, // 세로 방향으로 슬라이드
    // verticalSwiping: true, // 세로 방향으로 슬라이드 스와이프
    speed: 500,
    slidesToShow: 1, // 한 번에 보여줄 아이템 개수
    slidesToScroll: 1, // 스크롤시 이동할 아이템 개수
    autoplay: true,
    autoplaySpeed: 2000,
  };
  useEffect(() => {
    //전체게시판에서 게시글 검색
    searchViewApi(keyword, 0)
    .then((res) => {
      // console.log("search success", res);
      setsearchResults(res);
    })
    .catch((err) => console.log(err));
  }, [keyword])

  useEffect(() => {
    bestPostsApi()
      .then((res) => {
        // console.log("best", res);
        setbestPostlist(res);
      })
      .catch((err) => console.log(err));

    // boards Title api
    boardNamesApi()
      .then((res) => {
        setboardNames(res);
      })
      .catch((err) => console.log(err));
  }, []);

  if (authUser.accessToken) {

    return (
      <div>
        <div className={styles.advContainer}>
          <AdHorizontal />
        </div>
  
        <div className={styles.boardsTopContainer}>
          <form className={styles.searchboxall}>
            <p>전체 게시글 검색</p>
            <div className={styles.searchInputBox}>
              <input
                className={styles.search}
                id={styles.all}
                type="text"
                placeholder="찾고싶은 게시글의 제목 또는 내용의 키워드를 검색"
                onChange={(e) => {
                  setKeywordAll(e.target.value);
                }}
                maxLength="25"
              />
              <button
                className={styles.searchbutton}
                onClick={(e) => {
                  e.preventDefault();
                  if (keywordAll.trim()) {
                    navigate(`/boards/search/${encodeURIComponent(keywordAll)}`, { state : encodeURIComponent(keywordAll) })
                  } else {
                    alert('검색어를 입력해주세요!')
                  }
                  }}>
                <FiSearch />
              </button>
            </div>
          </form>
  
          <div className={styles.boardsallBestContainer}>
            <div className={styles.bestbannerTitle}>전체 best 게시글</div>
            <div className={styles.boardsallBestBox}>
              <Slider {...settings}>
                {bestPostlist.map((data, index) => (
                  <div key={index} className={styles.bestContentContainer}>
                    <span className={styles.bestContent}>{data.boardName}</span>
                    <span>{data.title}</span>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className={styles.boardcontainer}>
          <div className={styles.boardtabContainer}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                className={styles.boardTabsBox}
              >
              {boardNames.map((board, index) => (
                  <Tab 
                  key={index}
                  id={value==index?styles.boardtabSelected:styles.boardtab}
                  // className={board.id == boardId? styles.boardtabSelected : styles.boardtab}
                  onClick={() => {navigate(`/boards/${board.id}`, { state: board.name });}}
                  label={board.name}
                  />
                ))}
              </Tabs>
          </div>
        </div>
  
        <div className={styles.searchcontentContainer}>
          <div className={styles.searchUpheader}>
            <div className={styles.searchkeywordBox}>
              <span className={styles.boardTitle}>전체게시판</span>의
              <span className={styles.searchKeyword}>'{decodeURIComponent(keyword)}'</span> 검색 결과
            </div>
            <button
              className={styles.grayoutbutton}
              onClick={() => navigate("/boards/1")}
            >
              <IoIosArrowBack />
              게시판으로 돌아가기
            </button>
          </div>
          {/* {console.log(searchResults.length)} */}
          <div className={styles.searchcontentBox}>
            <SearchContent searchResults={searchResults} keyword={decodeURIComponent(keyword)} searchView='all' IsAuth={authUser.accessToken}/>
          {searchResults.length == 0 && (
            <div className={styles.noSearchSentence}>검색된 결과가 없습니다.</div>
          )}
          </div>
        </div>
      </div>
    );
  } else {
    {alert('로그인 후 이용해주세요! 메인 화면으로 이동합니다.');
    window.document.location.href = "/";}
  }
}
