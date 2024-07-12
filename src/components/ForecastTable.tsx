import React from "react";
import "../styles/forecastTable.css";
import LoadingSpinner from "./LoadingSpinner";

interface ForecastData {
  date: string;
  dayOfWeek: string;
  temperatureMax: number;
  temperatureMin: number;
  description: string;
  icon: string;
}

interface ForecastTableProps {
  forecastData: ForecastData[];
  loading: boolean;
}

const ForecastTable: React.FC<ForecastTableProps> = ({
  forecastData,
  loading,
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

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
    <div className="forecast-table">
      {forecastData.length > 0 ? (
        forecastData.map((item, index) => (
          <div key={index} className="forecast-row">
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt={"weather icon - " + item.description}
            />
            <p>{item.dayOfWeek}</p>
            <p className="description">{capitalizeWords(item.description)}</p>
            <p>
              {formatFloat(item.temperatureMax)}°/
              {formatFloat(item.temperatureMin)}°
            </p>
          </div>
        ))
      ) : (
        <div className="no-forecast">No forecast data available</div>
      )}
    </div>
  );
};

export default ForecastTable;
