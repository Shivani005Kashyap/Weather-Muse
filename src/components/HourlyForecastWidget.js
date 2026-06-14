import { useContext } from "react";
import WeatherIcon from "./WeatherIcon";
import WeatherContext from "../context/Context";

function HourlyForecastWidget({ data }) {
  const { units } = useContext(WeatherContext);

  if (!data) return null;

  const date = new Date((data.dt || 0) * 1000);

  const time = isNaN(date.getTime())
    ? "--:--"
    : new Intl.DateTimeFormat(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);

  return (
    <div className="forecast-item">
      <div className="forecast-time">{time}</div>

      <div className="widget">
        <WeatherIcon
          iconNumber={data.weather?.[0]?.icon}
          summary={data.weather?.[0]?.description}
        />

        <div className="temperature">
          {Math.round(data.temp || 0)}
          {units.temperature}
        </div>

        <div className="wind">
          💨 {Math.round(data.wind_speed || 0)}
          {units.wind_speed}
        </div>
      </div>
    </div>
  );
}

export default HourlyForecastWidget;