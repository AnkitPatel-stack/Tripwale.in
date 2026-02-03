import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import DomesticTours from '../pages/DomesticTours'
import InternationalTours from '../pages/InternationalTours'
import ReligiousYatra from '../pages/ReligiousYatra'
import Trekking from '../pages/Trekking'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'

const AppRoutes = () => {
    return (
        <Routes>
            {/* Yeh IMPORTANT hai - MainLayout ke andar saare pages wrap karo */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/domestic-tours" element={<DomesticTours />} />
                <Route path="/international-tours" element={<InternationalTours />} />
                <Route path="/religious-yatra" element={<ReligiousYatra />} />
                <Route path="/trekking" element={<Trekking />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
            </Route>
            
            {/* 404 page */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AppRoutes