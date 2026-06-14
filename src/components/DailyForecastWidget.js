import { useContext } from "react";
import WeatherIcon from "./WeatherIcon";
import WeatherContext from "../context/Context";

function DailyForecastWidget({ data }) {
  const { units } = useContext(WeatherContext);

  if (!data) return null;

  const date = new Date(data.dt * 1000);

  const day = new Intl.DateTimeFormat(navigator.language, {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(date);

  return (
    <div className="forecast-item">
      <div className="forecast-date">{day}</div>

      <div className="widget">
        <WeatherIcon
          iconNumber={data.weather?.[0]?.icon}
          summary={data.weather?.[0]?.description}
        />

        <div className="temperature">
          <div className="max">
            {Math.round(data.temp?.max)}
            {units.temperature}
          </div>

          <div className="min">
            {Math.round(data.temp?.min)}
            {units.temperature}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default DailyForecastWidget;