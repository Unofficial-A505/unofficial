import React, { useState } from 'react';
import styles from './NewCarousel.module.css';

export default function NewCarousel(props) {
const [cards] = useState([ // 예시로 만든 카드 배열입니다. 실제 사용시에는 cards 상태를 사용하실 수 있습니다.
    { key: '1', content: 'Card 1' },
    { key: '2', content: 'Card 2' },
    { key: '3', content: 'Card 3' },
  ]);
  const [rotate, setRotate] = useState(0);

  const handleNext = () => {
    setRotate(rotate - 360 / cards.length);
  };

  const handlePrev = () => {
    setRotate(rotate + 360 / cards.length);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel3d} style={{ transform: `rotateY(${rotate}deg)` }}>
        {cards.map((card, index) => (
          <div className={styles.carouselCard} key={card.key} style={{ transform: `rotateY(${index * 360 / cards.length}deg)` }}>
            {card.content}
          </div>
        ))}
      </div>
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}