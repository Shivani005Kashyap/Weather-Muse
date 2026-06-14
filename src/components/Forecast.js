import HourlyForecastWidget from "./HourlyForecastWidget";
import DailyForecastWidget from "./DailyForecastWidget";
import HorizontallyScrollable from "../components/HorizontallyScrollable";
import "./styles/Forecast.css";

function Forecast({ title, type, data }) {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="Forecast">
      <h3>{title}</h3>

      {/* EMPTY STATE */}
      {safeData.length === 0 ? (
        <p className="no-data">Loading forecast...</p>
      ) : (
        <HorizontallyScrollable className="widget-container">
          {safeData.map((item, index) => (
            <div
              key={item.date || item.dt_txt || index}
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
      )}
    </div>
  );
}

export default Forecast;