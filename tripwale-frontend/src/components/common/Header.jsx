import { Link, NavLink } from 'react-router-dom';
import { MapPin, Phone, User, Menu, X, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '../../assets/logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/tours', label: 'Tours' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="logo-wrapper">
              <Logo />
            </div>
            <div>
              <div className="nav-logo-text">TripWale.in</div>
              <div className="nav-logo-tagline">Travel with Confidence</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <div className="nav-links">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions">
            <div className="phone-number">
              <Phone size={16} />
              <span>+91 9876543210</span>
            </div>
            
            <Link to="/login" className="auth-link">
              <User size={18} />
              <span>Login</span>
            </Link>
            
            <Link to="/tours" className="btn btn-primary">
              <ShoppingBag size={18} />
              <span>Book Now</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-nav-links">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              
              <div className="mobile-menu-footer">
                <div className="mobile-phone">
                  <Phone size={18} />
                  <span>+91 9876543210</span>
                </div>
                
                <div className="mobile-auth-links">
                  <Link to="/login" className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;