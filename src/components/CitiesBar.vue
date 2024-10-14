<template>
  <div class="flex bg-white justify-start overflow-x-auto">
    <button
      v-for="city in defaultCities"
      :key="city.cityName"
      @click="selectCity(city)"
      :class="{ active: city.cityName === selectedCity.cityName }"
      class="p-4 m-0 uppercase text-gray-500 font-medium"
    >
      {{ city.cityName }}
    </button>
    <button
      v-if="
        !defaultCities.some((city) => city.cityName === selectedCity.cityName)
      "
      :key="selectedCity.cityName"
      @click="selectCity(selectedCity)"
      :class="{ active: true }"
      class="p-4 m-0 uppercase text-gray-500 font-medium"
    >
      {{ selectedCity.cityName }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["defaultCities", "selectedCity"],
  methods: {
    selectCity(city) {
      this.$emit("selectCity", city);
    },
  },
};
</script>

<style scoped>
button.active {
  border-bottom: 2px solid red;
  color: black;
}
</style>
