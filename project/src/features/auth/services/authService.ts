import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/api/v1/keycloak';

// Setup axios instance with default config
const authAPI = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token in requests
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interface RegisterDto {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  isEmailVerified: boolean;
  isDeleted: boolean;
}

interface AuthRequest {
  email: string;
  password: string;
}

interface LogOutRequest {
  refreshToken: string;
}

interface NewRealmDto {
  realm: string;
  displayName: string;
  displayNameHtml: string;
  enabled: boolean;
  sslRequired: string;
  registrationAllowed: boolean;
  registrationEmailAsUsername: boolean;
  editUsernameAllowed: boolean;
  resetPasswordAllowed: boolean;
  verifyEmail: boolean;
  rememberMe: boolean;
  loginWithEmailAllowed: boolean;
  duplicateEmailsAllowed: boolean;
  adminUsername: string;
  adminPassword: string;
}

export const registerUser = async (userData: RegisterDto) => {
  try {
    const response = await authAPI.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await authAPI.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async (refreshToken: string) => {
  try {
    const response = await authAPI.post('/logout', { refreshToken });
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const validateToken = async (token: string) => {
  try {
    const response = await authAPI.get('/validate', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

export const getUserInfo = async (token: string) => {
  try {
    const response = await authAPI.get('/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Get user info error:', error);
    throw error;
  }
};

export const assignRole = async (userId: string, roleName: string) => {
  try {
    const response = await authAPI.post('/assign', null, {
      params: { userId, roleName }
    });
    return response.data;
  } catch (error) {
    console.error('Assign role error:', error);
    throw error;
  }
};

export const removeRole = async (userId: string, roleName: string) => {
  try {
    const response = await authAPI.post('/remove', null, {
      params: { userId, roleName }
    });
    return response.data;
  } catch (error) {
    console.error('Remove role error:', error);
    throw error;
  }
};

export const getAllRoles = async () => {
  try {
    const response = await authAPI.get('/all');
    return response.data.roles;
  } catch (error) {
    console.error('Get all roles error:', error);
    throw error;
  }
};

export const createRealm = async (realmData: NewRealmDto) => {
  try {
    const response = await authAPI.post('/', realmData);
    return response.data;
  } catch (error) {
    console.error('Create realm error:', error);
    throw error;
  }
};