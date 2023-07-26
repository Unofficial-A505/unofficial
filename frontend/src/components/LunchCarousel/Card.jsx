import styles from "./Card.module.css";
import { animated } from "react-spring";

export default function Card({ lunchZip }) {
  console.log('카드컴포', {lunchZip})
  return (
    <animated.div className={styles.card}>
      <div className={styles.title}>
        <p>{lunchZip[0].local} 캠퍼스</p>
      </div>
      <div className={styles.menus}>
        {
          lunchZip.map((menu) => {
            return <Menu menu={menu} />;
          })
        }
      </div>
    </animated.div>
  );
}

function Menu({ menu }) {
  const { name, cal } = extractNameCal(menu.name);

  return (
    <div className={styles.menu}>
      <img className={styles.cover} src={menu.imageUrl} alt={name} />
      <div className="d-flex justify-content-between mb-1">
        <p>{menu.courseName}</p>
        <p>{cal}kcal</p>
      </div>
      <h2 className="mb-1">{name}</h2>
      <p className={styles.detail}>{menu.detail}</p>
    </div>
  );
}

// '만둣국 (1367)' => name:'만둣국', cal:'1367'로 parsing
function extractNameCal(string) {
  const regex = /(.+) \(([\d,]+)\)/;
  const match = string.match(regex);

  if (match) {
    const name = match[1].trim();
    const cal = match[2].trim();
    return { name, cal };
  }
  return { name: string, cal: null };
}
