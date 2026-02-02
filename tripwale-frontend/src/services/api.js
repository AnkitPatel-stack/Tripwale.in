import axios from 'axios';

// API base URL - will be replaced with actual backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

// Tours API calls
export const toursAPI = {
  getAllTours: (params) => api.get('/tours', { params }),
  getTourById: (id) => api.get(`/tours/${id}`),
  createTour: (tourData) => api.post('/tours', tourData),
  updateTour: (id, tourData) => api.put(`/tours/${id}`, tourData),
  deleteTour: (id) => api.delete(`/tours/${id}`),
  searchTours: (query) => api.get('/tours/search', { params: query }),
  getTourReviews: (id) => api.get(`/tours/${id}/reviews`),
  addTourReview: (id, reviewData) => api.post(`/tours/${id}/reviews`, reviewData),
};

// Destinations API calls
export const destinationsAPI = {
  getAllDestinations: () => api.get('/destinations'),
  getPopularDestinations: () => api.get('/destinations/popular'),
  getDestinationById: (id) => api.get(`/destinations/${id}`),
};

// Bookings API calls
export const bookingsAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: () => api.get('/bookings'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  cancelBooking: (id) => api.delete(`/bookings/${id}`),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  getBookingInvoice: (id) => api.get(`/bookings/${id}/invoice`),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwords) => api.put('/users/change-password', passwords),
  uploadAvatar: (formData) => api.post('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

// Contact API calls
export const contactAPI = {
  sendMessage: (messageData) => api.post('/contact', messageData),
  subscribeNewsletter: (email) => api.post('/contact/newsletter', { email }),
};

// Mock API calls for frontend development
export const mockAPI = {
  // Simulate API delay
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Mock login
  mockLogin: async (credentials) => {
    await mockAPI.delay(1000);
    return {
      data: {
        user: {
          id: 1,
          name: 'Demo User',
          email: credentials.email,
          role: 'user',
        },
        token: 'mock-jwt-token',
      },
    };
  },
  
  // Mock tour data
  mockTours: async (params = {}) => {
    await mockAPI.delay(500);
    // Filter mock data based on params
    return {
      data: {
        tours: [], // Will be populated from data.js
        total: 0,
        page: 1,
        limit: 10,
      },
    };
  },
};

export default api;