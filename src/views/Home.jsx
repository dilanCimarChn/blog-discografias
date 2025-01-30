import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Buscador from "../components/Buscador";
import Categorias from "../components/Categorias";
import EntradasRecientes from "../components/EntradasRecientes";
import AlbumCard from "../components/AlbumCard";
import "../styles/Home.css";

// Función para normalizar texto (eliminar tildes y caracteres especiales)
const normalizeText = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [canciones, setCanciones] = useState([]);
  const [filteredCanciones, setFilteredCanciones] = useState([]);

  // ✅ Cargar datos al inicio
  useEffect(() => {
    fetch("http://localhost:5000/api/albums")
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setFilteredAlbums(data);
      });

    fetch("http://localhost:5000/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data));

    fetch("http://localhost:5000/api/canciones")
      .then((res) => res.json())
      .then((data) => {
        setCanciones(data);
        setFilteredCanciones(data);
      });
  }, []);

  // ✅ Aplicar filtro desde la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter");

    if (filter) {
      applyFilter(filter);
    } else {
      // 🔹 Si no hay filtro, mostrar todos los álbumes y canciones
      setFilteredAlbums(albums);
      setFilteredCanciones(canciones);
    }
  }, [location.search, albums, canciones]);

  // ✅ Función para aplicar el filtro
  const applyFilter = (term) => {
    const normalizedTerm = normalizeText(term);

    if (!term || normalizedTerm === "") {
      setFilteredAlbums(albums);
      setFilteredCanciones(canciones);
      navigate("/"); // 🔹 Redirigir a Inicio sin filtros
    } else {
      const filteredAlbums = albums.filter((album) => {
        const tituloNormalizado = normalizeText(album.titulo);
        const autorNormalizado = normalizeText(album.autor);
        return (
          tituloNormalizado.includes(normalizedTerm) ||
          autorNormalizado.includes(normalizedTerm)
        );
      });

      const filteredCanciones = canciones.filter((cancion) => {
        const tituloNormalizado = normalizeText(cancion.titulo);
        const autorNormalizado = normalizeText(cancion.autor);
        return (
          tituloNormalizado.includes(normalizedTerm) ||
          autorNormalizado.includes(normalizedTerm)
        );
      });

      setFilteredAlbums(filteredAlbums);
      setFilteredCanciones(filteredCanciones);
    }
  };

  return (
    <div className="home-container">
      <div className="left-column">
        <h1>Inicio</h1>
        <AlbumCard albums={filteredAlbums} />

        {filteredCanciones.length > 0 && (
          <div className="filtered-songs">
            <h2>Lista de Canciones</h2>
            <ul>
              {filteredCanciones.map((cancion) => (
                <li key={cancion.id} className="song-item">
                  🎵 {cancion.titulo} - <strong>{cancion.autor}</strong>
                  <a href={cancion.enlace_descarga} className="download-btn">
                    📥 Descargar
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="right-column">
        <Buscador onSearch={(term) => navigate(`/?filter=${encodeURIComponent(term)}`)} />
        <EntradasRecientes albums={albums} onFilter={(term) => navigate(`/?filter=${encodeURIComponent(term)}`)} />
        <Categorias categorias={categorias} onFilter={(term) => term ? navigate(`/?filter=${encodeURIComponent(term)}`) : navigate("/") } />
      </div>
    </div>
  );
};

export default Home;
