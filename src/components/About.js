import React from "react";
import "./styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About WeatherMuse</h1>
        <p>Smart weather insights to help you plan every day with confidence.</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            WeatherMuse is designed to provide accurate, real-time weather
            information in a simple and user-friendly way. Our goal is to help
            users stay informed about changing weather conditions and make
            better decisions for travel, work, and daily activities.
          </p>
        </section>

        <section className="about-section">
          <h2>Key Features</h2>
          <ul>
            <li>Live weather updates for cities worldwide</li>
            <li>Detailed hourly and weekly forecasts</li>
            <li>Interactive weather maps and visual insights</li>
            <li>Seasonal themes for a personalized experience</li>
            <li>Clean, responsive, and easy-to-use interface</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>How WeatherMuse Works</h2>
          <p>
            WeatherMuse integrates trusted weather data sources to provide
            up-to-date information on temperature, humidity, wind speed,
            precipitation, and atmospheric conditions. The data is processed
            and presented through an intuitive interface for quick and easy
            understanding.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose WeatherMuse?</h2>
          <p>
            Combining accuracy, simplicity, and modern design, WeatherMuse
            delivers weather information that is both reliable and easy to
            access. Whether you're planning a trip, preparing for outdoor
            activities, or simply checking today's forecast, WeatherMuse keeps
            you one step ahead of the weather.
          </p>
        </section>
      </div>
    </div>
  );
}