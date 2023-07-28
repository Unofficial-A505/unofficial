import styles from "./LunchCarousel.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from "./Carousel";

export default function LunchCarousel() {
  const [cards, setCards] = useState([]);
  const [lunchData, setLunchData] = useState([]);

  useEffect(() => {
    fetchLunchData();
  }, []);

  useEffect(() => {
    if (lunchData.length) {
      const localLunchData = groupByLocal(lunchData);
      createCards(localLunchData);
    }
  }, [lunchData]);

  // 오늘 날짜 가져오기
  const getToday = () => {
    const newDate = new Date();
    const day = newDate.getDay();
    
    // 주말이면 월요일로 날짜를 조정
    if (day === 0 || day === 6) {
      const adjust = day === 6 ? 2 : 1;
      newDate.setDate(newDate.getDate() + adjust);
    }
  
    const year = newDate.getFullYear().toString();
    let month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    let date = newDate.getDate().toString().padStart(2, "0");
    console.log(`${year}${month}${date}`)
    return `${year}${month}${date}`;
  };

  // API 호출로 점심메뉴 데이터 가져오기
  const fetchLunchData = async () => {
    try {
      const today = getToday();
      let response = await axios.get(
        // "https://unofficial.kr/api/lunch?date=20230728"
        `https://unofficial.kr/api/lunch?date=${today}`
      );
      console.log("점심API", response.data);
      if (response.data) {
        setLunchData(response.data);
      } else {
        alert("아직 밥 정보 없음");
      }
    } catch (error) {
      console.log("점심API", error);
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
        content: <Card lunchZip={data} key={data[0].local} />,
      };
    });

    setCards(newCards);
  };

  return (
    <div className={styles.LunchCarousel}>
      <Carousel
        cards={cards}
        height="100%"
        width="90%"
        margin="0 auto"
        offset={1}
        showArrows={false}
      />
    </div>
  );
}
