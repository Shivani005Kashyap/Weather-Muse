import "./styles/Loader.css";

function Loader() {
  return (
    <div className="Loader">
      <div className="loader"></div>

      <div className="loader-content">
        <h3>Loading Weather Data...</h3>
        <p>Please wait while we fetch the latest forecast.</p>
      </div>
    </div>
  );
}

export default Loader;

