import styles from "./LunchCarousel.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from "./Carousel";

export default function LunchCarousel() {

  // let cards = []
  const [cards, setCards] = useState([]);
  // const [lunchData, setLunchData] = useState([]);

  // // 오늘 날짜 가져오기
  // const getTodayDate = () => {
  //   const newDate = new Date();
  //   const year = newDate.getFullYear().toString();
  //   let month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  //   let date = newDate.getDate().toString().padStart(2, '0');
  //   return `${year}${month}${date}`;
  // };

  // // API 호출로 점심메뉴 데이터 가져오기
  // const fetchLunchData = async () => {
  //   try {
  //     const today = getTodayDate();
  //     const response = await axios.get(
  //       "https://unofficial.kr/api/lunch?date=20230731"
  //       // `https://unofficial.kr/api/lunch?date=${today}`
  //     );
  //     setLunchData(response.data);
  //   } catch (error) {
  //     console.log('API 호출 요류', error);
  //   }
  // };

  // 지역별 식단 정보 나눠 저장하기
  const groupByLocal = (lunchData) => {
    const localLunchData = [[], [], [], [], []];

    lunchData.forEach((lunch) => {
      switch (lunch.local) {
        case '서울':
          localLunchData[0].push(lunch);
          break;
        case '광주':
          localLunchData[1].push(lunch);
          break;
        case '구미':
          localLunchData[2].push(lunch);
          break;
        case '대전':
          localLunchData[3].push(lunch);
          break;
        case '부울경':
          localLunchData[4].push(lunch);
          break;
        default:
          break;
      }
    });
    return localLunchData;
  };

  // 지역별 식단메뉴 카드 만들기
  const createCards = (localLunchData) => {
    console.log('createCards', localLunchData);
    const newCards = localLunchData.map((data) => {
      return {
        key : uuidv4(),
        content : (
          <Card lunchZip={data} key={data[0].id} />
        )
      };
    });

    setCards(newCards);
  };
  console.log('cards', cards);

  useEffect(() => {
    let lunchData = [
      {
        "id": 1,
        "date": "20230731",
        "restaurantId": "REST000133",
        "imageUrl": "http://samsungwelstory.com/data/manager/recipe/main/100026/1281.png",
        "name": "돼지갈비찜 (1,045)",
        "detail": "돼지갈비찜,흑미밥,비지찌개,잡채,오이양파무침,깍두기,ICE초코",
        "likes": 0,
        "local": "서울",
        "courseName": "A:한식"
      },
      {
        "id": 2,
        "date": "20230731",
        "restaurantId": "REST000133",
        "imageUrl": "http://samsungwelstory.com/data/manager/recipe/E110/20230731/s20221007145950.png",
        "name": "왕새우튀김우동 (1,272)",
        "detail": "왕새우튀김우동,오복지볶음밥,핫도그,음료,코올슬로,매운미역오이초무침,김치,ICE초코",
        "likes": 0,
        "local": "서울",
        "courseName": "B:일품"
      },
      {
        "id": 3,
        "date": "20230731",
        "restaurantId": "REST000133",
        "imageUrl": "http://samsungwelstory.com/data/manager/recipe/main/100026/1281.png",
        "name": "돼지갈비찜 (1,045)",
        "detail": "돼지갈비찜,흑미밥,비지찌개,잡채,오이양파무침,깍두기,ICE초코",
        "likes": 0,
        "local": "대전",
        "courseName": "A:한식"
      },
      {
        "id": 4,
        "date": "20230731",
        "restaurantId": "REST000133",
        "imageUrl": "http://samsungwelstory.com/data/manager/recipe/E110/20230731/s20221007145950.png",
        "name": "왕새우튀김우동 (1,272)",
        "detail": "왕새우튀김우동,오복지볶음밥,핫도그,음료,코올슬로,매운미역오이초무침,김치,ICE초코",
        "likes": 0,
        "local": "구미",
        "courseName": "B:일품"
      },
      {
        "id": 5,
        "date": "20230731",
        "restaurantId": "REST000133",
        "imageUrl": "http://samsungwelstory.com/data/manager/recipe/main/100026/1281.png",
        "name": "돼지갈비찜 (1,045)",
        "detail": "돼지갈비찜,흑미밥,비지찌개,잡채,오이양파무침,깍두기,ICE초코",
        "likes": 0,
        "local": "부울경",
        "courseName": "A:한식"
      },
      {
        "id": 6,
        "date": "20230731",
        "restaurantId": "REST000133",
        "imageUrl": "http://samsungwelstory.com/data/manager/recipe/E110/20230731/s20221007145950.png",
        "name": "왕새우튀김우동 (1,272)",
        "detail": "왕새우튀김우동,오복지볶음밥,핫도그,음료,코올슬로,매운미역오이초무침,김치,ICE초코",
        "likes": 0,
        "local": "광주",
        "courseName": "B:일품"
      },
    ]
    // fetchLunchData();
    const localLunchData = groupByLocal(lunchData);
    createCards(localLunchData);
  }, []);

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
