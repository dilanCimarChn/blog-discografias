const base = (import.meta.env?.VITE_API_URL || '/api').replace(/\/$/, '');
export async function apiGet(path, { signal, fetchImpl = globalThis.fetch } = {}) {
  const response = await fetchImpl(`${base}/${path.replace(/^\//, '')}`, { signal });
  if (!response.ok) {
    const error = new Error(response.status === 404 ? 'Recurso no encontrado.' : 'No se pudo consultar el catálogo.');
    error.status = response.status;
    throw error;
  }
  return response.json();
}
