import React, { useContext } from "react";
import "./styles/Design.css";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import WeatherContext from "../context/Context";
import Loader from "./Loader";
import Search from "../components/Search";

export default function Design() {
  const weatherContext = useContext(WeatherContext);

  if (!weatherContext) {
    return (
      <div className="error-message">
        Unable to load weather data. Please try again later.
      </div>
    );
  }

  const {
    loading,
    error,
    currentWeather,
    dailyForecast,
    hourlyForecast,
  } = weatherContext;

  if (loading) {
    return (
      <div className="Main">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="Main">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="Main">
      <div className="overlay">
        <Search />

        {currentWeather ? (
          <CurrentWeather data={currentWeather} />
        ) : (
          <p>No current weather data</p>
        )}
      </div>

      <div className="overlay1">
        <Forecast
          type="hourly"
          title="Hourly Forecast"
          data={hourlyForecast || []}
        />
      </div>

      <div className="overlay2">
        <Forecast
          type="daily"
          title="Daily Forecast"
          data={dailyForecast || []}
        />
      </div>
    </div>
  );
}