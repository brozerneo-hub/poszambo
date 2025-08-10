import axios from 'axios';
import AuthService from './auth.service';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:5101/poszambo/us-central1/api'; // Replace xxxx with your Firebase project ID

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add the JWT token to requests
api.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { API_BASE_URL, api };
