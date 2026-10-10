/**
 * Lee un archivo JSON estático y devuelve su contenido.
 * Lanza un Error si la respuesta no es exitosa.
 */
export async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`No se pudo cargar ${path} (${response.status})`);
  }
  return response.json();
}