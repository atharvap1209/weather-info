import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = `${process.env.WEATHER_API_KEY}`;
  const API_URL = "https://api.weatherapi.com/v1/current.json";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          q: location,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
      // Handle errors here
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {weatherData && (
        <div>
          <h2>
            Weather for {weatherData.location.name},{" "}
            {weatherData.location.country}
          </h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Weather: {weatherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
