import styles from "./BoardsAll.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Outlet } from "react-router-dom";

import AdHorizontal from "../../components/AdHorizontal/AdHorizontal";
import BestpostsWidget from "../../components/BestpostsWidget/BestpostsWidget";
import ServerTime from "../../components/ServerTime/ServerTime";

import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { CgAddR } from "@react-icons/all-files/cg/CgAddR";

import { bestPostsApi, boardNamesApi } from "../../api/boards";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useDocumentTitle from "../../useDocumentTitle";
import { useSelector } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function BoardsAll() {
  useDocumentTitle("게시판");

  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const location = useLocation();

  const { boardId } = useParams();
  const [boardNames, setboardNames] = useState([]);
  const [currboardName, setcurrboardName] = useState("");
  const [keywordAll, setKeywordAll] = useState("");
  const [keywordBoard, setKeywordBoard] = useState("");
  const [bestPostlist, setbestPostlist] = useState([]);
  const boardsearchMessage = `${currboardName}에서 찾고싶은 게시글의 키워드를 검색`;

  const [value, setValue] = useState(0);

  const handleChange = (e, index) => {
    setValue(index);
  };

  const settings = {
    slide: "div",
    infinite: true,
    vertical: true, // 세로 방향으로 슬라이드
    speed: 500,
    slidesToShow: 1, // 한 번에 보여줄 아이템 개수
    slidesToScroll: 1, // 스크롤시 이동할 아이템 개수
    autoplay: true,
    autoplaySpeed: 1800,
    pauseOnHover: true,
  };

  useEffect(() => {
    // setValue(boardId - 1);
    
    // best 게시글 api
    bestPostsApi()
      .then((res) => {
        setbestPostlist(res);
      })
      .catch((err) => console.log(err));

    // boards Title api
    boardNamesApi()
      .then((res) => {
        setboardNames(res);
        let index = 0
        res.forEach((board) => {
          if (board.id + "" === boardId) {
            setcurrboardName(board.name);
          }
          if (location.state===board.name) {
            setValue(index)
          }
          index++;
        });
      })
      .catch((err) => console.log(err));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [boardId || boardNames]);

  return (
    <div className={styles.boardsAllContainer}>
      <div className={styles.boardsviewContainer}>
        <div className={styles.boardcontainer}>
          <div className={styles.advContainer}>
            <AdHorizontal />
          </div>

          <div className={styles.boardsTopContainer}>
            <form className={styles.searchboxall}>
              <p>전체 게시글 검색</p>
              <div className={styles.searchInputBox}>
                <input
                  className={styles.search}
                  type="text"
                  placeholder="찾고싶은 게시글의 키워드를 검색하세요"
                  onChange={(e) => {
                    setKeywordAll(e.target.value);
                  }}
                  maxLength="25"
                />
                <button
                  className={styles.searchbutton}
                  onClick={(e) => {
                    e.preventDefault();
                    if (authUser.accessToken) {
                      if (keywordAll.trim()) {
                        navigate(
                          `/boards/search/${encodeURIComponent(keywordAll)}`,
                          { state: encodeURIComponent(keywordAll) }
                        );
                      } else {
                        alert("검색어를 입력해주세요!");
                      }
                    } else {
                      alert("로그인 후 이용해주세요!");
                    }
                  }}
                >
                  <FiSearch />
                </button>
              </div>
            </form>

            <div className={styles.boardsallBestContainer}>
              <p>전체 best 게시글</p>
              <div className={styles.boardsallBestBox}>
                <Slider {...settings}>
                  {bestPostlist.map((data, index) => (
                    <div
                      key={index}
                      className={styles.bestContentContainer}
                      onClick={() => {
                        if (authUser.accessToken)
                          navigate(`/boards/${data.boardId}/${data.articleId}`);
                        else alert("로그인 후 이용해주세요!");
                      }}
                    >
                      <span className={styles.bestContent}>
                        {data.boardName}
                      </span>
                      <span className={styles.bestContentTitle}>
                        {data.title}
                      </span>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

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
                  id={
                    value == index ? styles.boardtabSelected : styles.boardtab
                  }
                  // className={board.id == boardId? styles.boardtabSelected : styles.boardtab}
                  onClick={() => {
                    navigate(`/boards/${board.id}`, { state: board.name });
                  }}
                  label={board.name}
                ></Tab>
              ))}
            </Tabs>
            <div className={styles.postcreateContainer}>
              <button
                className={styles.createpageButton}
                onClick={() => {
                  if (authUser.accessToken)
                    navigate(`/boards/${boardId}/create`, {
                      state: currboardName,
                    });
                  else alert("로그인 후 이용해주세요!");
                }}
              >
                <CgAddR className={styles.createpageIcon} size="18" />새 글 작성
              </button>
            </div>
          </div>

          <div className={styles.boardsPostsContainer}>
            <Outlet />
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
                  maxLength="18"
                />
                <button
                  className={styles.searchbutton}
                  onClick={(e) => {
                    e.preventDefault();
                    if (authUser.accessToken) {
                      if (keywordBoard.trim()) {
                        navigate(
                          `${boardId}/search/${encodeURIComponent(
                            keywordBoard
                          )}`,
                          { state: currboardName }
                        );
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        alert("검색어를 입력해주세요!");
                      }
                    } else alert("로그인 후 이용해주세요!");
                  }}
                >
                  <FiSearch />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={styles.sideviewContainer}>
          <div className={styles.sideContentContainer}>
            <div className={styles.sidecontentmiddleBox}>
              <BestpostsWidget IsAuth={authUser.accessToken} />
              <ServerTime />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.advContainer}>
        <AdHorizontal />
      </div>
    </div>
  );
}
