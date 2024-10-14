<template>
  <div
    class="bg-gradient-to-b from-blue-600 to-blue-200 min-h-screen flex flex-col"
  >
    <div class="p-5 bg-blue-600 flex-row flex justify-between w-full">
      <h1 class="text-2xl text-white">Simple Weather</h1>
      <img
        src="./assets/magnifying-glass.png"
        alt="Search"
        class="w-7 h-7 cursor-pointer"
        @click="toggleSearchBar"
      />
    </div>

    <SearchBar v-if="showSearchBar" :cities="cities" @selectCity="selectCity" />

    <CitiesBar
      :defaultCities="defaultCities"
      :selectedCity="selectedCity"
      @selectCity="selectCity"
    />

    <!-- Loading Indicator -->
    <div v-if="loading" class="flex flex-col mt-5 items-center">
      <p class="w-full text-center text-white">
        Fetching weather data for {{ selectedCity.cityName }}...
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
    />

    <DailyWeather
      v-if="!loading && dailyWeather.length"
      :dailyWeather="dailyWeather"
    />

    <div
      class="bg-blue-600 text-white text-right fixed bottom-0 left-0 right-0"
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
import SearchBar from "./components/SearchBar.vue";
import CitiesBar from "./components/CitiesBar.vue";
import debounce from "lodash.debounce";
import Papa from "papaparse";
import rawCities from "!!raw-loader!./assets/cities.csv";

const defaultCities = [
  { cityName: "Rio de Janeiro", lat: "-22.9068", lon: "-43.1729" },
  { cityName: "Beijing", lat: "39.9042", lon: "116.4074" },
  { cityName: "Los Angeles", lat: "34.0522", lon: "-118.2437" },
];

export default {
  components: {
    HourlyWeather,
    DailyWeather,
    SearchBar,
    CitiesBar,
  },
  data() {
    return {
      selectedCity: {},
      hourlyWeather: [],
      dailyWeather: [],
      loading: false,
      errorMessage: "",
      defaultCities,
      lastUpdated: null,
      showSearchBar: false,
      cities: [],
    };
  },
  methods: {
    async fetchWeather({ cityName, lat, lon }) {
      try {
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

    toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },

    loadCities() {
      Papa.parse(rawCities, {
        header: true,
        complete: (results) => {
          this.cities = results.data.map((city) => {
            return {
              cityName: city.city_name,
              lat: city.lat,
              lon: city.lon,
            };
          });
        },
        error: (error) => {
          console.error("Error loading cities:", error);
        },
      });
    },

    selectCity(city) {
      this.debouncedFetchWeather(city);
      this.selectedCity = city;
      this.showSearchBar = false;
    },
  },
  mounted() {
    this.debouncedFetchWeather(defaultCities[0]);
    this.selectCity(defaultCities[0]);
    this.loadCities();
  },
};
</script>
