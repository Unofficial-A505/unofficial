import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdHorizontal.module.css";
import customAxios from "../../util/customAxios";

export default function AdHorizontal() {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  useEffect(() => {
    // 광고 데이터 로드
    customAxios
      .get("/api/ads/active")
      //axios.get('http://localhost:8080/api/ads/active')
      .then((response) => {
        const activeAds = response.data;
        setAds(activeAds);

        // 랜덤하게 광고 선택
        const randomAd =
          activeAds[Math.floor(Math.random() * activeAds.length)];
        setSelectedAd(randomAd);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  const handleAdClick = () => {
    if (!selectedAd || !selectedAd.redirectUrl) return;

    let url = selectedAd.redirectUrl;
    if (!url.startsWith("https://")) {
      url = `https://${url}`;
    }

    window.open(url, "_blank"); // Use "_blank" to open in a new tab
  };
  return (
    <>
      <div className={styles.advertiseHo}>
        {selectedAd && (
          <div onClick={handleAdClick}>
            <img
              src={selectedAd.imagePath}
              alt="Ad"
              style={selectedAd.redirectUrl ? { cursor: "pointer" } : null}
            />
          </div>
        )}
      </div>
    </>
  );
}
