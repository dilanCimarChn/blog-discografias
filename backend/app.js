const express = require('express');
const cors = require('cors');
const { createHandlers } = require('./routes/albums');
function createApp(connection) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  const handlers = createHandlers(connection);
  app.get('/api/albums', handlers.albums);
  app.get('/api/categorias', handlers.categories);
  app.get('/api/albums/:id', handlers.album);
  app.get('/api/canciones', handlers.songs);
  return app;
}
module.exports = { createApp };
