/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./MainPage.module.css";
import BoardView from "../../components/BoardView/BoardView";
import UserinfoBox from "../../components/UserinfoBox/UserinfoBox";
import AdHorizontal from "../../components/AdHorizontal/AdHorizontal";
import AdVertical from "../../components/AdVertical/AdVertical";
import EdussafyButton from "../../components/EdussafyButton/EdussafyButton";
import SweaButton from "../../components/SweaBtn/SweaButton";
import EduGrantsButton from "../../components/EduGrantButton/EduGrantsButton";
import WeatherinfoApi from "../../components/WeatherAPI/WeatherinfoApi";
import LunchCarousel from "../../components/LunchCarousel/LunchCarousel";
import ServerTime from "../../components/ServerTime/ServerTime";
import TopSpace from "../../components/TopSpace/TopSpace";
import PostTypeTitleBar from "../../components/PostTypeTitleBar/PostTypeTitleBar";

import useDocumentTitle from "../../useDocumentTitle";

import { FaCrown } from "@react-icons/all-files/fa/FaCrown";

import { useEffect, useState } from "react";
import { bestPostsApi } from "../../api/boards";
import { useSelector } from "react-redux";
import customAxios from "../../util/customAxios";

export default function MainPage() {
  useDocumentTitle("언오피셜");

  const [bestPosts, setbestPosts] = useState("");
  const authUser = useSelector((state) => state.authUser);
  const [userInfo, setUserInfo] = useState({});

  const getUserData = async () => {
    try {
      const response = await customAxios.get("/api/users/user");
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user role", error);
    }
  };

  useEffect(() => {
    bestPostsApi()
      .then((res) => {
        setbestPosts(
          res.map((obj) => {
            obj.id = obj.articleId;
            return obj;
          })
        );
      })
      .catch((err) => console.log(err));

    if (authUser.accessToken) {
      getUserData();
    }
  }, []);

  return (
    <section className={styles.mainPage}>
      <TopSpace />
      <div className={styles.topContainer}>
        <div className={styles.topLeftContainer}>
          <LunchCarousel userLocal={userInfo?.local} />
        </div>
        <div className={styles.topRightContainer}>
          <div className={styles.userMainContainer}>
            <UserinfoBox userInfo={userInfo} />
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
          <div className={styles.posttypeTitlebarBox}><PostTypeTitleBar /></div>
          <BoardView posts={bestPosts?.slice(0, 14)} myBoard={true} IsAuth={authUser.accessToken}/>
        </div>
        <div className={styles.middleRightContainer}>
          <WeatherinfoApi userLocal={userInfo?.local} />
          <AdVertical />
        </div>
      </div>
    </section>
  );
}
