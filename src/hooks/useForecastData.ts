/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import {
  fetchForecastDataByCity,
  fetchForecastDataByCoords,
} from "../api/weather";

interface ForecastData {
  date: string;
  dayOfWeek: string;
  temperatureMax: number;
  temperatureMin: number;
  description: string;
  icon: string;
}

export const useForecastData = (
  city: string | null,
  lat: number | null,
  lon: number | null,
  unit: "metric" | "imperial"
) => {
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data;
        if (city) {
          data = await fetchForecastDataByCity(city, unit);
        } else if (lat !== null && lon !== null) {
          data = await fetchForecastDataByCoords(lat, lon, unit);
        } else {
          throw new Error("No city or coordinates provided");
        }
        console.log(data.list);
        const forecast = data.list.reduce(
          (acc: any[], _item: any, index: number) => {
            if ((index + 1) % 8 === 0 && index <= 31) {
              const dayRecords = data.list.slice(index, index + 8);
              const temperatures = dayRecords.map(
                (record: any) => record.main.temp
              );
              const temperatureMax = Math.max(...temperatures);
              const temperatureMin = Math.min(...temperatures);

              acc.push({
                date: dayRecords[0].dt_txt,
                dayOfWeek: new Date(dayRecords[0].dt_txt).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                  }
                ),
                temperatureMax,
                temperatureMin,
                description: dayRecords[0].weather[0].description,
                icon: dayRecords[0].weather[0].icon,
              });
            }
            return acc;
          },
          []
        );
        setForecastData(forecast);
        setError(null);
      } catch (err) {
        setForecastData([]);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, lat, lon, unit]);

  return { forecastData, loading, error };
};
