import axios from 'axios'

// In dev: Vite proxy forwards /api to localhost:5000 (no CORS issues)
// In prod: set VITE_API_URL=https://your-backend.com/api
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Request interceptor - attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token_jwt')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token_jwt')
      localStorage.removeItem('admin_logged_in')
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error.response?.data || { message: 'Network error. Is the backend running?' })
  }
)

// ─── Auth ─────────────────────────────────────────────────────────────────
export const adminAuthAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/update-profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  logout: () => {
    localStorage.removeItem('admin_token_jwt')
    localStorage.removeItem('admin_logged_in')
    localStorage.removeItem('admin_data')
    localStorage.removeItem('admin_token')
  }
}

// ─── Tours ─────────────────────────────────────────────────────────────────
export const toursAPI = {
  getAll: (params = {}) => api.get('/tours', { params }),
  getById: (id) => api.get(`/tours/${id}`),
  create: (data) => api.post('/tours', data),
  update: (id, data) => api.put(`/tours/${id}`, data),
  delete: (id) => api.delete(`/tours/${id}`),
  getStats: () => api.get('/tours/stats'),
  bulkImport: (tours) => api.post('/tours/bulk-import', { tours }),
  addReview: (id, review) => api.post(`/tours/${id}/review`, review),
}

// ─── Content ─────────────────────────────────────────────────────────────
export const contentAPI = {
  getPage: (page) => api.get(`/content/${page}`),
  updatePage: (page, data) => api.put(`/content/${page}`, data),
  updateSection: (page, sectionId, data) => api.patch(`/content/${page}/section`, { sectionId, data }),
  getAllPages: () => api.get('/content'),
}

// ─── Settings ─────────────────────────────────────────────────────────────
export const settingsAPI = {
  getAll: () => api.get('/settings'),
  getCategory: (category) => api.get(`/settings/${category}`),
  updateCategory: (category, data) => api.put(`/settings/${category}`, data),
}

// ─── Reviews ─────────────────────────────────────────────────────────────
export const reviewsAPI = {
  getAll: (params = {}) => api.get('/reviews', { params }),
  getApproved: () => api.get('/reviews', { params: { approved: true } }),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
  approve: (id) => api.patch(`/reviews/${id}/approve`),
}

// ─── Contact ─────────────────────────────────────────────────────────────
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params = {}) => api.get('/contact', { params }),
  updateStatus: (id, status) => api.patch(`/contact/${id}/status`, { status }),
  delete: (id) => api.delete(`/contact/${id}`),
}

// ─── Analytics ─────────────────────────────────────────────────────────────
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
}

// ─── Media ─────────────────────────────────────────────────────────────────
export const mediaAPI = {
  getAll: (params = {}) => api.get('/media', { params }),
  upload: (formData) => api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/media/${id}`),
}

export default api
