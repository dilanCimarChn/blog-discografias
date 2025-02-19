import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AlbumCard.css";

const AlbumCard = ({ albums }) => {
  const navigate = useNavigate();

  return (
    <div className="album-list">
      {albums.length > 0 ? (
        albums.map((album) => (
          <div
            key={album.id}
            className="album-card"
            onClick={() => navigate(`/album/${album.id}`)}
          >
            <img src={album.imagen_url} alt={album.titulo} />
            <h2>{album.titulo}</h2>
            <p>{album.descripcion}</p>
            <p><strong>Autor:</strong> {album.autor}</p>
            <a href={album.enlace_descarga} className="download-btn" onClick={(e) => e.stopPropagation()}>Descargar</a>
          </div>
        ))
      ) : (
        <p>No se encontraron resultados...</p>
      )}
    </div>
  );
};

export default AlbumCard;
