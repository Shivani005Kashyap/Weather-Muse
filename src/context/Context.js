import { createContext, useEffect, useState } from 'react';
import { DEFAULT_PLACE, MEASUREMENT_SYSTEMS, UNITS } from '../constants/index';
import { getWeatherData } from '../api';

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const [place, setPlace] = useState(DEFAULT_PLACE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [measurementSystem, setMeasurementSystem] = useState(MEASUREMENT_SYSTEMS.AUTO);
  const [units, setUnits] = useState({});

  useEffect(() => {
    let isMounted = true;

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { current, units: fetchedUnits } = await getWeatherData('current', place.place_id, measurementSystem);
        const { hourly: { data: hourlyData } } = await getWeatherData('hourly', place.place_id, measurementSystem);
        const { daily: { data: dailyData } } = await getWeatherData('daily', place.place_id, measurementSystem);

        if (isMounted) {
          setCurrentWeather(current);
          setUnits(UNITS[fetchedUnits]);
          setHourlyForecast(hourlyData);
          setDailyForecast(dailyData);
        }
      } catch {
        if (isMounted) {
          setError('Failed to fetch weather data. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWeatherData();

    return () => {
      isMounted = false;
    };
  }, [place, measurementSystem]);

  return (
    <WeatherContext.Provider value={{ place, setPlace, loading, error, currentWeather, hourlyForecast, dailyForecast, measurementSystem, setMeasurementSystem, units }}>
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherProvider };
export default WeatherContext;