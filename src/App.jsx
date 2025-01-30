import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Nosotros from "./views/Nosotros";
import AlbumDetail from "./views/AlbumDetail"; // Importar nueva vista

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/album/:id" element={<AlbumDetail />} /> {/* Nueva Ruta */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
