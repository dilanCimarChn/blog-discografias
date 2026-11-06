import { test } from 'node:test';
import assert from 'node:assert/strict';
import { apiGet } from './api.js';

test('apiGet requests the API prefix and returns parsed JSON', async () => {
  const result = await apiGet('/albums', { fetchImpl: async (url) => {
    assert.equal(url, '/api/albums');
    return { ok: true, json: async () => [{ id: 1 }] };
  } });
  assert.deepEqual(result, [{ id: 1 }]);
});

test('apiGet maps missing resources and server errors to safe messages', async () => {
  await assert.rejects(apiGet('albums/999', {
    fetchImpl: async () => ({ ok: false, status: 404 }),
  }), (error) => error.status === 404 && error.message === 'Recurso no encontrado.');
  await assert.rejects(apiGet('albums', {
    fetchImpl: async () => ({ ok: false, status: 500 }),
  }), (error) => error.status === 500 && !error.message.includes('SQL'));
});

test('apiGet forwards cancellation to fetch', async () => {
  const controller = new AbortController();
  await apiGet('albums', { signal: controller.signal, fetchImpl: async (_url, options) => {
    assert.equal(options.signal, controller.signal);
    return { ok: true, json: async () => [] };
  } });
});
