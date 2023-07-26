import styles from "./Card.module.css";
import { animated } from "react-spring";

export default function Card({ lunch }) {
  return (
    <animated.div className={styles.card}>
      <div className={styles.title}>
        <p>{lunch.local} 캠퍼스</p>
      </div>
      <div className={styles.menus}>
        <Menu lunch={lunch} />
        <Menu lunch={lunch} />
        <Menu lunch={lunch} />
      </div>
    </animated.div>
  );
}

function Menu({ lunch }) {
  const { name, cal } = extractNameAndCal(lunch.name);
  console.log("메뉴");

  return (
    <div className={styles.menu}>
      <img className={styles.cover} src={lunch.imageUrl} alt={name} />
      <div className="d-flex justify-content-between mb-1">
        <p>{lunch.courseName}</p>
        <p>{cal}kcal</p>
      </div>
      <h2 className="mb-1">{name}</h2>
      <p className={styles.detail}>{lunch.detail}</p>
    </div>
  );
}

// '만둣국 (1367)' => name:'만둣국', cal:'1367'로 parsing
function extractNameAndCal(str) {
  const regex = /(.+) \(([\d,]+)\)/;
  const match = str.match(regex);

  if (match) {
    const name = match[1].trim();
    const cal = match[2].trim();
    return { name, cal };
  }
  return { name: str, cal: null };
}
