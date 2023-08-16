import styles from "./Card.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import customAxios from "./../../util/customAxios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import lunch_loading from "./../../assets/images/lunch_loading.jpg";
import spoon from "./../../assets/images/spoon.png";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  const [likesCnt, setLikesCnt] = useState(menu.likes);
  const [noMenuImg, setNoMenuImg] = useState(false);
  const [isLike, setIsLike] = useState(menu.isLike);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = lunch_loading;
    setNoMenuImg(true);
  };

  const likeMenu = () => {
    if (!authUser.accessToken) {
      alert("로그인 후 이용해 주세요.");
      return;
    }

    if (!isLike) {
      customAxios
        .post(`${process.env.REACT_APP_SERVER}/api/lunch/like/${menu.id}`)
        .then((res) => {
          setLikesCnt(res.data);
          setTimeout(() => setIsLike(!isLike), 300);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      customAxios
        .delete(`${process.env.REACT_APP_SERVER}/api/lunch/dislike/${menu.id}`)
        .then((res) => {
          setLikesCnt(res.data);
          setIsLike(!isLike);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.menu}>
      <div className={styles.imageContainer}>
        <img
          src={menu.imageUrl}
          onError={handleImageError}
          alt={name}
          className={noMenuImg ? styles.lunchLoading : ""}
        />
      </div>
      <div className={styles.textContainer}>
        <div className="d-flex justify-content-between mb-2">
          <p>{menu.courseName}</p>
          <p style={{ color: cal.length > 3 ? "#c90000" : "#0055c5" }}>
            {cal}kcal
          </p>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <h2
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </h2>
          <div onClick={likeMenu} className={styles.likeButton}>
            {isLike ? (
              <FavoriteIcon
                style={{ width: "1.2rem", height: "1.2rem", color: "red" }}
              />
            ) : (
              <lord-icon
                src="https://cdn.lordicon.com/pnhskdva.json"
                trigger="click"
                colors="primary:#e83a30"
                state="morph"
                style={{ width: "1.2rem", height: "1.2rem" }}
              ></lord-icon>
            )}
            <p>{likesCnt}</p>
          </div>
        </div>
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
