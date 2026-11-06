const { test } = require('node:test');
const assert = require('node:assert/strict');
const { databaseConfig } = require('../config/environment');
test('database configuration has no hidden credential fallback', () => {
  assert.throws(() => databaseConfig({}), /DB_HOST/);
  const env = { DB_HOST: 'localhost', DB_USER: 'demo', DB_PASSWORD: '', DB_NAME: 'demo' };
  assert.equal(databaseConfig(env).port, 3306);
  assert.throws(() => databaseConfig({ ...env, DB_PORT: '99999' }), /DB_PORT/);
});
