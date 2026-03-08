
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Typography,
  Avatar,
  Badge,
  Fade,
  Zoom,
  useMediaQuery,
  useTheme,
  Slide,
  Grow,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Phone,
  WhatsApp,
  LocationOn,
  Email,
  ChevronRight,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Tripwalelogo from './Tripwalelogo.png';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Domestic Tours', path: '/domestic-tours' },
    { label: 'International Tours', path: '/international-tours' },
    { label: 'One Day Trips', path: '/one-day-trips' },
    { label: 'Religious Yatra', path: '/religious-yatra' },
    { label: 'Trekking Tours', path: '/trekking' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle page transitions
  const handleNavigation = (path) => {
    setPageLoading(true);
    setAnchorEl(null);

    // Add loading animation
    setTimeout(() => {
      navigate(path);
      setTimeout(() => {
        setPageLoading(false);
      }, 300);
    }, 200);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logo animation variants
  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {/* Page Transition Overlay */}
      <AnimatePresence>
        {pageLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(5px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar
                src={Tripwalelogo}
                alt="TripWale.in"
                sx={{
                  width: 80,
                  height: 80,
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(30, 58, 138, 0.4)' },
                    '50%': { transform: 'scale(1.1)', boxShadow: '0 0 0 10px rgba(30, 58, 138, 0)' },
                    '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(30, 58, 138, 0)' },
                  }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Contact Bar - Simplified */}
      <Slide in direction="down" timeout={800}>
        <Box
          sx={{
            bgcolor: '#1a2a4f',
            color: 'white',
            py: 0.8,
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone fontSize="small" sx={{ opacity: 0.8, fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontWeight: 400, fontSize: '0.85rem' }}>
                    +91 6266203629
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email fontSize="small" sx={{ opacity: 0.8, fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontWeight: 400, fontSize: '0.85rem' }}>
                    info@tripwale.in
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn fontSize="small" sx={{ opacity: 0.8, fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontWeight: 400, fontSize: '0.85rem' }}>
                    Indore, India
                  </Typography>
                </Box>
              </Box>

              <IconButton
                size="small"
                sx={{
                  color: 'white',
                  bgcolor: '#25D366',
                  width: 28,
                  height: 28,
                  '&:hover': { bgcolor: '#128C7E' },
                }}
                component="a"
                href="https://wa.me/916266203629"
                target="_blank"
              >
                <WhatsApp sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Container>
        </Box>
      </Slide>

      {/* Main Sticky Header - Clean & Classy */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.98)'
            : 'white',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'rgba(0,0,0,0.05)' : 'transparent',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.03)' : 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{
            justifyContent: 'space-between',
            py: scrolled ? 0.5 : 1,
            transition: 'all 0.3s',
            minHeight: { xs: 70, md: 80 },
          }}>
            {/* Logo - Simplified and Classy */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
              style={{ cursor: 'pointer' }}
              onClick={() => handleNavigation('/')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  src={Tripwalelogo}
                  alt="TripWale.in"
                  sx={{
                    width: { xs: 55, sm: 65, md: 75 },
                    height: { xs: 55, sm: 65, md: 75 },
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
              </Box>
            </motion.div>

            {/* Desktop Navigation - Clean */}
            {!isTablet && (
              <Box sx={{
                display: 'flex',
                gap: 0.5,
                mx: 2,
              }}>
                {menuItems.map((item, index) => (
                  <Grow in timeout={500 + index * 50} key={item.label}>
                    <Button
                      onClick={() => handleNavigation(item.path)}
                      sx={{
                        color: location.pathname === item.path ? '#1a2a4f' : '#4a5568',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        textTransform: 'none',
                        px: 1.5,
                        py: 1,
                        position: 'relative',
                        transition: 'all 0.2s',
                        // Dots (::after) completely hata diya
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: '#1a2a4f',
                          // Hover effect bhi hata diya
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Grow>
                ))}
              </Box>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* WhatsApp Button - Clean */}
              {!isMobile && (
                <Zoom in timeout={500}>
                  <Button
                    variant="outlined"
                    startIcon={<WhatsApp />}
                    onClick={() => window.open('https://wa.me/916266203629', '_blank')}
                    sx={{
                      borderColor: '#25D366',
                      color: '#25D366',
                      fontWeight: 500,
                      textTransform: 'none',
                      px: 2.5,
                      py: 0.8,
                      borderRadius: '30px',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: '#128C7E',
                        backgroundColor: 'rgba(37, 211, 102, 0.04)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    Book Now
                  </Button>
                </Zoom>
              )}

              {/* Mobile Menu Button */}
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: '#1a2a4f',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  padding: '8px',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    borderColor: '#1a2a4f',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>

        {/* Mobile Menu - Clean */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
          sx={{
            display: { lg: 'none' },
            '& .MuiPaper-root': {
              width: 300,
              maxHeight: '80vh',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.05)',
              mt: 1,
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#666', mb: 1, px: 2 }}>
              MENU
            </Typography>
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  py: 1.5,
                  px: 2,
                  borderRadius: '8px',
                  mb: 0.5,
                  fontSize: '0.95rem',
                  color: location.pathname === item.path ? '#1a2a4f' : '#4a5568',
                  backgroundColor: location.pathname === item.path ? 'rgba(26, 42, 79, 0.04)' : 'transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(26, 42, 79, 0.04)',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  {item.label}
                  {location.pathname === item.path && (
                    <ChevronRight sx={{ fontSize: 18, color: '#1a2a4f' }} />
                  )}
                </Box>
              </MenuItem>
            ))}

            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <MenuItem
                onClick={() => {
                  window.open('https://wa.me/916266203629', '_blank');
                  handleMenuClose();
                }}
                sx={{
                  py: 1.5,
                  px: 2,
                  borderRadius: '8px',
                  color: '#25D366',
                  '&:hover': {
                    backgroundColor: 'rgba(37, 211, 102, 0.04)',
                  },
                }}
              >
                <WhatsApp sx={{ mr: 1.5, fontSize: 20 }} />
                Chat on WhatsApp
              </MenuItem>
            </Box>
          </Box>
        </Menu>
      </AppBar>
    </>
  );
};

export default Header;
