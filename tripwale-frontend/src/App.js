// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Toaster } from 'react-hot-toast';
// import { HelmetProvider } from 'react-helmet-async';

// import { AuthProvider } from './context/AuthContext';
// import theme from './theme/theme';
// import Layout from './components/layout/Layout';
// import PrivateRoute from './components/common/PrivateRoute';

// // Public Pages
// import Home from './pages/Home';
// import Trips from './pages/Trips';
// import TripDetail from './pages/TripDetail';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Register from './pages/Register';

// // Admin Pages
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminTrips from './pages/admin/AdminTrips';
// import AdminBookings from './pages/admin/AdminBookings';
// import AdminInquiries from './pages/admin/AdminInquiries';

// function App() {
//   return (
//     <HelmetProvider>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <AuthProvider>
//           <Router>
//             <Toaster position="top-right" />
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/" element={<Layout />}>
//                 <Route index element={<Home />} />
//                 <Route path="trips" element={<Trips />} />
//                 <Route path="trips/:id" element={<TripDetail />} />
//                 <Route path="about" element={<About />} />
//                 <Route path="contact" element={<Contact />} />
//                 <Route path="login" element={<Login />} />
//                 <Route path="register" element={<Register />} />

//                 {/* Admin Routes */}
//                 <Route path="admin" element={<PrivateRoute />}>
//                   <Route index element={<AdminDashboard />} />
//                   <Route path="trips" element={<AdminTrips />} />
//                   <Route path="bookings" element={<AdminBookings />} />
//                   <Route path="inquiries" element={<AdminInquiries />} />
//                 </Route>
//               </Route>
//             </Routes>
//           </Router>
//         </AuthProvider>
//       </ThemeProvider>
//     </HelmetProvider>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Toaster } from 'react-hot-toast';
// import { HelmetProvider } from 'react-helmet-async';

// import { AuthProvider } from './context/AuthContext';
// import theme from './theme/theme';
// import Layout from './components/layout/Layout';
// import PrivateRoute from './components/common/PrivateRoute';

// // Public Pages
// import Home from './pages/public/Home';
// import Trips from './pages/public/Trips';
// import TripDetail from './pages/public/TripDetail';
// import About from './pages/public/About';
// import Contact from './pages/public/Contact';
// import Login from './pages/public/Login';
// import Register from './pages/public/Register';

// // Admin Pages
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminTrips from './pages/admin/AdminTrips';
// import AdminBookings from './pages/admin/AdminBookings';
// import AdminInquiries from './pages/admin/AdminInquiries';

// function App() {
//   return (
//     <HelmetProvider>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <AuthProvider>
//           <Router>
//             <Toaster
//               position="top-right"
//               toastOptions={{
//                 duration: 3000,
//                 style: {
//                   background: '#363636',
//                   color: '#fff',
//                 },
//               }}
//             />
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/" element={<Layout />}>
//                 <Route index element={<Home />} />
//                 <Route path="trips" element={<Trips />} />
//                 <Route path="trips/:id" element={<TripDetail />} />
//                 <Route path="about" element={<About />} />
//                 <Route path="contact" element={<Contact />} />
//                 <Route path="login" element={<Login />} />
//                 <Route path="register" element={<Register />} />

//                 {/* Admin Routes */}
//                 <Route path="admin" element={<PrivateRoute adminOnly={true} />}>
//                   <Route index element={<Navigate to="dashboard" replace />} />
//                   <Route path="dashboard" element={<AdminDashboard />} />
//                   <Route path="trips" element={<AdminTrips />} />
//                   <Route path="bookings" element={<AdminBookings />} />
//                   <Route path="inquiries" element={<AdminInquiries />} />
//                 </Route>
//               </Route>
//             </Routes>
//           </Router>
//         </AuthProvider>
//       </ThemeProvider>
//     </HelmetProvider>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "./context/AuthContext";
import theme from "./theme/theme";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/common/PrivateRoute";

// Public Pages
import Home from "./pages/public/Home";
import Trips from "./pages/public/Trips";
import TripDetail from "./pages/public/TripDetail";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTrips from "./pages/admin/AdminTrips";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminInquiries from "./pages/admin/AdminInquiries";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
              }}
            />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="trips" element={<Trips />} />
                <Route path="trips/:id" element={<TripDetail />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* Admin Routes */}
                <Route path="admin" element={<PrivateRoute adminOnly={true} />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="trips" element={<AdminTrips />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="inquiries" element={<AdminInquiries />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
