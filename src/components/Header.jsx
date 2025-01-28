import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // Importar estilos

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">Folklore Boliviano</h1>
      <nav className="nav">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
