import { useContext } from "react";
import WeatherIcon from "./WeatherIcon";
import WeatherContext from "../context/Context";

function DailyForecastWidget({ data }) {
  const { units } = useContext(WeatherContext);

  const {
    day,
    icon,
    summary,
    temperature_max,
    temperature_min,
    precipitation,
  } = data;

  const formatDate = (date) => {
    return new Intl.DateTimeFormat(navigator.language, {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(new Date(date));
  };

  const forecastDate = formatDate(day);
  const todayDate = formatDate(new Date());

  const displayDay =
    forecastDate === todayDate ? "Today" : forecastDate;

  return (
    <div className="forecast-item">
      <div className="forecast-date">{displayDay}</div>

      <div className="widget">
        <div className="icon-temp">
          <WeatherIcon
            iconNumber={icon}
            summary={summary}
            className="icon"
          />

          <div className="temperature">
            <div className="max">
              {Math.round(temperature_max)}
              {units.temperature}
            </div>

            <div className="min">
              {Math.round(temperature_min)}
              {units.temperature}
            </div>
          </div>
        </div>

        <div className="precipitation">
          {Math.round(precipitation.total)}
          {units.precipitation}
        </div>
      </div>
    </div>
  );
}

export default DailyForecastWidget;