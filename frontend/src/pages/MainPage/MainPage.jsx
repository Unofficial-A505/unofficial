import styles from "./MainPage.module.css";
import UserinfoBox from "../../components/UserinfoBox/UserinfoBox";
import AdHorizontal from "../../components/AdHorizontal/AdHorizontal";
import AdVertical from "../../components/AdVertical/AdVertical";
import EdussafyButton from "../../components/EdussafyButton/EdussafyButton";
import SweaButton from "../../components/SweaBtn/SweaButton";
import EduGrantsButton from "../../components/EduGrantButton/EduGrantsButton";
import BoardView from "../../components/BoardView/BoardView";
import WeatherinfoApi from "../../components/WeatherAPI/WeatherinfoApi";
import LunchCarousel from "../../components/LunchCarousel/LunchCarousel";
import ServerTime from "../../components/ServerTime/ServerTime"
import TopSpace from "../../components/TopSpace/TopSpace";

// best 게시물 아이콘
import { FaCrown } from "@react-icons/all-files/fa/FaCrown";

import { useEffect, useState } from 'react';
// import { bestPostsApi } from '../../api/boards'

export default function MainPage() {
  // const [ bestPosts, setbestPosts ] = useState("")

  // useEffect(() => {
  //   bestPostsApi
  //   .then((res) => setbestPosts(res))
  //   .catch((err) => console.log(err))
  // }, [])

  return (
    <section className={styles.mainPage}>
      <TopSpace />
      <div className={styles.topContainer}>
        <div className={styles.topLeftContainer}>
          <LunchCarousel />
        </div>
        <div className={styles.topRightContainer}>
          <div className={styles.userMainContainer}>
            <UserinfoBox />
          </div>
          <div className={styles.bannerContainer}>
            <EduGrantsButton />
            <EdussafyButton />
            <SweaButton />
          </div>
        </div>
      </div>
      <div className={styles.AdTimeContainer}>
        <div className={styles.horiAdContainer}>
          <AdHorizontal />
        </div>
        <div className={styles.serverTimeContainer}>
          <ServerTime />
        </div>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.bestBoard}>
          <div className={styles.bestTitle}>
            Best 게시글
            <FaCrown className={styles.bestIcons} />
          </div>
          {/* <BoardView posts={bestPosts}/> */}
        </div>
        <div className={styles.middleRightContainer}>
          <WeatherinfoApi />
          <AdVertical />
        </div>
      </div>
    </section>
  );
}
