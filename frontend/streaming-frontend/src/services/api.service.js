import axios from 'axios';
import API_CONFIG from '../config/api.config';

// Función para crear instancia axios con interceptores para auth (token, refresh)
function createAxiosInstance(baseURL) {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  });

  // Interceptor para agregar token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor para refrescar token solo para la instancia Auth
  if (baseURL === (process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:8000/api')) {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await instance.post(
              API_CONFIG.AUTH_SERVICE.ENDPOINTS.REFRESH_TOKEN,
              { refreshToken }
            );
            const { token } = response.data;
            localStorage.setItem('token', token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          } catch (refreshError) {
            // Si falla refresco, limpia tokens y redirige a login
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  return instance;
}


const userAPI = createAxiosInstance(
  process.env.REACT_APP_USER_SERVICE_URL || 'http://localhost:8001/api'
);

const contentAPI = createAxiosInstance(
  process.env.REACT_APP_CONTENT_SERVICE_URL || 'http://localhost:8080/api'
);

const historialAPI = createAxiosInstance(
  process.env.REACT_APP_HISTORIAL_SERVICE_URL || 'http://localhost:3001/api'
);

export { userAPI, contentAPI, historialAPI };
