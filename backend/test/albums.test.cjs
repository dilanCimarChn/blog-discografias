const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createHandlers } = require('../routes/albums');
function response() {
  return { code: 200, status(code) { this.code = code; return this; }, json(value) { this.value = value; return this; } };
}
test('invalid identifiers never reach the database', () => {
  const h = createHandlers({ query() { assert.fail('database was called'); } });
  for (const id of ['-1', '0', '1 OR 1=1', '1.2', '', '90071992547409999999']) {
    const res = response(); h.album({ params: { id } }, res); assert.equal(res.code, 400);
  }
});
test('album query is parameterized and returns a row', () => {
  const res = response();
  createHandlers({ query(sql, values, done) {
    assert.ok(sql.endsWith('id = ?')); assert.deepEqual(values, [7]); done(null, [{ id: 7 }]);
  } }).album({ params: { id: '7' } }, res);
  assert.deepEqual(res.value, { id: 7 });
});
test('missing album is 404, database errors do not leak details', () => {
  const missing = response();
  createHandlers({ query(sql, values, done) { done(null, []); } }).album({ params: { id: '1' } }, missing);
  assert.equal(missing.code, 404);
  const failed = response();
  createHandlers({ query(sql, values, done) { done(new Error('SELECT password FROM private')); } }).albums({}, failed);
  assert.equal(failed.code, 500);
  assert.ok(!JSON.stringify(failed.value).includes('password'));
});
test('song filters reject arrays and use an optional positive ID', () => {
  const invalid = response();
  createHandlers({ query() { assert.fail(); } }).songs({ query: { album_id: ['1','2'] } }, invalid);
  assert.equal(invalid.code, 400);
  const res = response();
  createHandlers({ query(sql, values, done) { assert.deepEqual(values, [2]); done(null, []); } }).songs({ query: { album_id: '2' } }, res);
  assert.deepEqual(res.value, []);
});
