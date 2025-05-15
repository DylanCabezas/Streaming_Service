import { userAPI } from './api.service';
import API_CONFIG from '../config/api.config';

class UserService {
  async getUsers() {
    const response = await userAPI.get(API_CONFIG.USER_SERVICE.ENDPOINTS.GET_USERS);
    return response.data;
  }

  async getUserById(userId) {
    const response = await userAPI.get(`${API_CONFIG.USER_SERVICE.ENDPOINTS.GET_USER_BY_ID}/${userId}`);
    return response.data;
  }

  async updateUser(userId, userData) {
    const response = await userAPI.patch(`${API_CONFIG.USER_SERVICE.ENDPOINTS.UPDATE_USER}/${userId}`, userData);
    return response.data;
  }

  async deleteUser(userId) {
    const response = await userAPI.delete(`${API_CONFIG.USER_SERVICE.ENDPOINTS.DELETE_USER}/${userId}`);
    return response.data;
  }

  async addFavorite(favoriteData) {
    const response = await userAPI.post(API_CONFIG.USER_SERVICE.ENDPOINTS.ADD_FAVORITE, favoriteData);
    return response.data;
  }

  async deleteFavorite(videoId) {
    const response = await userAPI.delete(`${API_CONFIG.USER_SERVICE.ENDPOINTS.DELETE_FAVORITE}/${videoId}`);
    return response.data;
  }

  async getFavorites(userId) {
    const response = await userAPI.get(`${API_CONFIG.USER_SERVICE.ENDPOINTS.GET_FAVORITES}/${userId}`);
    return response.data;
  }
}

export default new UserService();
