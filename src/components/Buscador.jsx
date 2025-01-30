import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Buscador.css";

const Buscador = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isAlbumDetail = location.pathname.startsWith("/album/");

  // ✅ Permite escribir sin redireccionar de inmediato
  const handleChange = (e) => {
    setQuery(e.target.value);
    if (!isAlbumDetail) {
      onSearch(e.target.value); // Filtra en tiempo real solo en Home
    }
  };

  // ✅ Aplica el filtro y redirige solo al hacer clic en la lupa o Enter
  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate("/", { state: { filter: query } }); // 🔄 Redirige y aplica el filtro en Home
    }
  };

  // ✅ Detecta el Enter y ejecuta la búsqueda
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar álbumes o canciones..."
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress} // 🔄 Permite buscar con Enter
      />
      <button onClick={handleSearch}>🔍</button>
    </div>
  );
};

export default Buscador;
