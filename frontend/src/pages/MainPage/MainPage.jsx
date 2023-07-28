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

import TopSpace from "../../components/TopSpace/TopSpace";
import UnderSpace from "../../components/UnderSpace/UnderSpace";

// best 게시물 아이콘
import { FaCrown } from "@react-icons/all-files/fa/FaCrown";

export default function MainPage() {
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
      <div className={styles.horiAdContainer}>
        <AdHorizontal />
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.bestBoard}>
          <div className={styles.bestTitle}>
            Best 게시글
            <FaCrown className={styles.bestIcons} />
          </div>
          <BoardView />
        </div>
        <div className={styles.middleRightContainer}>
          <WeatherinfoApi />
          <AdVertical />
        </div>
      </div>
      <UnderSpace />
    </section>
  );
}
