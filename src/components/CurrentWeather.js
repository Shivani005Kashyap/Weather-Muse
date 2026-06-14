 import { useContext } from "react";
import WeatherContext from "../context/Context";
import WeatherIcon from "./WeatherIcon";
import "./styles/CurrentWeather.css";

function CurrentWeather({ data }) {
  const { units } = useContext(WeatherContext);

  if (!data || !data.main) {
    return <div className="CurrentWeather">Loading weather...</div>;
  }

  const weatherDetails = [
    {
      id: 0,
      icon: "droplet",
      name: "Humidity",
      value: Math.round(data.main.humidity || 0),
      unit: units.humidity,
    },
    {
      id: 1,
      icon: "wind",
      name: "Wind Speed",
      value: Math.round(data.wind?.speed || 0),
      unit: units.wind_speed,
    },
    {
      id: 2,
      icon: "eye",
      name: "Visibility",
      value: Math.round((data.visibility || 0) / 1000),
      unit: units.visibility,
    },
    {
      id: 3,
      icon: "clouds-fill",
      name: "Cloud Coverage",
      value: Math.round(data.clouds?.all || 0),
      unit: units.cloud_cover,
    },
  ];

  return (
    <div className="CurrentWeather">
      <div className="temperature">
        <WeatherIcon
          iconNumber={data.weather?.[0]?.icon}
          summary={data.weather?.[0]?.description}
          className="weather-icon"
        />

        <div className="value">
          <div className="real">
            {Math.round(data.main.temp)}
            {units.temperature}
          </div>

          <div className="feels_like">
            Feels Like {Math.round(data.main.feels_like)}
            {units.temperature}
          </div>
        </div>

        <div className="summary">
          {data.weather?.[0]?.description}
        </div>
      </div>

      <div className="other-infos">
        {weatherDetails.map(({ id, icon, name, value, unit }) => (
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