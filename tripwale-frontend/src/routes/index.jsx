// import { Routes, Route } from 'react-router-dom';
// import MainLayout from '../layouts/MainLayout';
// import Home from '../pages/Home';
// import About from '../pages/About';
// import Tours from '../pages/Tours';
// import TourDetails from '../pages/TourDetails';
// import Contact from '../pages/Contact';
// import Login from '../pages/Login';
// import Register from '../pages/Register';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="tours" element={<Tours />} />
//         <Route path="tours/:id" element={<TourDetails />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="tours" element={<Tours />} />
        <Route path="tours/:id" element={<TourDetails />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;  // <-- Yeh export hona chahiye