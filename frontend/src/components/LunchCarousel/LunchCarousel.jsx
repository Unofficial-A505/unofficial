import styles from "./LunchCarousel.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from "./Carousel";

export default function LunchCarousel() {
  // let [lunchInfo, setLunchInfo] = useState([]);
  const [cards, setCards] = useState([]);
  const [today, setToday] = useState("");

  // 오늘 날짜 구하기
  useEffect(() => {
    const newDate = new Date();
    const year = newDate.getFullYear().toString();
    let month = (newDate.getMonth() + 1).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    const date = newDate.getDate().toString();
    const todayDate = year + month + date;
    setToday(todayDate);
  }, []);

  // 점심 메뉴 가져오기
  useEffect(() => {
    const fetchLunchInfo = async () => {
      try {
        const response = await axios.get(
          "https://unofficial.kr/api/lunch?date=20230731"
          // `https://unofficial.kr/api/lunch?date=${today}`
        );

        const lunchData = response.data;

        // 지역별 식단 카드 만들기
        const cardsByLocal = {};
        lunchData.forEach((lunch) => {
          if (!cardsByLocal[lunch.local]) {
            cardsByLocal[lunch.local] = [];
          }

          cardsByLocal[lunch.local].push({
            key: lunch.id,
            content: <Card lunch={lunch} />,
          });
        });
        // 지역별 카드를 하나의 배열로 합치기
        const mergedCards = Object.values(cardsByLocal).flat();

        // 카드 업데이트
        setCards(mergedCards);

        // // 카드에 파싱하기
        // const newCards = lunchInfo.map((lunch) => ({
        //   key: uuidv4(),
        //   content: <Card lunch={lunch} />,
        // }));
        //
        // setCards(newCards);
      } catch (err) {
        console.log(err);
      }
    };
    if (today) {
      fetchLunchInfo();
    }
  }, [today]);

  console.log("cards", cards);

  return (
    <div className={styles.LunchCarousel}>
      <Carousel
        cards={cards}
        height="500px"
        width="50%"
        margin="0 auto"
        offset={2}
        showArrows={false}
      />
    </div>
  );
}
