import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Layouts
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'

// Public Pages
import Home from './pages/Home'
import DomesticTours from './pages/DomesticTours'
import InternationalTours from './pages/InternationalTours'
import ReligiousYatra from './pages/ReligiousYatra'
import OneDayTrips from './pages/OneDayTrips'
import Trekking from './pages/Trekking'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import TourDetails from './pages/TourDetails'

// Admin Pages
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/admin/Dashboard'
import ContentEditor from './pages/admin/ContentEditor'
import ThemeEditor from './pages/admin/ThemeEditor'
import MediaLibrary from './pages/admin/MediaLibrary'
import Settings from './pages/admin/Settings'
import Analytics from './pages/admin/Analytics'
import ToursManagement from './pages/admin/ToursManagement'
import AddEditTour from './pages/admin/AddEditTour'
import ReviewsManagement from './pages/admin/ReviewsManagement'

import './index.css'

const theme = createTheme({
  palette: {
    primary: { main: '#1e3a8a' },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
  },
})

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = 
    localStorage.getItem('admin_token_jwt') || 
    localStorage.getItem('admin_token') === 'authenticated' || 
    localStorage.getItem('admin_logged_in') === 'true'
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/domestic-tours" element={<DomesticTours />} />
            <Route path="/international-tours" element={<InternationalTours />} />
            <Route path="/religious-yatra" element={<ReligiousYatra />} />
            <Route path="/one-day-trips" element={<OneDayTrips />} />
            <Route path="/trekking" element={<Trekking />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/tour/:id" element={<TourDetails />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AuthLayout><AdminLogin /></AuthLayout>} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="analytics" element={<Analytics />} />
            
            {/* Content Editor - Per Page */}
            <Route path="content/:page" element={<ContentEditor />} />
            <Route path="edit/:page" element={<ContentEditor />} />
            
            {/* Tours */}
            <Route path="tours" element={<ToursManagement />} />
            <Route path="tours/add" element={<AddEditTour />} />
            <Route path="tours/edit/:id" element={<AddEditTour />} />
            
            {/* Reviews */}
            <Route path="reviews" element={<ReviewsManagement />} />
            
            {/* Other admin pages */}
            <Route path="media" element={<MediaLibrary />} />
            <Route path="theme" element={<ThemeEditor />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* 404 redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

export default App
