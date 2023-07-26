import { useState, useEffect } from "react";
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";

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

  return (
    <div
      style={{ width: props.width, height: props.height, margin: props.margin }}
    >
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  );
}
