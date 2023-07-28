import styles from "./WeatherinfoApi.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const api_key = "be3211008c87f453651f5f04faa61375";
const city_name = "Seoul,KR"; // 역삼역의 위치를 나타내는 도시 이름으로 변경해주세요.

export default function WeatherinfoApi() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherForecast();
  }, []);

  const fetchWeatherForecast = async () => {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            appid: api_key,
            q: city_name,
            units: "metric", // Celsius
            lang: "kr",
          },
        }
      );
      const forecast = response.data.list;
      console.log(forecast);

      // 현재 시간 구하기 (UTC 기준)
      const now = new Date();

      // 10~12시간 후까지의 날씨 정보 필터링
      const filteredForecast = forecast.filter((entry) => {
        const dt = new Date(entry.dt * 1000); // API에서 제공하는 시간 단위 변환
        return (
          now.getTime() + 10 * 60 * 60 * 1000 <= dt.getTime() &&
          dt.getTime() <= now.getTime() + 12 * 60 * 60 * 1000
        );
      });

      setWeatherData(filteredForecast);
      setLoading(false);
    } catch (error) {
      console.error("날씨 정보를 가져오는데 실패했습니다.", error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>역삼역 날씨</h1>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData.length > 0 ? (
        <div>
          <h2>향후 10~12시간 날씨 예보</h2>
          {weatherData.map((entry) => (
            <p key={entry.dt}>{`${new Date(
              entry.dt * 1000
            ).toLocaleTimeString()} - 기온: ${entry.main.temp}°C, 날씨: ${
              entry.weather[0].description
            }`}</p>
          ))}
        </div>
      ) : (
        <p>날씨 정보를 가져오는데 실패했습니다.</p>
      )}
    </div>
  );
}
