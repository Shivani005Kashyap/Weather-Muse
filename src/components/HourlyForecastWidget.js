 import { useContext } from "react";
import WeatherIcon from "./WeatherIcon";
import WeatherContext from "../context/Context";

function HourlyForecastWidget({ data }) {
  const { units } = useContext(WeatherContext);

  const {
    date,
    icon,
    summary,
    temperature,
    precipitation,
    wind,
  } = data;

  const locale = navigator.language;
  const weatherDate = new Date(date);
  const now = new Date();

  const isCurrentHour =
    weatherDate.getFullYear() === now.getFullYear() &&
    weatherDate.getMonth() === now.getMonth() &&
    weatherDate.getDate() === now.getDate() &&
    weatherDate.getHours() === now.getHours();

  const displayDay = isCurrentHour
    ? "Now"
    : new Intl.DateTimeFormat(locale, {
        weekday: "short",
        day: "2-digit",
        month: "short",
      }).format(weatherDate);

  const displayTime = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(weatherDate);

  return (
    <div className="forecast-item">
      <div className="forecast-date">{displayDay}</div>
      <div className="forecast-time">{displayTime}</div>

      <div className="widget">
        <div className="icon-temp">
          <WeatherIcon
            iconNumber={icon}
            summary={summary}
            className="icon"
          />

          <div className="temperature">
            {Math.round(temperature)}
            {units.temperature}
          </div>
        </div>

        <div className="precipitation">
          🌧️ {Math.round(precipitation.total)}
          {units.precipitation}
        </div>

        <div className="wind">
          <div className="speed">
            💨 {Math.round(wind.speed)}
            {units.wind_speed}
          </div>

          <div
            className="dir"
            style={{
              transform: `rotate(${-45 + wind.angle}deg)`,
            }}
          >
            <i className="bi bi-send-fill"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HourlyForecastWidget;