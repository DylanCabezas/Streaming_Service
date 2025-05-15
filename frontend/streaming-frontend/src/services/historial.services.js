import { historialAPI } from './api.service';

class HistorialService {
  async addToHistorial(userId, videoId) {
    const response = await historialAPI.post('/historial', {
      user_id: userId,
      video_id: videoId,
    });
    return response.data;
  }

  async getHistorial(userId) {
    const response = await historialAPI.get('/historial', {
      params: { user_id: userId },
    });
    return response.data;
  }

  async clearHistorial(userId) {
    const response = await historialAPI.delete('/historial', {
      params: { user_id: userId },
    });
    return response.data;
  }

  async removeFromHistorial(userId, videoId) {
    const response = await historialAPI.put(`/historial/${videoId}`, {
      user_id: userId,
    });
    return response.data;
  }
}

export default new HistorialService();
