import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";
import pic1 from './../../assets/images/식단1.jpg'
import pic2 from './../../assets/images/식단2.jpg'
import pic3 from './../../assets/images/식단3.jpg'
import pic4 from './../../assets/images/식단4.jpg'
import pic5 from './../../assets/images/식단5.jpg'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";


const images = [pic1, pic2, pic3, pic4, pic5]

const NextArrow = ({ onClick }) => {
  return (
    <div className={`${styles.arrow} ${styles.next}`} onClick={onClick}>
      <FaArrowRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className={`${styles.arrow} ${styles.prev}`} onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
};

const Carousel = () => {
  const [imgIndex, setImgIndex] = React.useState(0);

  const settings = {
    className: styles.carouselContainer,
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    speed: 200,
    dots: true,
    // autoplay: true,
    focusOnSelect: true,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImgIndex(next),
  };

  return (
    <div>
      <h1>3D Carousel</h1>
      <Slider {...settings}>
        {images.map((imgUrl, index) => (

          <div key={index} 
          className={`${
            index === imgIndex ? styles.carouselSlide : styles.carouselSlide
          }`}
          >
          <img src={imgUrl} alt={`Slide ${index + 1}`} />
          </div>

        ))}
      </Slider>
    </div>
  );
};

export default Carousel;