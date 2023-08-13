import styles from "./Card.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import customAxios from "./../../util/customAxios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import lunch_loading from "./../../assets/images/lunch_loading.jpg";
import spoon from "./../../assets/images/spoon.png";
import IconButton from "@mui/joy/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

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
        <p style={{ alignSelf: "center" }}>
          <img src={spoon} alt="spoon" width={22} />
        </p>
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
  const authUser = useSelector((state) => state.authUser);
  const { name, cal } = extractNameCal(menu.name);
  const { likeCnt, setLikeCnt } = useState(0);
  const [isLunchLoading, setIsLunchLoading] = useState(false);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = lunch_loading;
    setIsLunchLoading(true);
  };

  const likeMenu = () => {
    if (!authUser.accessToken) {
      alert("로그인 후 이용해 주세요.");
      return;
    }

    customAxios
      .post(`${process.env.REACT_APP_SERVER}/api/lunch/like/${menu.id}`)
      .then((res) => {
        setLikeCnt(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.menu}>
      <div className={styles.imageContainer}>
        <IconButton
          onClick={likeMenu}
          variant="plain"
          sx={{
            "--IconButton-size": "30px",
          }}
          className={styles.likeButton}
        >
          <FavoriteBorder />
        </IconButton>
        <img
          src={menu.imageUrl}
          onError={handleImageError}
          alt={name}
          className={isLunchLoading ? styles.lunchLoading : ""}
        />
        <p className={styles.likeCount}>{likeCnt}</p>
      </div>
      <div className={styles.textContainer}>
        <div className="d-flex justify-content-between mb-2">
          <p>{menu.courseName}</p>
          <p style={{ color: cal.length > 3 ? "#c90000" : "#0055c5" }}>
            {cal}kcal
          </p>
        </div>
        <h2
          className="mb-1"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </h2>
        <p className={styles.detail}>{menu.detail}</p>
      </div>
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
