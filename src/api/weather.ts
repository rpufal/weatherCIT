const apiKey = "5333851f358c72862ec29b39ecd63642";

export const fetchWeatherDataByCity = async (city: string, unit: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
  );
  if (!response.ok) {
    throw new Error("Data not found");
  }
  return await response.json();
};

export const fetchForecastDataByCity = async (city: string, unit: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
  );
  if (!response.ok) {
    throw new Error("Data not found");
  }
  return await response.json();
};

export const fetchWeatherDataByCoords = async (
  lat: number,
  lon: number,
  unit: string
) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
  );
  if (!response.ok) {
    throw new Error("Data not found");
  }
  return await response.json();
};

export const fetchForecastDataByCoords = async (
  lat: number,
  lon: number,
  unit: string
) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
  );
  if (!response.ok) {
    throw new Error("Data not found");
  }
  return await response.json();
};
