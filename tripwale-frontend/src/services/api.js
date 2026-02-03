import axios from 'axios'

// Base URL for API - in production, this would be your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error
    
    if (response) {
      // Handle different HTTP status codes
      switch (response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken')
          window.location.href = '/auth/login'
          break
        case 403:
          // Forbidden
          console.error('Access forbidden')
          break
        case 404:
          // Not found
          console.error('Resource not found')
          break
        case 500:
          // Server error
          console.error('Server error occurred')
          break
        default:
          console.error('API Error:', response.data?.message || 'Unknown error')
      }
    } else {
      // Network error or timeout
      console.error('Network error. Please check your connection.')
    }
    
    return Promise.reject(error)
  }
)

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
}

// Packages API endpoints
export const packagesAPI = {
  getAll: (params = {}) => api.get('/packages', { params }),
  getById: (id) => api.get(`/packages/${id}`),
  search: (query) => api.get('/packages/search', { params: query }),
  getFeatured: () => api.get('/packages/featured'),
  getPopular: () => api.get('/packages/popular'),
  create: (packageData) => api.post('/packages', packageData),
  update: (id, packageData) => api.put(`/packages/${id}`, packageData),
  delete: (id) => api.delete(`/packages/${id}`),
}

// Destinations API endpoints
export const destinationsAPI = {
  getAll: () => api.get('/destinations'),
  getById: (id) => api.get(`/destinations/${id}`),
  getPopular: () => api.get('/destinations/popular'),
  search: (query) => api.get('/destinations/search', { params: { query } }),
}

// Bookings API endpoints
export const bookingsAPI = {
  getAll: () => api.get('/bookings'),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (bookingData) => api.post('/bookings', bookingData),
  update: (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
  cancel: (id) => api.delete(`/bookings/${id}`),
  getUserBookings: (userId) => api.get(`/bookings/user/${userId}`),
}

// User API endpoints
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.post('/users/change-password', passwordData),
  getFavorites: () => api.get('/users/favorites'),
  addFavorite: (packageId) => api.post('/users/favorites', { packageId }),
  removeFavorite: (packageId) => api.delete(`/users/favorites/${packageId}`),
}

// Reviews API endpoints
export const reviewsAPI = {
  getByPackage: (packageId) => api.get(`/reviews/package/${packageId}`),
  create: (reviewData) => api.post('/reviews', reviewData),
  update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  delete: (id) => api.delete(`/reviews/${id}`),
  getRecent: () => api.get('/reviews/recent'),
}

// Newsletter API endpoints
export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
  unsubscribe: (email) => api.post('/newsletter/unsubscribe', { email }),
}

// Contact API endpoints
export const contactAPI = {
  sendMessage: (messageData) => api.post('/contact', messageData),
}

// Helper functions for local storage
export const storage = {
  setToken: (token) => localStorage.setItem('authToken', token),
  getToken: () => localStorage.getItem('authToken'),
  removeToken: () => localStorage.removeItem('authToken'),
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },
  clear: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },
}

// Mock API functions for development (will be replaced with real API calls)
export const mockAPI = {
  // Simulate API delay
  delay: (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Simulate successful response
  success: (data, message = 'Success') => ({
    success: true,
    data,
    message,
  }),
  
  // Simulate error response
  error: (message = 'Error occurred', status = 400) => ({
    success: false,
    error: message,
    status,
  }),
}

export default api