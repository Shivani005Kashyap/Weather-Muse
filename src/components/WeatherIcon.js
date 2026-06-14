import React from "react";
import "./styles/WeatherIcon.css";

const iconMap = {
  // Clear Sky
  "01d": 4,
  "01n": 15,

  // Few Clouds
  "02d": 5,
  "02n": 16,

  // Scattered Clouds
  "03d": 7,
  "03n": 18,

  // Broken Clouds
  "04d": 8,
  "04n": 19,

  // Shower Rain
  "09d": 12,
  "09n": 24,

  // Rain
  "10d": 13,
  "10n": 25,

  // Thunderstorm
  "11d": 27,
  "11n": 27,

  // Snow
  "13d": 29,
  "13n": 29,

  // Mist/Fog
  "50d": 36,
  "50n": 36,
};

function WeatherIcon({
  iconNumber,
  summary = "",
  className = "",
}) {
  const iconId = iconMap[iconNumber] || 4;

  return (
    <img
      src={`/dist/weather_icons/set01/big/${iconId}.png`}
      alt={summary}
      title={summary}
      className={className}
      draggable={false}
    />
  );
}

export default WeatherIcon;