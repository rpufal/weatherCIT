import { useState, useEffect } from "react";
import {
  fetchWeatherDataByCity,
  fetchWeatherDataByCoords,
} from "../api/weather";

interface WeatherData {
  temperature: number;
  temperatureMax: number;
  temperatureMin: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  city: string;
}

export const useWeatherData = (
  city: string | null,
  lat: number | null,
  lon: number | null,
  unit: "metric" | "imperial"
) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data;
        if (city) {
          data = await fetchWeatherDataByCity(city, unit);
        } else if (lat !== null && lon !== null) {
          data = await fetchWeatherDataByCoords(lat, lon, unit);
        } else {
          throw new Error("No city or coordinates provided");
        }
        setWeatherData({
          temperature: data.main.temp,
          temperatureMax: data.main.temp_max,
          temperatureMin: data.main.temp_min,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          city: data.name,
        });
        setError(null);
      } catch (err) {
        setWeatherData(null);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, lat, lon, unit]);
  console.log("error", error);
  return { weatherData, loading, error };
};
