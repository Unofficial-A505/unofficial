import styles from "./Card.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import lunch_loading from "./../../assets/images/lunch_loading.jpg";

export default function Card({ lunchZip }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <p>{lunchZip[0].local} 캠퍼스</p>
      </div>
      <Slider {...settings}>
        {lunchZip.map((menu, menuIndex) => (
          <div key={menuIndex}>
            <Menu menu={menu} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function Menu({ menu }) {
  const { name, cal } = extractNameCal(menu.name);

  return (
    <div className={styles.menu}>
      <img
        style={{ objectFit: "cover" }}
        src={menu.imageUrl}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = lunch_loading;
        }}
        alt={name}
      />
      <div className="d-flex justify-content-between mb-1">
        <p>{menu.courseName}</p>
        <p>{cal}kcal</p>
      </div>
      <h2 className="mb-1">{name}</h2>
      <p className={styles.detail}>{menu.detail}</p>
    </div>
  );
}

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
