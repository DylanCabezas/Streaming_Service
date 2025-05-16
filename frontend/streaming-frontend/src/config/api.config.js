const API_CONFIG = {
  // Auth Service
  AUTH_SERVICE: {
    BASE_URL: process.env.REACT_APP_AUTH_SERVICE_URL || 'http://34.235.32.210:8001/api',
    ENDPOINTS: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh-token',
      VERIFY_TOKEN: '/auth/verify-token'
    }
  },

  // Content Service
  CONTENT_SERVICE: {
    BASE_URL: process.env.REACT_APP_CONTENT_SERVICE_URL || 'http://34.235.32.210:8001/api',
    ENDPOINTS: {
      MOVIES: '/movies',
      SERIES: '/series',
      CATEGORIES: '/categories',
      SEARCH: '/search'
    }
  },

  // User Service
  USER_SERVICE: {
    BASE_URL: process.env.REACT_APP_USER_SERVICE_URL || 'http://34.235.32.210:8001/api',
    ENDPOINTS: {
      CREATE_USER: '/user', 
      GET_USERS: '/users',  
      GET_USER_BY_ID: '/user', 
      UPDATE_USER: '/user',
      DELETE_USER: '/user',
      ADD_FAVORITE: '/favorite',
      DELETE_FAVORITE: '/favorite',
      GET_FAVORITES: '/favorites'
    }
  },

  // Payment Service
  PAYMENT_SERVICE: {
    BASE_URL: process.env.REACT_APP_PAYMENT_SERVICE_URL || 'http://34.235.32.210:8001/api',
    ENDPOINTS: {
      SUBSCRIPTIONS: '/payments/subscriptions',
      PLANS: '/payments/plans',
      TRANSACTIONS: '/payments/transactions'
    }
  },

  // History Service
  HISTORIAL_SERVICE: {
    BASE_URL: process.env.REACT_APP_HISTORIAL_SERVICE_URL || 'http://34.235.32.210:8001/api',
    ENDPOINTS: {
      GET_HISTORIAL: '/historial',
      ADD_HISTORIAL: '/historial',
      CLEAR_HISTORIAL: '/historial',
      REMOVE_VIDEO_FROM_HISTORIAL: '/historial'
    }
  }
};

export default API_CONFIG;
