import React, { useState, useEffect } from "react";
import styles from "./WeatherWidget.module.css";
import Tabs from "./Tabs";

const WeatherWidget = () => {
  const [selectedCity, setSelectedCity] = useState("서울");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getWeatherData(selectedCity)
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error:", error));
  }, [selectedCity]);

  const getWeatherData = async (city) => {
    const apiKey = "be3211008c87f453651f5f04faa61375";
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  const cities = ["서울", "부산", "대전", "구미", "광주"];

  return (
    <div className="weather-widget">
      <div className="weather-display">
        {weatherData && <div>{/* Add your weather display logic here */}</div>}
      </div>
      <Tabs
        cities={cities}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />
    </div>
  );
};

export default WeatherWidget;
