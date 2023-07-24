import Styles from "./Card.module.css";
import { animated } from "react-spring";

export default function Card({meal}) {

  console.log(meal)
  return (
    <animated.div className={Styles.card}>
      <div className={Styles.title}>
        <p>{meal.local} 캠퍼스</p>
      </div>
      <div className={Styles.menus}>
        <Menu meal={meal}/>
        <Menu meal={meal}/>
        <Menu meal={meal}/>
      </div>
    </animated.div>
  );
}

// 만둣국 (1367) => name:'만둣국', cal:'1367'로 parsing 
function extractNameAndCal(str) {
  const regex = /(.+) \(([\d,]+)\)/
  const match = str.match(regex)

  if (match) {
    const name = match[1].trim();
    const cal = parseInt(match[2].replace(/,/g, ''));
    return { name, cal };
  }
  return { name: str, cal: null };
}

function Menu({meal}){

  const { name, cal } = extractNameAndCal(meal.name);

  return (
    <div className={Styles.menu}>
      <img className={Styles.cover} src={meal.imageUrl} alt={name} />
      <p>{meal.courseName}</p>
      <div className="d-flex justify-content-between">
        <h2>{name}</h2>
        <p>{cal}kcal</p>
      </div>
      <p>{meal.detail}</p>
    </div>
  )
}