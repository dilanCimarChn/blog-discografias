import React from "react";
import "../styles/EntradasRecientes.css";

const EntradasRecientes = ({ albums, onFilter }) => {
  return (
    <div className="entradas-recientes">
      <h3>Entradas Recientes</h3>
      <ul>
        {albums.slice(-5).map((album) => (
          <li key={album.id}>
            <button className="filter-btn" onClick={() => onFilter(album.titulo)}>
              {album.titulo}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntradasRecientes;
