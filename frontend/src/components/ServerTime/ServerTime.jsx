import styles from "./ServerTime.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ServerTime() {
  const [time, setTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone/asia/seoul", {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => new Date(data.datetime))
      .then((date) => setTime(date));

    const intervalId = setInterval(() => {
      setTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    // 컴포넌트 unmount시에 interval 정리
    return () => clearInterval(intervalId);
  }, [location]);

  const formatTime = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const closingTime =
      (hours === "17" && minutes === "59" && seconds >= "50") ||
      (hours === "18" && minutes === "00" && seconds <= "00");

    const redText = closingTime ? { color: "red" } : {};

    return (
      <div className={styles.serverTime}>
        <p>
          {month}월 {day}일
        </p>
        <h2 style={redText}>
          {hours}:{minutes}:{seconds}
        </h2>
      </div>
    );
  };

  return <div>{formatTime(time)}</div>;
}

export default ServerTime;
