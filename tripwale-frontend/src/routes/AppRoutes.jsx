// import { Routes, Route, Navigate } from 'react-router-dom'
// import MainLayout from '../layouts/MainLayout'
// import Home from '../pages/Home'
// import DomesticTours from '../pages/DomesticTours'
// import InternationalTours from '../pages/InternationalTours'
// import ReligiousYatra from '../pages/ReligiousYatra'
// import Trekking from '../pages/Trekking'
// import AboutUs from '../pages/AboutUs'
// import ContactUs from '../pages/ContactUs'
// import OneDayTrips from '../pages/OneDayTrips'
// import TourDetails from '../pages/TourDetails'

// const AppRoutes = () => {
//     return (
//         <Routes>
//             {/* Yeh IMPORTANT hai - MainLayout ke andar saare pages wrap karo */}
//             <Route element={<MainLayout />}>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/domestic-tours" element={<DomesticTours />} />
//                 <Route path="/international-tours" element={<InternationalTours />} />
//                 <Route path="/religious-yatra" element={<ReligiousYatra />} />
//                 <Route path="/one-day-trips" element={<OneDayTrips/>} />
//                 <Route path="/trekking" element={<Trekking />} />
//                 <Route path="/about" element={<AboutUs />} />
//                 <Route path="/contact" element={<ContactUs />} />
//                 <Route path="tour/:id" element={<TourDetails/>}/>
                
//             </Route>
            
//             {/* 404 page */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//     )
// }

// export default AppRoutes


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

// Admin Imports
import AdminLogin from '../pages/AdminLogin'
import AdminLayout from '../layouts/AdminLayout'
import AdminDashboard from '../pages/admin/Dashboard'
import ContentEditor from '../pages/admin/ContentEditor'
import ThemeEditor from '../pages/admin/ThemeEditor' // Create this similarly
import MediaLibrary from '../pages/admin/MediaLibrary' // Create this similarly
import Settings from '../pages/admin/Settings' // Create this similarly

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('admin_token') === 'authenticated'
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  
  return children
}

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Website Routes */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/domestic-tours" element={<DomesticTours />} />
                <Route path="/international-tours" element={<InternationalTours />} />
                <Route path="/religious-yatra" element={<ReligiousYatra />} />
                <Route path="/one-day-trips" element={<OneDayTrips/>} />
                <Route path="/trekking" element={<Trekking />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="tour/:id" element={<TourDetails/>}/>
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="edit/:page" element={<ContentEditor />} />
              <Route path="theme" element={<ThemeEditor />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="settings" element={<Settings />} />
              {/* <Route path="analytics" element={<div>Analytics Page</div>} />
              <Route path="content" element={<div>Content Page</div>} />
              <Route path="categories" element={<div>Categories Page</div>} />
              <Route path="reviews" element={<div>Reviews Page</div>} /> */}
            </Route>
            
            {/* 404 page */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AppRoutes