import React, { useState } from "react";

const Search = ({ onPlay }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null); // Limpia errores previos
    try {
      const res = await fetch(`http://localhost:8000/api/search?query=${query}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Error desconocido");
      }
      const data = await res.json();
      setResults(data.tracks || []);
    } catch (err) {
      console.error("Error searching songs:", err);
      setError(err.message || "No se pudo realizar la búsqueda. Intenta nuevamente.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar canciones..."
      />
      <button onClick={handleSearch}>Buscar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {results.map((track) => (
          <li key={track.id}>
            <img src={track.thumbnail} alt={track.title} style={{ width: 50, height: 50 }} />
            <div>
              <strong>{track.title}</strong> - {track.channel}
            </div>
            <button onClick={() => onPlay(track.url)}>Reproducir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;