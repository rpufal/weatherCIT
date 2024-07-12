/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useDebouncer } from "./hooks/useDebouncer";
import { useWeatherData } from "./hooks/useWeatherData";
import { useForecastData } from "./hooks/useForecastData";
import WeatherCard from "./components/WeatherCard";
import ForecastTable from "./components/ForecastTable";
import ErrorMessage from "./components/ErrorMessage";

export default function WeatherApp() {
  const [city, setCity] = useState<string>("");
  const [coords, setCoords] = useState<{
    lat: number | null;
    lon: number | null;
  }>({ lat: null, lon: null });
  const debouncedCity = useDebouncer(city, 500);
  const [temperatureUnit, setTemperatureUnit] = useState<"metric" | "imperial">(
    "metric"
  );

  const {
    weatherData,
    loading: weatherLoading,
    error: weatherError,
  } = useWeatherData(debouncedCity, coords.lat, coords.lon, temperatureUnit);
  const {
    forecastData,
    loading: forecastLoading,
    error: forecastError,
  } = useForecastData(debouncedCity, coords.lat, coords.lon, temperatureUnit);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          console.error(err);
          alert(
            "Failed to fetch location. Please enable location services and reload page."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (debouncedCity === "") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (err) => {
            console.error(err);
            alert(
              "Failed to fetch location. Please enable location services and reload page."
            );
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }, [debouncedCity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setCoords({ lat: null, lon: null });
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) =>
      prevUnit === "metric" ? "imperial" : "metric"
    );
  };

  return (
    <div className="weather-app-container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Enter city name"
      />
      <div>
        <button onClick={toggleTemperatureUnit}>
          {temperatureUnit === "metric"
            ? "Switch to Fahrenheit"
            : "Switch to Celsius"}
        </button>
      </div>
      {(forecastError || weatherError) && (
        <ErrorMessage
          message={`No data was found ${
            city && ",  try typing a city name again"
          }`}
        />
      )}
      <WeatherCard
        temperature={weatherData?.temperature}
        temperatureMax={weatherData?.temperatureMax}
        temperatureMin={weatherData?.temperatureMin}
        humidity={weatherData?.humidity}
        windSpeed={weatherData?.windSpeed}
        description={weatherData?.description}
        icon={weatherData?.icon}
        city={weatherData?.city}
        loading={weatherLoading}
        temperatureUnit={temperatureUnit}
      />
      <ForecastTable forecastData={forecastData} loading={forecastLoading} />
    </div>
  );
}
