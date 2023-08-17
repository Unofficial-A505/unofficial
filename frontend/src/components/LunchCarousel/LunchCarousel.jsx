/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./LunchCarousel.module.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from "./Carousel";
import customAxios from "../../util/customAxios";

export default function LunchCarousel({userLocal}) {
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
    const date = new Date();
    const offset = -9 * 60;
    const localOffset = date.getTimezoneOffset();
    const totalOffset = offset - localOffset;

    date.setMinutes(date.getMinutes() + totalOffset);

    let day = date.getDay();

    if (day === 0 || day === 6) {
      const daysToMonday = day === 0 ? 1 : 2;
      date.setDate(date.getDate() + daysToMonday);
    }

    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dayOfMonth = date.getDate();

    // "YYYYmmdd" format으로 맞추기 위해 앞에 0 붙이기
    if (month < 10) {
      month = "0" + month;
    }
    if (dayOfMonth < 10) {
      dayOfMonth = "0" + dayOfMonth;
    }

    return `${year}${month}${dayOfMonth}`;
  };
  // API 호출로 점심메뉴 데이터 가져오기
  const fetchLunchData = async () => {
    try {
      const today = getToday();
      let response = await customAxios.get(
        `${process.env.REACT_APP_SERVER}/api/lunch?date=${today}`
      );
      // 중복 데이터 제거
      if (response.data) {
        let seen = {};
        let uniqueData = response.data.filter((el) => {
          let duplicate = seen.hasOwnProperty(
            JSON.stringify({ ...el, id: undefined })
          );
          seen[JSON.stringify({ ...el, id: undefined })] = 0;
          return !duplicate;
        });

        // console.log("점심API", uniqueData);
        setLunchData(uniqueData);
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
    // userLocal과 일치하는 카드를 가장 앞으로 이동
    const matchingIndex = newCards.findIndex(
      (card) => card.content.key === userLocal
    );
    if (matchingIndex !== -1) {
      const matchingCard = newCards.splice(matchingIndex, 1)[0];
      newCards.unshift(matchingCard);
    }
    setCards(newCards);
  };

  return (
    <div className={styles.LunchCarousel}>
      <Carousel
        cards={cards}
        height="100%"
        width="95%"
        margin="0 auto"
        offset={1}
        showArrows={true ? cards.length > 1 : false}
      />
    </div>
  );
}
