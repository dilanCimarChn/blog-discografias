function databaseConfig(env = process.env) {
  for (const name of ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']) {
    if (typeof env[name] !== 'string' || (name !== 'DB_PASSWORD' && !env[name].trim())) {
      throw new Error(`Missing database configuration: ${name}`);
    }
  }
  const port = Number(env.DB_PORT || 3306);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid DB_PORT');
  return { host: env.DB_HOST, user: env.DB_USER, password: env.DB_PASSWORD, database: env.DB_NAME, port };
}
module.exports = { databaseConfig };
