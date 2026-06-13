import HourlyForecastWidget from "./HourlyForecastWidget";
import DailyForecastWidget from "./DailyForecastWidget";
import HorizontallyScrollable from "../components/HorizontallyScrollable";
import "./styles/Forecast.css";

function Forecast({ title, type, data = [] }) {
  if (!data.length) {
    return (
      <div className="Forecast">
        <h3>{title}</h3>
        <p className="no-data">No forecast data available.</p>
      </div>
    );
  }

  return (
    <div className="Forecast">
      <h3>{title}</h3>

      <HorizontallyScrollable className="widget-container">
        {data.map((item, index) => (
          <div
            key={item.date || item.day || index}
            className="forecast-item"
          >
            {type === "hourly" ? (
              <HourlyForecastWidget data={item} />
            ) : (
              <DailyForecastWidget data={item} />
            )}
          </div>
        ))}
      </HorizontallyScrollable>
    </div>
  );
}

export default Forecast;