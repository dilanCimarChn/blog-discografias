const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog_discografias",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a la base de datos MySQL");
});

// ✅ Ruta para obtener todas las categorías
app.get("/api/categorias", (req, res) => {
  connection.query("SELECT * FROM categorias", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(Array.isArray(results) ? results : []);
  });
});

// ✅ Ruta para obtener todos los álbumes
app.get("/api/albums", (req, res) => {
  connection.query("SELECT * FROM albums", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(Array.isArray(results) ? results : []);
  });
});

// ✅ Ruta para obtener un álbum específico por ID
app.get("/api/albums/:id", (req, res) => {
  const albumId = req.params.id;
  connection.query("SELECT * FROM albums WHERE id = ?", [albumId], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error en la consulta" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Álbum no encontrado" });
      return;
    }
    res.json(results[0]);
  });
});

// ✅ Ruta para obtener todas las canciones o canciones de un álbum específico
app.get("/api/canciones", (req, res) => {
  const albumId = req.query.album_id;

  let query = "SELECT * FROM canciones";
  let params = [];

  if (albumId) {
    query += " WHERE album_id = ?";
    params.push(albumId);
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error en la consulta" });
      return;
    }
    res.json(Array.isArray(results) ? results : []);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
