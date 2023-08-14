import React, { useState, useEffect } from "react";
import styles from "./AdHorizontal.module.css";
import customAxios from "../../util/customAxios";

export default function AdHorizontal() {
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => {
    // 광고 데이터 로드
    customAxios
      .get("/api/ads/active")
      .then((response) => {
        const activeAds = response.data;
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

    window.open(url, "_blank");
  };

  return (
    <>
      <div className={styles.advertiseHo}>
        {selectedAd && (
          <div onClick={handleAdClick} className={styles.adContainer}>
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
