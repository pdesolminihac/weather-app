<template>
  <div class="border-solid bg-white m-2 flex flex-col rounded-sm shadow-lg">
    <div class="p-4 border-b-2 border-gray-100">
      <h2 class="text-2xl font-normal">Next 5 days</h2>
    </div>
    <div class="flex-col p-3">
      <div
        v-for="(day, index) in dailyWeather"
        :key="index"
        class="flex items-center justify-between py-1 w-full border-b-2 border-gray-100 last:border-b-0"
      >
        <!-- Weather Icon -->
        <img
          :src="getIconUrl(day.weather[0].icon)"
          :alt="'Weather icon for ' + day.weather[0].description"
          class="w-14 h-14"
        />

        <!-- Date and Description -->
        <div class="flex flex-col flex-auto justify-center text-center">
          <p class="font-normal text-xl">{{ formatDate(day.dt) }}</p>
          <p class="text-gray-500 first-letter:uppercase text-md">
            {{ day.weather[0].description }}.
          </p>
        </div>

        <!-- Temperature Max and Min -->
        <div class="flex flex-row items-center justify-center gap-2">
          <p class="text-md">{{ formatTemp(day.temp.max) }}</p>
          <p class="text-md">{{ formatTemp(day.temp.min) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTemp, getIconUrl } from '../utils'

export default {
  props: ['dailyWeather', 'cityName'],
  methods: {
    formatDate (timestamp) {
      const date = new Date(timestamp * 1000)
      const options = { weekday: 'short', month: 'short', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    },
    formatTemp,
    getIconUrl
  }
}
</script>
