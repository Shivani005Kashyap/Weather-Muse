import { useContext } from "react";
import WeatherContext from "../context/Context";
import WeatherIcon from "./WeatherIcon";
import "./styles/CurrentWeather.css";

function CurrentWeather({ data }) {
  const { units } = useContext(WeatherContext);

  // ✅ STOP CRASH IF DATA NOT LOADED
  if (!data) {
    return <div className="CurrentWeather">Loading weather...</div>;
  }

  const {
    cloud_cover,
    feels_like,
    humidity,
    icon_num,
    precipitation,
    summary,
    temperature,
    uv_index,
    visibility,
    wind,
  } = data;

  const weatherDetails = [
    {
      id: 0,
      icon: "droplet",
      name: "Precipitation",
      value: Math.round(precipitation?.total || 0),
      unit: units.precipitation,
    },
    {
      id: 1,
      icon: "wind",
      name: "Wind Speed",
      value: Math.round(wind?.speed || 0),
      unit: units.wind_speed,
    },
    {
      id: 2,
      icon: "moisture",
      name: "Humidity",
      value: Math.round(humidity || 0),
      unit: units.humidity,
    },
    {
      id: 3,
      icon: "sunglasses",
      name: "UV Index",
      value: Math.round(uv_index || 0),
      unit: units.uv_index,
    },
    {
      id: 4,
      icon: "clouds-fill",
      name: "Cloud Coverage",
      value: Math.round(cloud_cover || 0),
      unit: units.cloud_cover,
    },
    {
      id: 5,
      icon: "eye",
      name: "Visibility",
      value: Math.round(visibility || 0),
      unit: units.visibility,
    },
  ];

  return (
    <div className="CurrentWeather">
      {/* MAIN TEMP SECTION */}
      <div className="temperature">
        <WeatherIcon
          iconNumber={icon_num}
          summary={summary}
          className="weather-icon"
        />

        <div className="value">
          <div className="real">
            {Math.round(temperature || 0)}
            {units.temperature}
          </div>

          <div className="feels_like">
            Feels Like {Math.round(feels_like || 0)}
            {units.temperature}
          </div>
        </div>

        <div className="summary">{summary}</div>
      </div>

      {/* DETAILS SECTION */}
      <div className="other-infos">
        {weatherDetails.map(({ id, name, icon, value, unit }) => (
          <div className="widget" key={id}>
            <div className="widget-container">
              <div className="info">
                <i className={`bi bi-${icon}`}></i>

                <div className="value">
                  {value} {unit}
                </div>
              </div>

              <div className="name">{name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentWeather;
