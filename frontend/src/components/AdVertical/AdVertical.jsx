import styles from "./AdVertical.module.css";
import { useEffect } from "react";

export default function AdVertical() {
  useEffect(() => {
    // 카카오 애드핏 스크립트 로딩
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <ins
        className="kakao_ad_area"
        style={{ display: "block" }}
        data-ad-unit="DAN-zMXaxPxHgYpyVua6"
        data-ad-width="300"
        data-ad-height="250"
      ></ins>
    </>
  );
}
