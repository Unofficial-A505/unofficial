import styles from "./LunchCarousel.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from "./Carousel";

export default function LunchCarousel() {
  const [cards, setCards] = useState([]);
  const [lunchData, setLunchData] = useState([]);

  // 오늘 날짜 가져오기
  const getTodayDate = () => {
    const newDate = new Date();
    const year = newDate.getFullYear().toString();
    let month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    let date = newDate.getDate().toString().padStart(2, "0");
    return `${year}${month}${date}`;
  };

  // API 호출로 점심메뉴 데이터 가져오기
  const fetchLunchData = async () => {
    try {
      const today = getTodayDate();
      let response = await axios.get(
        "https://unofficial.kr/api/lunch?date=20230731"
        // `https://unofficial.kr/api/lunch?date=${today}`
      );
      console.log("API호출", response.data);
      if (response.data) {
        setLunchData(response.data);
      } else {
        alert("아직 밥 정보 없음");
      }
    } catch (error) {
      console.log("API 호출 요류", error);
    }
  };

  // 지역별 식단 정보 나눠 저장하기
  const groupByLocal = (lunchData) => {
    let localData = {};

    lunchData.forEach((lunch) => {
      if (!localData[lunch.local]) {
        localData[lunch.local] = [lunch];
      } else {
        localData[lunch.local].push(lunch);
      }
    });

    // localData의 value 값들을 localLunchData에 담기
    let localLunchData = [].concat(Object.values(localData));

    return localLunchData;
  };

  // 지역별 식단메뉴 카드 만들기
  const createCards = (localLunchData) => {
    const newCards = localLunchData.map((data) => {
      return {
        key: uuidv4(),
        content: <Card lunchZip={data} />,
      };
    });
    console.log("newCards", newCards);
    setCards(newCards);
  };

  useEffect(() => {
    fetchLunchData();
  }, []);

  useEffect(() => {
    if (lunchData.length) {
      const localLunchData = groupByLocal(lunchData);
      createCards(localLunchData);
    }
  }, [lunchData]);

  return (
    <div className={styles.LunchCarousel}>
      <Carousel
        cards={cards}
        height="500px"
        width="70%"
        margin="0 auto"
        offset={1}
        showArrows={false}
      />
    </div>
  );
}
