export const DEFAULT_PLACE = {
  name: "London",
  country: "United Kingdom",
  lat: 51.50853,
  lon: -0.12574,
};

// -----------------------------
// MEASUREMENT SYSTEMS
// -----------------------------
export const MEASUREMENT_SYSTEMS = {
  METRIC: "metric",
  IMPERIAL: "imperial",
};

// -----------------------------
// UNITS (OpenWeather compatible)
// -----------------------------
export const UNITS = {
  metric: {
    temperature: "°C",
    precipitation: "mm",
    wind_speed: "m/s",
    visibility: "km",
    humidity: "%",
    uv_index: "",
    cloud_cover: "%",
  },

  imperial: {
    temperature: "°F",
    precipitation: "in",
    wind_speed: "mph",
    visibility: "mi",
    humidity: "%",
    uv_index: "",
    cloud_cover: "%",
  },

  auto: {
    temperature: "°C",
    precipitation: "mm",
    wind_speed: "m/s",
    visibility: "km",
    humidity: "%",
    uv_index: "",
    cloud_cover: "%",
  },
};