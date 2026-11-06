function positiveId(value) {
  if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}
function createHandlers(connection) {
  const query = (sql, params, res, single = false) => connection.query(sql, params, (error, rows) => {
    if (error) return res.status(500).json({ error: 'No se pudieron consultar los datos.' });
    if (single && !rows.length) return res.status(404).json({ error: 'Álbum no encontrado.' });
    return res.json(single ? rows[0] : rows);
  });
  return {
    albums: (req, res) => query('SELECT * FROM albums', [], res),
    categories: (req, res) => query('SELECT * FROM categorias', [], res),
    album: (req, res) => {
      const id = positiveId(req.params.id);
      return id === null ? res.status(400).json({ error: 'ID no válido.' })
        : query('SELECT * FROM albums WHERE id = ?', [id], res, true);
    },
    songs: (req, res) => {
      if (req.query.album_id === undefined) return query('SELECT * FROM canciones', [], res);
      const id = positiveId(req.query.album_id);
      return id === null ? res.status(400).json({ error: 'ID no válido.' })
        : query('SELECT * FROM canciones WHERE album_id = ?', [id], res);
    },
  };
}
module.exports = { createHandlers, positiveId };
