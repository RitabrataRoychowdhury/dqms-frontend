import { IAuthService } from '../../../types/services/IAuthService';
import authAPI from './axiosInstance';

export const authService: IAuthService = {
  login: async (email, password) => {
    const { data } = await authAPI.post('/login', { email, password });
    return data;
  },

  // NEW: Login with email only — used when session cookie is present
  loginWithSession: async (email) => {
    const { data } = await authAPI.post('/login', { email });
    return data;
  },

  register: async (user) => {
    const { data } = await authAPI.post('/register', user);
    return data;
  },

  logout: async (refreshToken) => {
    await authAPI.post('/logout', { refreshToken });
  },

  getUserInfo: async (token) => {
    const { data } = await authAPI.get('/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  validateToken: async (token) => {
    try {
      await authAPI.get('/validate', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch {
      return false;
    }
  },
};
