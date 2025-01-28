import React, { useState, useEffect } from "react";
import Buscador from "../components/Buscador";
import Categorias from "../components/Categorias";
import EntradasRecientes from "../components/EntradasRecientes";
import AlbumCard from "../components/AlbumCard";
import "../styles/Home.css";

// Función para normalizar texto (eliminar tildes y caracteres especiales)
const normalizeText = (text) => {
  return text
    .normalize("NFD") // Descompone caracteres acentuados en su forma base
    .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
    .toLowerCase(); // Convierte todo a minúsculas
};

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/albums")
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setFilteredAlbums(data);
      })
      .catch((error) => console.error("Error al obtener álbumes:", error));

    fetch("http://localhost:5000/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  // Función de búsqueda mejorada (omite tildes y busca similitudes)
  const handleSearch = (term) => {
    const normalizedTerm = normalizeText(term);

    if (normalizedTerm === "") {
      setFilteredAlbums(albums);
    } else {
      const filtered = albums.filter((album) => {
        const tituloNormalizado = normalizeText(album.titulo);
        const autorNormalizado = normalizeText(album.autor);
        const descripcionNormalizada = normalizeText(album.descripcion || "");

        return (
          tituloNormalizado.includes(normalizedTerm) ||
          autorNormalizado.includes(normalizedTerm) ||
          descripcionNormalizada.includes(normalizedTerm)
        );
      });

      setFilteredAlbums(filtered);
    }
  };

  return (
    <div className="home-container">
      <div className="left-column">
        <h1>Inicio</h1>
        <AlbumCard albums={filteredAlbums} />
      </div>
      <div className="right-column">
        <Buscador onSearch={handleSearch} />
        <EntradasRecientes albums={albums} onFilter={handleSearch} />
        <Categorias categorias={categorias} onFilter={handleSearch} />
      </div>
    </div>
  );
};

export default Home;
