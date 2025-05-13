import apiService from './api.service';
import API_CONFIG from '../config/api.config';

class AuthService {
  async login(email, password) {
    try {
      const response = await apiService.login({ email, password });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(userData) {
    try {
      const response = await apiService.register(userData);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage even if the API call fails
      apiService.handleLogout();
    }
  }


  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { data, status } = error.response;
      return {
        message: data.message || 'An error occurred',
        status,
        data
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        message: 'No response from server',
        status: 0
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        message: error.message || 'An error occurred',
        status: 0
      };
    }
  }
}

export default new AuthService(); 