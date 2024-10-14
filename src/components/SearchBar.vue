<template>
  <div>
    <div>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a city..."
        class="border p-2 w-full"
        @input="filterCities(searchQuery)"
      />
    </div>

    <ul
      v-if="filteredCities.length"
      class="absolute top-28 border p-2 w-full z-50 bg-gray-800 max-h-64 overflow-y-scroll"
    >
      <li
        v-for="(city, index) in filteredCities"
        :key="index"
        class="p-2 hover:bg-gray-200 cursor-pointer text-white"
        @click="selectCity(city)"
      >
        {{ city.cityName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["cities"],
  data() {
    return {
      searchQuery: "",
      filteredCities: [],
    };
  },
  methods: {
    filterCities(searchQuery) {
      if (typeof searchQuery !== "string") {
        console.error("searchQuery is not a string:", searchQuery);
        return;
      }

      this.filteredCities = this.cities.filter((city) => {
        if (city && city.cityName) {
          return city.cityName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return false;
      });

      this.filteredCities = this.cities.filter((city) => {
        if (city && city.cityName) {
          return city.cityName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return false;
      });
    },

    selectCity(city) {
      this.$emit("selectCity", city);
      this.searchQuery = "";
      this.filteredCities = [];
    },
  },
};
</script>
