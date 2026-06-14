import { createContext, useEffect, useState } from "react";
import { DEFAULT_PLACE, UNITS } from "../constants/index";
import { getCurrentWeather, getForecast } from "../api";

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const [place, setPlace] = useState(DEFAULT_PLACE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);

  const [measurementSystem, setMeasurementSystem] = useState("metric");
  const [units, setUnits] = useState(UNITS.metric);

  useEffect(() => {
    let isMounted = true;

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [current, forecast] = await Promise.all([
          getCurrentWeather(place.lat, place.lon, measurementSystem),
          getForecast(place.lat, place.lon, measurementSystem),
        ]);

        if (!isMounted) return;

        // CURRENT WEATHER
        setCurrentWeather(current);

        // UNITS
        setUnits(UNITS[measurementSystem] || UNITS.metric);

        // HOURLY FORECAST
        const hourly = forecast.list.slice(0, 8).map((item) => ({
          dt: item.dt,
          temp: item.main.temp,
          feels_like: item.main.feels_like,
          humidity: item.main.humidity,
          wind_speed: item.wind.speed,
          wind_deg: item.wind.deg,
          weather: item.weather,
          pop: item.pop,
          clouds: item.clouds?.all,
          visibility: item.visibility,
        }));

        setHourlyForecast(hourly);

        // DAILY FORECAST
        const dailyMap = {};

        forecast.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];

          if (!dailyMap[date]) {
            dailyMap[date] = {
              dt: item.dt,
              date,
              temp: {
                min: item.main.temp_min,
                max: item.main.temp_max,
              },
              weather: item.weather,
              pop: item.pop,
              wind_speed: item.wind.speed,
              wind_deg: item.wind.deg,
              humidity: item.main.humidity,
            };
          } else {
            dailyMap[date].temp.min = Math.min(
              dailyMap[date].temp.min,
              item.main.temp_min
            );

            dailyMap[date].temp.max = Math.max(
              dailyMap[date].temp.max,
              item.main.temp_max
            );
          }
        });

        setDailyForecast(Object.values(dailyMap));
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Failed to fetch weather data. Please try again.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeatherData();

    return () => {
      isMounted = false;
    };
  }, [place, measurementSystem]);

  return (
    <WeatherContext.Provider
      value={{
        place,
        setPlace,
        loading,
        error,
        currentWeather,
        hourlyForecast,
        dailyForecast,
        measurementSystem,
        setMeasurementSystem,
        units,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherProvider };
export default WeatherContext;