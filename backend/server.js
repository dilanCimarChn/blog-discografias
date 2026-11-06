const connection = require('./config/db');
const { createApp } = require('./app');
const port = Number(process.env.PORT || 5000);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
const server = createApp(connection).listen(port, '127.0.0.1', () => console.log(`API: http://localhost:${port}`));
function close() { server.close(() => connection.end()); }
process.once('SIGINT', close);
process.once('SIGTERM', close);
