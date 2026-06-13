import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./styles/HomePage.css";

const Homepage = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Delhi");

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // ✅ FIXED: useCallback to remove eslint warning
  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );

      setWeather(res.data);
      setCity(cityName);
    } catch (err) {
      console.log("Error fetching weather:", err);
      setWeather(null);
    }
  }, [apiKey]);

  // ✅ FIXED: proper dependency
  useEffect(() => {
    fetchWeather("Delhi");
  }, [fetchWeather]);

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <div className="homepage">

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">WeatherMuse</h1>

          <p className="hero-subtitle">
              Stay informed with real-time weather updates, detailed forecasts,
            and intelligent weather insights. Plan your day, travel smarter,
            and stay prepared for every season.
          </p>

          <button className="hero-btn">Explore Forecasts</button>
        </div>
      </header>

      {/* 🌍 SEARCH + WEATHER */}
      <section className="current-weather">
        <h2>Weather at a Glance</h2>

        {/* SEARCH BAR */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        {/* WEATHER CARD */}
        <div className="weather-card">

          <div className="weather-info">
            <h3>{weather ? weather.name : "Live Weather Updates"}</h3>

            <p>
              {weather
                ? weather.weather[0].description
                : "Search a city to get weather data"}
            </p>

            <h1>
              {weather ? `${Math.round(weather.main.temp)}°C` : "--"}
            </h1>

            {weather && (
              <p>
                Humidity: {weather.main.humidity}% | Wind:{" "}
                {weather.wind.speed} m/s
              </p>
            )}
          </div>

          <div className="weather-icon">
            <img
              src={
                weather
                  ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                  : "https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
              }
              alt={weather ? `${weather.weather[0].main} weather icon` : "weather placeholder icon"}
            />
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose WeatherMuse?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3222/3222801.png"
              alt="real time weather updates"
            />
            <h3>Real-Time Updates</h3>
            <p>Live weather data anytime.</p>
          </div>

          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3897/3897942.png"
              alt="accurate forecast"
            />
            <h3>Accurate Forecasts</h3>
            <p>Reliable OpenWeather API data.</p>
          </div>

          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1040/1040263.png"
              alt="interactive weather maps"
            />
            <h3>Interactive Weather Maps</h3>
            <p>Visualize weather patterns easily.</p>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section className="features">
        <h2>Designed for Everyday Planning</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Travel Planning</h3>
            <p>Check weather before trips.</p>
          </div>

          <div className="feature-card">
            <h3>Outdoor Activities</h3>
            <p>Plan your day smartly.</p>
          </div>

          <div className="feature-card">
            <h3>Daily Decisions</h3>
            <p>Stay ahead of weather changes.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 WeatherMuse. All Rights Reserved.</p>
      </footer>

    </div>
  );
};

export default Homepage;