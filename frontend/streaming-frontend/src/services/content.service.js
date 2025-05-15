import { contentAPI } from './api.service';
import API_CONFIG from '../config/api.config';

class ContentService {
  async getAllVideos() {
    const response = await contentAPI.get(API_CONFIG.CONTENT_SERVICE.ENDPOINTS.MOVIES);
    return response.data;
  }

  async getVideoById(videoId) {
    const response = await contentAPI.get(`${API_CONFIG.CONTENT_SERVICE.ENDPOINTS.MOVIES}/${videoId}`);
    return response.data;
  }

  async getVideosByGenre(genre) {
    const response = await contentAPI.get(API_CONFIG.CONTENT_SERVICE.ENDPOINTS.SEARCH, { params: { genre } });
    return response.data;
  }

  async searchVideos({ title, genre, keyword }) {
    const response = await contentAPI.get(API_CONFIG.CONTENT_SERVICE.ENDPOINTS.SEARCH, {
      params: { title, genre, keyword },
    });
    return response.data;
  }

  async addRating(videoId, rating) {
    const response = await contentAPI.post(API_CONFIG.CONTENT_SERVICE.ENDPOINTS.ADD_RATING, { videoId, rating });
    return response.data;
  }

  async getRatingsByVideoId(videoId) {
    const response = await contentAPI.get(`${API_CONFIG.CONTENT_SERVICE.ENDPOINTS.GET_RATINGS_BY_VIDEO_ID}/${videoId}`);
    return response.data;
  }
}

export default new ContentService();
