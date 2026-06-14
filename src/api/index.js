import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

// -----------------------------
// CURRENT WEATHER
// -----------------------------
export async function getCurrentWeather(lat, lon, units = "metric") {
  try {
    const res = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          units,
          appid: API_KEY,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Current Weather Error:", error);
    return null;
  }
}

// -----------------------------
// 5 DAY / 3 HOUR FORECAST
// -----------------------------
export async function getForecast(lat, lon, units = "metric") {
  try {
    const res = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat,
          lon,
          units,
          appid: API_KEY,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Forecast Error:", error);
    return null;
  }
}

// -----------------------------
// SEARCH PLACES (CITY SEARCH)
// -----------------------------
export async function searchPlaces(text) {
  try {
    const res = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: text,
          limit: 5,
          appid: API_KEY,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
}