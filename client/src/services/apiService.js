
// URL base de tu backend
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function apiFetch(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessTokenMemory) {
    headers['Authorization'] = `Bearer ${accessTokenMemory}`;
  }

  const config = {
    ...options,
    credentials: 'include',
    headers,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  // 1. Realizamos la petición original
  let response = await fetch(`${BASE_URL}${endpoint}`, config);

  // 2. Si la respuesta es 401 (no autorizado / token expirado)
  if (response.status === 401) {
    try {
      // Intentamos refrescar el token
      const refreshResponse = await fetch(`${BASE_URL}/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        
        // Guardamos el nuevo accessToken en RAM
        setAccessToken(data.accessToken);

        // Actualizamos los headers con el nuevo token y REINTENTAMOS la petición
        config.headers['Authorization'] = `Bearer ${data.accessToken}`;
        response = await fetch(`${BASE_URL}${endpoint}`, config);
      } else {
        // Si el refreshToken también expiró o es inválido, limpiamos la RAM
        setAccessToken(null);
      }
    } catch (error) {
      setAccessToken(null);
    }
  }

  return response;
}

// Variable privada en memoria RAM (se limpia si el usuario recarga la página F5)
let accessTokenMemory = null;

// Métodos para actualizar y obtener el token de la memoria
export const setAccessToken = (token) => {
  accessTokenMemory = token;
};

export const getAccessToken = () => accessTokenMemory;