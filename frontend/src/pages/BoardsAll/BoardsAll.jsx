import styles from "./BoardsAll.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Outlet} from "react-router-dom";

import AdHorizontal from "../../components/AdHorizontal/AdHorizontal";
import TopSpace from "../../components/TopSpace/TopSpace";

import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { CgAddR } from "@react-icons/all-files/cg/CgAddR";

import { bestPostsApi, boardNamesApi } from "../../api/boards"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function BoardsAll() {
  const [ boardNames, setboardNames ] = useState([]);
  const [ currboardName, setcurrboardName ] = useState('');
  const { boardId } = useParams();
  const [ keywordAll, setKeywordAll ] = useState("");
  const [ keywordBoard, setKeywordBoard ] = useState("");
  const [ bestPostlist, setbestPostlist ] = useState([]);
  
  const boardsearchMessage = `${currboardName}에서 찾고싶은 게시글의 키워드를 검색`;
  
  const navigate = useNavigate();

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
    // best 게시글 api
    bestPostsApi
    .then((res) => {
      console.log('best', res)
      setbestPostlist(res);
    }).catch((err) => console.log(err));
   
    // boards Title api
    boardNamesApi
    .then((res) => {
      setboardNames(res)
      res.forEach((board) => {
        if (board.id == boardId) {
          setcurrboardName(board.name)}})
    }).catch((err) => console.log(err))

    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {  
      console.log('unmounted')
     }}, [boardId || boardNames]);



  return(
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
              placeholder="찾고싶은 게시글의 키워드를 검색"
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
          </div> 
        </form>

        <div className={styles.boardsallBestContainer}>
          <div className={styles.bestbannerTitle}>전체 best 게시글</div>
          <div className={styles.boardsallBestBox}>
            <Slider {...settings}>
              {bestPostlist.map((data, index) => (
                <div key={index} className={styles.bestContentContainer}><span className={styles.bestContent}>{data.boardName}</span><span>{data.title}</span></div>
                ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className={styles.boardcontainer}>
        <div className={styles.boardtabContainer}>
          <div>
            {boardNames.map((board, index) => (
              <button
              key={index}
              className={
                board.id == boardId
                ? styles.boardtabSelected
                : styles.boardtab
              }
                onClick={() => navigate(`/boards/${board.id}`, { state: board.name })}
                >
                {board.name}
              </button>
            ))}
          </div>
          <div className={styles.postcreateContainer}>
            <button
              className={styles.createpageButton}
              onClick={() => navigate(`/boards/${boardId}/create`, {state : currboardName })}
            >
              <CgAddR className={styles.createpageIcon} size="20" />새 글 작성
            </button>
          </div>
        </div>

        <div className={styles.boardsPostsContainer}>
          <Outlet />
        </div>
      
        <div className={styles.advContainer}>
          <AdHorizontal />
        </div>

        <div className={styles.boardBottomBar}>
        <form className={styles.searchboxhere}>
          <p>{currboardName} 검색</p>
          <div className={styles.searchInputBox}>
            <input
              className={styles.search}
              id={styles.here}
              type="text"
              placeholder={boardsearchMessage}
              onChange={(e) => {
                setKeywordBoard(e.target.value);
              }}
            />
            <button
              className={styles.searchbutton}
              onClick={() => {
                navigate(`/boards/${boardId}/search/${keywordBoard}`, { state : currboardName });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <FiSearch />
            </button>
          </div>
        </form>

        <nav className={styles.pagination} aria-label="...">
          <ul className="pagination pagination-sm">
            <li className="page-item active" aria-current="page">
              <span className="page-link">1</span>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
          </ul>
        </nav>
        </div>

      </div>
    </div>
  );
}