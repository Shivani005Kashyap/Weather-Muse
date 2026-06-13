 import { useContext, useState, useEffect, useCallback } from "react";
import { searchPlaces } from "../api";
import WeatherContext from "../context/Context";
import "./styles/Search.css";

const Search = () => {
  const { setPlace } = useContext(WeatherContext);

  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSearch = useCallback(async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await searchPlaces(text);
      setSearchResults(data || []);
    } catch (err) {
      setError("Unable to fetch locations. Please try again.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.trim()) {
        onSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [text, onSearch]);

  const changePlace = (place) => {
    setPlace(place);
    setText("");
    setSearchResults([]);
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          className="form-control"
          type="text"
          placeholder="Search for a city..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Search city"
        />

        <div className="search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>

      {loading && (
        <div className="loading">
          Searching locations...
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {!loading &&
        text.trim() &&
        searchResults.length === 0 &&
        !error && (
          <div className="no-results">
            No locations found.
          </div>
        )}

      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((place) => (
            <div
              className="result"
              key={place.place_id}
              onClick={() => changePlace(place)}
            >
              <i className="fa-solid fa-location-dot"></i>{" "}
              {place.name}, {place.adm_area1}, {place.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;