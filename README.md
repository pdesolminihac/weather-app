# Simple Weather App

Simple weather app to check weather forecast in the following hours and days for a specific location.

## Implementation details

- The app is built using Vue.js
- The app uses the OpenWeatherMap API to get the weather forecast
- Use of Tailwind CSS for styling
- A default location is set to Rio de Janeiro, Brazil
- A debounce function is used to avoid making too many requests to the API
- A cache is used to store the weather forecast for a specific location for 10 minutes
- The app is responsive and works well on mobile devices
- There is a search bar to search for a specific location using the city meta data from https://www.weatherbit.io/api/meta as a source

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
