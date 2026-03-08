import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import DomesticTours from '../pages/DomesticTours'
import InternationalTours from '../pages/InternationalTours'
import ReligiousYatra from '../pages/ReligiousYatra'
import Trekking from '../pages/Trekking'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import OneDayTrips from '../pages/OneDayTrips'
import TourDetails from '../pages/TourDetails'

// Admin Pages
import AdminLogin from '../pages/AdminLogin'
import AdminLayout from '../layouts/AdminLayout'
import AdminDashboard from '../pages/admin/Dashboard'
import Analytics from '../pages/admin/Analytics'
import ContentEditor from '../pages/admin/ContentEditor'
import ThemeEditor from '../pages/admin/ThemeEditor'
import MediaLibrary from '../pages/admin/MediaLibrary'
import Settings from '../pages/admin/Settings'
import ToursManagement from '../pages/admin/ToursManagement'
import AddEditTour from '../pages/admin/AddEditTour'
import ReviewsManagement from '../pages/admin/ReviewsManagement'

// ─── Auth Guard ──────────────────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const isAuthenticated =
    localStorage.getItem('admin_token_jwt') ||
    localStorage.getItem('admin_logged_in') === 'true' ||
    localStorage.getItem('admin_token') === 'authenticated'

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* ─── Public Website ─── */}
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
        {/* Legacy route support */}
        <Route path="tour/:id" element={<TourDetails />} />
      </Route>

      {/* ─── Admin Login (Public) ─── */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ─── Admin Panel (Protected) ─── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Redirect /admin → /admin/dashboard */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />

        {/* Dashboard & Analytics */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="analytics" element={<Analytics />} />

        {/* Tours Management */}
        <Route path="tours" element={<ToursManagement />} />
        <Route path="tours/add" element={<AddEditTour />} />
        <Route path="tours/edit/:id" element={<AddEditTour />} />

        {/* Content Management - per page */}
        <Route path="content/:page" element={<ContentEditor />} />
        <Route path="content" element={<ContentEditor />} />

        {/* Reviews */}
        <Route path="reviews" element={<ReviewsManagement />} />

        {/* Media, Theme, Settings */}
        <Route path="media" element={<MediaLibrary />} />
        <Route path="theme" element={<ThemeEditor />} />
        <Route path="settings" element={<Settings />} />

        {/* Legacy route support */}
        <Route path="edit/:page" element={<ContentEditor />} />
      </Route>

      {/* 404 → Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
