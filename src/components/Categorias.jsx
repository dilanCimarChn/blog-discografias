import React from "react";
import "../styles/Categorias.css";

const Categorias = ({ categorias, onFilter }) => {
  return (
    <div className="categorias">
      <h3>Categorías</h3>
      <ul>
        <li>
          <button className="filter-btn all-btn" onClick={() => onFilter("")}>
            🔄 Filtrar Todos los Albums
          </button>
        </li>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <button className="filter-btn" onClick={() => onFilter(categoria.nombre)}>
              {categoria.nombre}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;
