const API_CONFIG = {
  // Auth Service
  AUTH_SERVICE: {
    BASE_URL: process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:3001',
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
    BASE_URL: process.env.REACT_APP_USER_SERVICE_URL || 'http://localhost:3000',
    ENDPOINTS: {
      USERS: '/users',
      USER: '/user',
      FAVORITES: '/favorites',
      FAVORITE: '/favorite'
    }
  },

  // Payment Service
  PAYMENT_SERVICE: {
    BASE_URL: process.env.REACT_APP_PAYMENT_SERVICE_URL || 'http://localhost:3004',
    ENDPOINTS: {
      SUBSCRIPTIONS: '/payments/subscriptions',
      PLANS: '/payments/plans',
      TRANSACTIONS: '/payments/transactions'
    }
  },

  // History Service
  HISTORY_SERVICE: {
    BASE_URL: process.env.REACT_APP_HISTORY_SERVICE_URL || 'http://localhost:3001',
    ENDPOINTS: {
      HISTORY: '/history',
      WATCH: '/watch'
    }
  }
};

export default API_CONFIG; 