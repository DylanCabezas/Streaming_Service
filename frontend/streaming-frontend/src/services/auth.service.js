import { userAPI } from './api.service';
import API_CONFIG from '../config/api.config';

class AuthService {
  async login(email, password) {
    try {
      const response = await userAPI.post(API_CONFIG.USER_SERVICE.ENDPOINTS.LOGIN, { email, password });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(userData) {
    try {
      const response = await userAPI.post(API_CONFIG.USER_SERVICE.ENDPOINTS.REGISTER, userData);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      await userAPI.post(API_CONFIG.USER_SERVICE.ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
      this.handleLogout();
    }
  }

  async verifyToken() {
    try {
      const response = await userAPI.get(API_CONFIG.USER_SERVICE.ENDPOINTS.VERIFY_TOKEN);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  handleError(error) {
    if (error.response) {
      const { data, status } = error.response;
      return {
        message: data.message || 'An error occurred',
        status,
        data,
      };
    } else if (error.request) {
      return {
        message: 'No response from server',
        status: 0,
      };
    } else {
      return {
        message: error.message || 'An error occurred',
        status: 0,
      };
    }
  }

  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }
}

export default new AuthService();
