import React from "react";
import "../styles/weatherCard.css";
import LoadingSpinner from "./LoadingSpinner";

interface WeatherCardProps {
  temperature?: number;
  temperatureMax?: number;
  temperatureMin?: number;
  humidity?: number;
  windSpeed?: number;
  description?: string;
  icon?: string;
  city?: string;
  loading: boolean;
  temperatureUnit: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  temperatureMax,
  temperatureMin,
  humidity,
  windSpeed,
  description,
  icon,
  city,
  loading,
  temperatureUnit,
}) => {
  const formatFloat = (float?: number) => {
    return float !== undefined ? float.toFixed(1) : "N/A";
  };

  const capitalizeWords = (str?: string) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="weather-card">
      {loading ? (
        <>
          <LoadingSpinner />
          <p>City: Loading...</p>
          <p>Temperature: Loading...</p>
          <p>Max Temperature: Loading...</p>
          <p>Min Temperature: Loading...</p>
          <p>Humidity: Loading...</p>
          <p>Wind Speed: Loading...</p>
          <p>Description: Loading...</p>
        </>
      ) : (
        <>
          <p className="city-name">
            {city ? city : "No weather data available"}
          </p>
          <div className="current-temperature">
            <img
              src={`https://openweathermap.org/img/wn/${icon}.png`}
              alt={`weather icon - ${description}`}
            />
            <p>
              {formatFloat(temperature)}°
              {temperatureUnit === "metric" ? "C" : "F"}
            </p>
          </div>
          <p>
            {capitalizeWords(description)} {formatFloat(temperatureMax)}°/
            {formatFloat(temperatureMin)}°
          </p>
          <p>Humidity: {humidity ? humidity : "N/A"}%</p>
          <p>Wind Speed: {windSpeed ? windSpeed : "N/A"} m/s</p>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
