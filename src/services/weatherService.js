import axios from 'axios'

const API_KEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall'
const TIMEOUT = 20000

export async function getWeatherByCoordinates (lat, lon) {
  const response = await axios.get(BASE_URL, {
    params: {
      lat,
      lon,
      exclude: 'current, minutely, alerts',
      units: 'metric',
      appid: API_KEY
    },
    timeout: TIMEOUT
  })
  return response.data
}
