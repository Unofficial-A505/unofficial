import { useState, useEffect } from "react";
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Carroussel(props) {
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);

    const table = props.cards.map((element, index) => {
      return { ...element, onClick: () => setGoToSlide(index) };
    });
    setCards(table);
  }, [props.offset, props.showArrows, props.cards]);

  const moveForward = () => {
    if (cards.length) {
      setGoToSlide((goToSlide + 1) % cards.length);
    }  
  };

  const moveBackward = () => {
    if (cards.length) {
      setGoToSlide((goToSlide - 1 + cards.length) % cards.length);
    }  
  };

  return (
    <div
      style={{
        position: "relative",
        width: props.width,
        height: props.height,
        margin: props.margin,
      }}
    >
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Carousel
          slides={cards}
          goToSlide={goToSlide}
          offsetRadius={offsetRadius}
          showNavigation={false}
          animationConfig={config.gentle}
        />
      </div>
      {showArrows && (
        <button
          onClick={moveBackward}
          style={{
            position: "absolute",
            left: 20,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "3em",
            color: "#000",
            cursor: "pointer",
          }}
        >
          <IoIosArrowBack />
        </button>
      )}
      {showArrows && (
        <button
          onClick={moveForward}
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "3em",
            color: "#000",
            cursor: "pointer",
          }}
        >
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
}
