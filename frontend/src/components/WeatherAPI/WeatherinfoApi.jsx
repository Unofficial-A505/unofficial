/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./WeatherinfoApi.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function WeatherWidget({ userLocal }) {
  const korToEng = {
    서울: "Seoul",
    대전: "Daejeon",
    구미: "Gumi",
    광주: "Gwangju",
    부산: "Busan",
  };
  const userLocalEng = korToEng[userLocal];
  let cities = ["Seoul", "Daejeon", "Gumi", "Gwangju", "Busan"];
  const api_key = "be3211008c87f453651f5f04faa61375";
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    fetchWeatherData();
  }, [userLocal]);

  const fetchWeatherData = async () => {
    const data = await Promise.all(cities.map(getWeather));
    const index = data.findIndex((item) => item.city.name === userLocalEng);

    if (index !== -1) {
      const matchedCity = data.splice(index, 1)[0];
      data.unshift(matchedCity);
    }
    setWeatherData(data);
  };

  const getWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?appid=${api_key}&q=${city}&units=metric&lang=kr&cnt=5`
      );
      return response.data;
    } catch (error) {
      console.error("날씨 정보를 가져오는데 실패했습니다.", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className={styles.weatherApiContainer}>
      {!weatherData.length ? (
        <div className={styles.weatherCardContainer}>
          <p>날씨 정보를 가져오는 중입니다...</p>
        </div>
      ) : (
        <Slider {...settings}>
          {weatherData.map((data, index) => (
            <WeatherCard key={index} data={data} />
          ))}
        </Slider>
      )}
    </div>
  );
}

const WeatherCard = ({ data }) => {
  const indices = [0, 1, 2, 3];
  const img_url = "https://openweathermap.org/img/wn/";

  const times = indices.map((i) => {
    const date = new Date(data.list[i].dt_txt);
    date.setHours(date.getHours() + 6);
    return date.getHours() + "시";
  });

  const temps = indices.map((i) => {
    return Math.round(data.list[i].main.temp * 10) / 10 + "°C";
  });

  const images = indices.map((i) => {
    return img_url + data.list[i].weather[0].icon + "@2x.png";
  });

  return (
    <div className={styles.weatherCardContainer}>
      <div className={styles.upperContainer}>
        <div className={styles.title}>
          {data.city.name === "Seoul" && <p>서울</p>}
          {data.city.name === "Busan" && <p>부산</p>}
          {data.city.name === "Gwangju" && <p>광주</p>}
          {data.city.name === "Gumi" && <p>구미</p>}
          {data.city.name === "Daejeon" && <p>대전</p>}
        </div>
        <div className="d-flex">
          <img
            src={images[0]}
            alt={data.list[0].weather[0].description}
            width={100}
          />
          <div className="d-flex flex-column justify-content-center text-start">
            <p className="m-0 fs-2">{temps[0]}</p>
            <p className="m-0 fs-6">{data.list[0].weather[0].description}</p>
          </div>
        </div>
      </div>
      <div className={styles.downContainer}>
        {[1, 2, 3].map((idx) => {
          return (
            <Forecast
              times={times}
              images={images}
              temps={temps}
              idx={idx}
              key={idx}
            />
          );
        })}
      </div>
    </div>
  );
};

const Forecast = ({ times, images, temps, idx }) => {
  return (
    <div className={styles.forecastWather}>
      <p>{times[idx]}</p>
      <img src={images[idx]} alt={"날씨" + idx} />
      <p>{temps[idx]}</p>
    </div>
  );
};
