import styles from "./BoardsAll.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import AdHorizontal from "../../components/AdHorizontal/AdHorizontal";
import BoardsView from "./BoardsView/BoardsView";
import TopSpace from "../../components/TopSpace/TopSpace";

import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { CgAddR } from "@react-icons/all-files/cg/CgAddR";
import customAxios from "../../util/customAxios";

export default function BoardsAll() {
  const [boardTitles, setboardTitles] = useState([]);
  const { boardTitle } = useParams();
  const boardsearchMessage = `${boardTitle}에서 찾고싶은 게시글의 제목 또는 내용의 키워드를 검색해보세요`;
  const [keywordAll, setKeywordAll] = useState("");
  const [keywordBoard, setKeywordBoard] = useState("");

  const navigate = useNavigate();
  // const URL = useSelector((state) => state.URL.API_URL);

  // const { isLoading, error, data: boards } = useQuery(
  //   ['boards'], () => {
  //     const posts = new Posts();
  //     return posts.boards();
  //   });

  useEffect(() => {

    customAxios({
      method: "get",
      url: '/api/boards'
    })
    .then((res) => {
      setboardTitles(res.data)
      console.log('res.data', res.data)})
    .catch((err) => console.log(err))

    return () => {  
      console.log('unmounted')
     }}, []);

  return(
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
      {/* <div className={styles.hotcontainer}>
        <span className={styles.hottitle}>Hot 게시판</span>
        <span className={styles.hotboard}>자유 게시판</span>
        <span className={styles.hotboard}>비밀 게시판</span>
      </div> */}

      <div className={styles.boardcontainer}>
        <AdHorizontal />

        <div className={styles.boardcontainer}>
          <div className={styles.boardtabContainer}>
            <div>
              {boardTitles.map((board, index) => (
                <button
                  key={index}
                  className={
                    board.title == boardTitle
                      ? styles.boardtabSelected
                      : styles.boardtab
                  }
                  onClick={() => navigate(`/boards/${board.title}`)}
                >
                  {board.title}
                </button>
              ))}
            </div>
            <div>
              <button
                className={styles.createpageButton}
                onClick={() => navigate(`/boards/${boardTitle}/create`)}
              >
                <CgAddR className={styles.createpageIcon} size="15" />새 글 작성
              </button>
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </div>

        <form className={styles.searchboxhere}>
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
              navigate(`/boards/${boardTitle}/search/${keywordBoard}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <FiSearch />
          </button>
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
  );
}
