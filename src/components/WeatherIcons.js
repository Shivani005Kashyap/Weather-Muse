function WeatherIcon({ iconNumber, summary, className = "" }) {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/dist/weather_icons/set04/big/${iconNumber}.png`}
      alt={summary || "Weather Icon"}
      className={className}
      draggable={false}
      loading="lazy"
      onError={(e) => {
        e.target.src = `${process.env.PUBLIC_URL}/dist/weather_icons/set04/big/1.png`;
      }}
    />
  );
}

export default WeatherIcon;