import styles from "./WeatherinfoApi.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const cities = ["Seoul", "Daejeon", "Gumi", "Gwangju", "Busan"];
const api_key = "be3211008c87f453651f5f04faa61375";

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await Promise.all(cities.map(getWeather));
      setWeatherData(data);
    };

    fetchWeatherData();
  }, []);

  const getWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?appid=${api_key}&q=${city}&units=metric&lang=kr`
      );
      console.log(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("날씨 정보를 가져오는데 실패했습니다.", error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.WeatherapiContainer}>
      <div className={styles.temp}>
        <Carousel>
          {weatherData.map((data, index) => (
            <WeatherCard key={index} data={data} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

const WeatherCard = ({ data }) => {
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
            src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}
            alt="날씨이모티콘"
          />
          <div className="d-flex flex-column justify-content-center text-start">
            <p className="m-0 fs-2">{data.list[0].main.temp}°C</p>
            <p className="m-0 fs-6">{data.list[0].weather[0].description}</p>
          </div>
        </div>
      </div>
      <div className={styles.downContainer}>
        <div className={styles.forecastWather}>
          <p>{data.list[1].dt_txt}</p>
          <img 
            src={`https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`} 
            alt="날씨이모티콘"
            width="4"
          />
          <p>{data.list[1].main.temp}°C</p>
        </div>
        <div className={styles.forecastWather}>
        <p>{data.list[2].dt_txt}</p>
          <img 
            src={`https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`} 
            alt="날씨이모티콘"
            width="4"
          />
          <p>{data.list[2].main.temp}°C</p>
        </div>
        <div className={styles.forecastWather}>
        <p>{data.list[3].dt_txt}</p>
          <img 
            src={`https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`} 
            alt="날씨이모티콘"
            width="4"
          />
          <p>{data.list[3].main.temp}°C</p>
        </div>
      </div>
    </div>
  );
};
