<template>
  <div
    class="weather-app bg-gradient-to-b from-blue-600 to-blue-200 min-h-screen flex flex-col"
  >
    <div class="p-5 bg-blue-600">
      <h1 class="text-2xl text-white">Simple Weather</h1>
    </div>

    <div class="flex bg-white justify-start">
      <button
        v-for="city in defaultCities"
        :key="city.cityName"
        @click="debouncedFetchWeather(city)"
        :class="{ active: city.cityName === cityName }"
        class="p-4 m-0 uppercase text-gray-500 font-medium"
      >
        {{ city.cityName }}
      </button>
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading" class="flex flex-col mt-5 items-center">
      <p class="w-full text-center text-white">
        Fetching weather data for {{ cityName }}...
      </p>
      <div class="w-full flex justify-center">
        <img src="./assets/loading.gif" alt="Loading..." class="w-24 h-24" />
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="text-red mt-5">{{ errorMessage }}</div>

    <HourlyWeather
      v-if="!loading && hourlyWeather.length"
      :hourlyWeather="hourlyWeather"
      :cityName="cityName"
    />

    <DailyWeather
      v-if="!loading && dailyWeather.length"
      :dailyWeather="dailyWeather"
      :cityName="cityName"
    />

    <div
      class="bottom-bar bg-blue-600 text-white text-right fixed bottom-0 left-0 right-0"
    >
      <p v-if="lastUpdated">
        Last updated: {{ formatLastUpdated(lastUpdated) }}
      </p>
    </div>
  </div>
</template>

<script>
import { getWeatherByCoordinates } from "./services/weatherService";
import HourlyWeather from "./components/HourlyWeather.vue";
import DailyWeather from "./components/DailyWeather.vue";
import debounce from "lodash.debounce";

const defaultCities = [
  { cityName: "Rio de Janeiro", lat: "-22.9068", lon: "-43.1729" },
  { cityName: "Beijing", lat: "39.9042", lon: "116.4074" },
  { cityName: "Los Angeles", lat: "34.0522", lon: "-118.2437" },
];

export default {
  components: {
    HourlyWeather,
    DailyWeather,
  },
  data() {
    return {
      cityName: "",
      hourlyWeather: [],
      dailyWeather: [],
      loading: false,
      errorMessage: "",
      defaultCities,
      lastUpdated: null,
    };
  },
  methods: {
    async fetchWeather({ cityName, lat, lon }) {
      try {
        this.cityName = cityName;
        this.errorMessage = null;
        this.loading = true;
        const data = await getWeatherByCoordinates(cityName, lat, lon);
        this.hourlyWeather = data.hourly.slice(0, 12);
        this.dailyWeather = data.daily.slice(0, 5);
        this.lastUpdated = Date.now();
      } catch (error) {
        this.errorMessage =
          "Could not fetch weather data. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    debouncedFetchWeather: debounce(function (city) {
      this.fetchWeather(city);
    }, 300),

    formatLastUpdated(timestamp) {
      const date = new Date(timestamp);
      const options = { month: "short", day: "numeric" };
      const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
      return `${date.toLocaleDateString(
        "en-US",
        options
      )} ${date.toLocaleTimeString("en-US", timeOptions)}`;
    },
  },
  mounted() {
    this.fetchWeather(defaultCities[0]);
    this.cityName = defaultCities[0].cityName;
  },
};
</script>

<style scoped>
button.active {
  border-bottom: 2px solid red;
  color: black;
}
</style>
