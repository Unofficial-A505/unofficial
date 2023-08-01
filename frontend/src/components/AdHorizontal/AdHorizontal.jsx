import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdHorizontal.module.css'

export default function AdHorizontal() {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const handleClickAd = (redirectUrl) => {
    // 클릭한 광고의 redirectUrl로 이동
    window.location.href = redirectUrl;
  }
  useEffect(() => {
    // 광고 데이터 로드
    axios.get('http://localhost:8080/api/ads/active')
      .then(response => {
        const activeAds = response.data;
        setAds(activeAds);

        // 랜덤하게 광고 선택
        const randomAd = activeAds[Math.floor(Math.random() * activeAds.length)];
        setSelectedAd(randomAd);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);
  const handleAdClick = () => {
    if (!selectedAd || !selectedAd.redirectUrl) return;

    let url = selectedAd.redirectUrl;
    if (!url.startsWith('https://')) {
      url = `https://${url}`;
    }

    window.location.href = url;
};
  return (
    <>
      <div className={styles.advertiseHo}>
        {selectedAd && (
          <div onClick={handleAdClick}>
            <img src={selectedAd.imagePath} alt="Ad" style={{cursor: 'pointer'}}/>
          </div>
        )}
      </div>
    </>
  );
}
