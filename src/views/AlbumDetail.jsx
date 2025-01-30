import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Categorias from "../components/Categorias";
import EntradasRecientes from "../components/EntradasRecientes";
import "../styles/AlbumDetail.css";

const AlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [canciones, setCanciones] = useState([]);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/albums/${id}`)
      .then((res) => res.json())
      .then((data) => setAlbum(data))
      .catch((error) => setError(error.message));

    fetch(`http://localhost:5000/api/canciones?album_id=${id}`)
      .then((res) => res.json())
      .then((data) => setCanciones(data));

    fetch("http://localhost:5000/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data));

    fetch("http://localhost:5000/api/albums")
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, [id]);

  // ✅ Aplicar filtro y redirigir correctamente a Inicio con el filtro activo
  const handleFilter = (term) => {
    navigate(`/?filter=${encodeURIComponent(term)}`);
  };

  if (error) return <p>Error al cargar datos: {error}</p>;
  if (!album) return <p>Cargando detalles del álbum...</p>;

  return (
    <div className="album-detail-container">
      <div className="left-column">
        <h1>{album.titulo}</h1>
        <p><strong>Autor:</strong> {album.autor}</p>
        <p>{album.descripcion}</p>
        <img src={album.imagen_url} alt={album.titulo} className="album-cover" />
        
        <h2>Lista de Canciones</h2>
        <div className="song-list">
          {canciones.length > 0 ? (
            canciones.map((cancion) => (
              <div key={cancion.id} className="song-item">
                <button 
                  className="song-title" 
                  onClick={() => setSelectedSong(selectedSong === cancion.id ? null : cancion.id)}
                >
                  🎵 {cancion.titulo}
                </button>
                {selectedSong === cancion.id && (
                  <div className="song-details">
                    <p><strong>Año:</strong> {cancion.anio_lanzamiento}</p>
                    <p><strong>Autor:</strong> {cancion.autor}</p>
                    <a href={cancion.enlace_descarga} className="download-btn">📥 Descargar</a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No hay canciones registradas</p>
          )}
        </div>
      </div>

      <div className="right-column">
        <EntradasRecientes albums={albums} onFilter={handleFilter} />
        <Categorias categorias={categorias} onFilter={handleFilter} />
      </div>
    </div>
  );
};

export default AlbumDetail;
