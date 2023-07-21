import Styles from "./Card.module.css";
import { animated } from "react-spring";

export default function Card({meal}) {
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

function Menu({meal}){
  return (
    <div className={Styles.menu}>
      <img className={Styles.cover} src={meal.imageUrl} alt={meal.name} />
      <h2>{meal.name}</h2>
      <p>{ meal.detail}</p>
    </div>
  )
}