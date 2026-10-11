import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('smop_session');
  if (token) {
    const parsed = JSON.parse(token) as { token?: string };
    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('smop_session');
      localStorage.removeItem('smop_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
