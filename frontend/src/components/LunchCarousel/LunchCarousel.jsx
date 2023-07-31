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
    let today = new Date();
    // 주말이면 월요일로 조정
    if (today.getDay() === 6 || today.getDay() === 0) {
      const adjust = today.getDay() === 6 ? 2 : 1;
      today.setDate(today.getDate() + adjust);
    }

    let todayStr = today.toISOString().split("T")[0].replace(/-/g, "");

    return todayStr;
  };

  // API 호출로 점심메뉴 데이터 가져오기
  const fetchLunchData = async () => {
    try {
      const today = getToday();
      let response = await axios.get(
        `https://unofficial.kr/api/lunch?date=${today}`
      );
      // 중복 데이터 제거
      if (response.data) {
        let seen = {};
        let uniqueData = response.data.filter(el => {
          let duplicate = seen.hasOwnProperty(JSON.stringify({ ...el, id: undefined }));
          seen[JSON.stringify({ ...el, id: undefined })] = 0;
          return !duplicate;
        });

        setLunchData(uniqueData);
        console.log("점심API", uniqueData);
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
        localData[lunch.local] = [];
      }
      localData[lunch.local].push(lunch);
    });

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
