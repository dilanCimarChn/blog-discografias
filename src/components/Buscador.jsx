import React, { useState } from "react";
import "../styles/Buscador.css";

const Buscador = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Llama a la búsqueda con la entrada en tiempo real
  };

  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar álbumes o canciones..."
        value={query}
        onChange={handleChange}
      />
      <button onClick={() => onSearch(query)}>🔍</button>
    </div>
  );
};

export default Buscador;
