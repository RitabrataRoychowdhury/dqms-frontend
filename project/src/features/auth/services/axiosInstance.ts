import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/api/v1/keycloak';

const authAPI = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authAPI;
