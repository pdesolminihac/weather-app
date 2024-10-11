<template>
  <div class="border-solid bg-white m-2 flex flex-col rounded-sm shadow-lg">
    <div class="p-4 border-b-2 border-gray-100">
      <h2 class="text-2xl font-normal">Next hours</h2>
    </div>
    <div class="flex overflow-x-auto p-4">
      <div
        v-for="(hour, index) in hourlyWeather"
        :key="index"
        class="flex-auto text-center min-w-24"
      >
        <p class="text-md mb-1">{{ formatTemp(hour.temp) }}</p>
        <div class="px-4 border-r-2 border-gray-100">
          <p class="text-md text-blue-300">
            {{ formatPercent(hour.pop) }}
          </p>
          <div class="flex justify-center">
            <img
              :src="getIconUrl(hour.weather[0].icon)"
              :alt="'Weather icon for ' + hour.weather[0].description"
              class="w-14 h-14"
            />
          </div>
        </div>

        <p class="text-md text-gray-500">{{ formatHour(hour.dt) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTemp, getIconUrl } from '../utils'

export default {
  props: ['hourlyWeather', 'cityName'],
  methods: {
    formatHour (timestamp) {
      const date = new Date(timestamp * 1000)
      return date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
      })
    },
    formatPercent (percent) {
      return (percent * 100).toFixed(0) + '%'
    },
    formatTemp,
    getIconUrl
  }
}
</script>
