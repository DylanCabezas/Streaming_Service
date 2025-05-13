const API_CONFIG = {

  // Content Service
  CONTENT_SERVICE: {
    BASE_URL: process.env.REACT_APP_CONTENT_SERVICE_URL || 'http://localhost:8080',
    ENDPOINTS: {
      MOVIES: '/api/movies',
      SERIES: '/api/series',
      CATEGORIES: '/api/categories',
      SEARCH: '/api/search'
    }
  },

  // User Service
  USER_SERVICE: {
    BASE_URL: "http://localhost:8001",  // falta link del balanceador de carga reemplazar :p,
    //  8001 porque en user está expuesto en docker-compose
    ENDPOINTS: {
      CREATE_USER: "/user", 
      GET_USERS: "/users",  
      GET_USER_BY_ID: "/user", 
      UPDATE_USER: "/user",
      DELETE_USER: "/user",
      ADD_FAVORITE: "/favorite",
      DELETE_FAVORITE: "/favorite",
      GET_FAVORITES: "/favorites",
      LOGIN: "/login"
    }
  },

  
  CONTENT_SERVICE: {
      BASE_URL: "http://localhost:5000/content",  // URL del balanceador de carga o la URL base del servicio de contenido
      ENDPOINTS: {
        GET_ALL_VIDEOS: "/video",  // Obtener todos los videos
        GET_VIDEO_BY_ID: "/video",  // Obtener video por ID
        GET_VIDEOS_BY_GENRE: "/video/genre",  // Obtener videos por género
        SEARCH_VIDEOS: "/video/search",  // Buscar videos
        ADD_RATING: "/rating",  // Agregar calificación
        GET_RATINGS_BY_VIDEO_ID: "/rating"  // Obtener calificaciones por ID de video
      }
    },

  // History Service
  HISTORIAL_SERVICE: {
    BASE_URL: "http://localhost:5000/api",  //balanceador
    ENDPOINTS: {
      GET_HISTORIAL: "/historial",  // Obtener historial de un usuario
      ADD_HISTORIAL: "/historial",  // Agregar un video al historial
      CLEAR_HISTORIAL: "/historial",  // Limpiar historial de un usuario
      REMOVE_VIDEO_FROM_HISTORIAL: "/historial"  // Eliminar un video específico del historial
    }
  }
};

export default API_CONFIG; 