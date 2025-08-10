import axios from 'axios';
import { API_BASE_URL } from './api';

const API_URL = `${API_BASE_URL}/auth/login`; // Backend login endpoint

const AuthService = {
  login: async (username: string, password: string): Promise<any> => {
    try {
      console.log('Attempting to log in to API URL:', API_URL);
      const response = await axios.post(API_URL, {
        login: username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return { success: true, message: 'Login successful', token: response.data.token, role: response.data.role };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, message: error.response?.data?.message || 'Invalid credentials' };
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
};

export default AuthService;
