export function formatTemp (temp) {
  return Math.round(temp) + '°'
}

export function getIconUrl (iconCode) {
  return `http://openweathermap.org/img/wn/${iconCode}.png`
}
