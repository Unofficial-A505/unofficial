import styles from './Meal.module.css'
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from "./Carousel";

export default function Meal() {
  let meals = [
    {
      "id": 0,
      "date": "20230724",
      "restaurantId": "REST000133",
      "imageUrl": "http://samsungwelstory.com/data/manager/recipe/E110/20230724/s20230704181635.jpg",
      "name": "만둣국 (1,367kcal)",
      "detail": "만둣국,현미밥,오징어김치전,시래기된장조림,도라지오이생채,소떡소떡꼬치,깍두기,오미자차",
      "likes": 2,
      "local": "서울",
      "courseName": "A:한식"
    },
    {
      "id": 1,
      "date": "20230724",
      "restaurantId": "REST000133",
      "imageUrl": "http://samsungwelstory.com/data/manager/recipe/E110/20230724/s20220829181739.png",
      "name": "짬뽕밥 (1,634kcal)",
      "detail": "짬뽕밥,강황탕수육,소떡소떡꼬치,게맛살겨자냉채,짜사이채무침,김치,오미자차",
      "likes": 0,
      "local": "서울",
      "courseName": "B:일품"
    },
    {
      "id": 2,
      "date": "20230724",
      "restaurantId": "REST000133",
      "imageUrl": "http://samsungwelstory.com/data/manager/recipe/E110/20230724/s20230704181635.jpg",
      "name": "만둣국 (1,367kcal)",
      "detail": "만둣국,현미밥,오징어김치전,시래기된장조림,도라지오이생채,소떡소떡꼬치,깍두기,오미자차",
      "likes": 2,
      "local": "서울",
      "courseName": "A:한식"
    },
    {
      "id": 3,
      "date": "20230724",
      "restaurantId": "REST000133",
      "imageUrl": "http://samsungwelstory.com/data/manager/recipe/E110/20230724/s20220829181739.png",
      "name": "짬뽕밥 (1,634kcal)",
      "detail": "짬뽕밥,강황탕수육,소떡소떡꼬치,게맛살겨자냉채,짜사이채무침,김치,오미자차",
      "likes": 0,
      "local": "서울",
      "courseName": "B:일품"
    },
    {
      "id": 4,
      "date": "20230724",
      "restaurantId": "REST000133",
      "imageUrl": "http://samsungwelstory.com/data/manager/recipe/E110/20230724/s20230704181635.jpg",
      "name": "만둣국 (1,367kcal)",
      "detail": "만둣국,현미밥,오징어김치전,시래기된장조림,도라지오이생채,소떡소떡꼬치,깍두기,오미자차",
      "likes": 2,
      "local": "서울",
      "courseName": "A:한식"
    },
  ]
 
  let cards = []
  
  meals.map((meal)=>{
    return cards.push({
      key: uuidv4(),
      content: (
      <Card meal={meal} />
      )
    })
  })

  return (
    <div className={styles.Meal}>
      <Carousel
        cards = {cards}
        height="500px"
        width="50%"
        margin="0 auto"
        offset={2}
        showArrows={false}
    />
    </div>
  );
}
