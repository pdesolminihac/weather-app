<template>
  <div
    class="weather-app bg-gradient-to-b from-blue-600 to-blue-200 min-h-screen flex flex-col"
  >
    <!-- Title -->
    <div class="p-5 bg-blue-600">
      <h1 class="text-2xl text-white">Simple Weather</h1>
    </div>

    <!-- Buttons for default cities -->
    <div class="flex bg-white justify-start">
      <button
        v-for="city in defaultCities"
        :key="city.name"
        @click="debouncedFetchWeather(city)"
        :class="{ active: city.name === cityName }"
        class="p-4 m-0 uppercase text-gray-500 font-medium"
      >
        {{ city.name }}
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

    <!-- Display hourly weather -->
    <HourlyWeather
      v-if="!loading && hourlyWeather.length"
      :hourlyWeather="hourlyWeather"
      :cityName="cityName"
    />

    <!-- Display daily weather -->
    <DailyWeather
      v-if="!loading && dailyWeather.length"
      :dailyWeather="dailyWeather"
      :cityName="cityName"
    />

    <!-- Bottom bar for last updated time -->
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
import { getWeatherByCoordinates } from './services/weatherService'
import HourlyWeather from './components/HourlyWeather.vue'
import DailyWeather from './components/DailyWeather.vue'
import debounce from 'lodash.debounce'

// default cities (name, lat, lon)
const defaultCities = [
  { name: 'Rio de Janeiro', lat: '-22.9068', lon: '-43.1729' },
  { name: 'Beijing', lat: '39.9042', lon: '116.4074' },
  { name: 'Los Angeles', lat: '34.0522', lon: '-118.2437' }
]

export default {
  components: {
    HourlyWeather,
    DailyWeather
  },
  data () {
    return {
      cityName: '',
      hourlyWeather: [],
      dailyWeather: [],
      loading: false,
      errorMessage: '',
      defaultCities,
      lastUpdated: null
    }
  },
  methods: {
    async fetchWeather ({ name, lat, lon }) {
      try {
        this.cityName = name
        this.errorMessage = null
        this.loading = true
        const data = await getWeatherByCoordinates(lat, lon)
        this.hourlyWeather = data.hourly.slice(0, 12)
        this.dailyWeather = data.daily.slice(0, 5)
        this.lastUpdated = Date.now()
      } catch (error) {
        this.errorMessage =
          'Could not fetch weather data. Please try again later.'
      } finally {
        this.loading = false
      }
    },

    // Use lodash to debounce the fetchWeather function
    debouncedFetchWeather: debounce(function (city) {
      this.fetchWeather(city)
    }, 300), // 300ms debounce delay

    // Format the last updated time to a readable string
    formatLastUpdated (timestamp) {
      const date = new Date(timestamp)
      const options = { month: 'short', day: 'numeric' } // For Oct 31
      const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false } // For 13:42
      return `${date.toLocaleDateString(
        'en-US',
        options
      )} ${date.toLocaleTimeString('en-US', timeOptions)}`
    }
  },
  mounted () {
    this.fetchWeather(defaultCities[0]) // Load Rio de Janeiro weather by default
    this.cityName = defaultCities[0].name
  }
}
</script>

<style scoped>
button.active {
  border-bottom: 2px solid red;
  color: black;
}
</style>
