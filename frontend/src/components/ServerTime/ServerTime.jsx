import styles from "./ServerTime.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ServerTime() {
  const [time, setTime] = useState(new Date());
  const location = useLocation();

  const fetchTime = () => {
    fetch("https://worldtimeapi.org/api/timezone/asia/seoul", {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => new Date(data.datetime))
      .then((date) => setTime(date));
  };

  useEffect(() => {
    fetchTime();

    const intervalId = setInterval(() => {
      setTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchTime();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [location]);

  const formatTime = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const dates = date.getDate().toString().padStart(2, "0");
    const day = date.getDay();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const closingTime =
      (hours === "17" && minutes === "59" && seconds >= "00") ||
      (hours === "18" && minutes === "00" && seconds <= "00");
    const redText = closingTime ? { color: "red" } : {};
    let remainingTime = "";

    if (hours >= "08" && hours < "18") {
      const now = date.getTime();
      const endOfDay = new Date(date);
      endOfDay.setHours(18, 0, 0);
      const diff = endOfDay.getTime() - now;
      const remainingHours = Math.floor(diff / (1000 * 60 * 60))
        .toString()
        .padStart(2, "0");
      const remainingMinutes = Math.floor((diff / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0");
      const remainingSeconds = Math.floor((diff / 1000) % 60)
        .toString()
        .padStart(2, "0");
      
      remainingTime = `${remainingHours}:${remainingMinutes}:${remainingSeconds}`;
    }

    return (
      <div className={styles.serverTime}>
        <p>
          {month}월 {dates}일
        </p>
        <h2 style={redText}>
          {hours}:{minutes}:{seconds}
        </h2>
        {remainingTime && day !== 0 && day !== 6 && (
          <p>
            퇴실까지{" "}
            <span style={closingTime ? { color: "red" } : { color: "#034BB9" }}>
              {remainingTime}
            </span>
          </p>
        )}
      </div>
    );
  };

  return <div>{formatTime(time)}</div>;
}

export default ServerTime;
