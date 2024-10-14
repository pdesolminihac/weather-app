import axios from "axios";
import localforage from "localforage";

const API_KEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY;
const BASE_URL = process.env.VUE_APP_OPEN_WEATHER_API_BASE_URL;
const TIMEOUT = 10000;
const CACHE_DURATION = 60 * 60 * 1000;

async function cacheWeatherData(cityName, data) {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  await localforage.setItem(cityName, cacheData);
}

async function getCachedWeatherData(cityName) {
  const cacheData = await localforage.getItem(cityName);
  if (cacheData && Date.now() - cacheData.timestamp < CACHE_DURATION) {
    return cacheData.data;
  }
  return null;
}

export async function getWeatherByCoordinates(cityName, lat, lon) {
  const cachedData = await getCachedWeatherData(cityName);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: "metric",
        appid: API_KEY,
      },
      timeout: TIMEOUT,
    });
    const data = response.data;

    await cacheWeatherData(cityName, data);

    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data. Please try again later.");
  }
}
