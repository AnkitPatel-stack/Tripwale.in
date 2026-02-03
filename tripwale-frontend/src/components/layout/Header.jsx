import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  useScrollTrigger,
  Slide,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Phone,
  WhatsApp,
  LocationOn,
} from '@mui/icons-material';
import Tripwalelogo from './Tripwalelogo.png';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Domestic Tours', path: '/domestic-tours' },
    { label: 'International Tours', path: '/international-tours' },
    { label: 'Religious Yatra', path: '/religious-yatra' },
    { label: 'Trekking Tours', path: '/trekking' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const trigger = useScrollTrigger();

  return (
    <>
      {/* Top Bar with Contact Info */}
      <Box
        sx={{
          bgcolor: '#1e3a8a',
          color: 'white',
          py: 1,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone fontSize="small" />
                <Typography variant="body2">+91 6266203629</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn fontSize="small" />
                <Typography variant="body2">Indore, MP | PAN India & Abroad</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Domestic & International Tours
              </Typography>
              <IconButton
                size="small"
                sx={{ color: 'white' }}
                component="a"
                href="https://wa.me/916266203629"
                target="_blank"
              >
                <WhatsApp />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Header */}
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          position="sticky"
          sx={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
              {/* Logo */}
              <Box
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Avatar 
                  src={Tripwalelogo} 
                  alt="TripWale.in"
                  sx={{ 
                    width: 60, 
                    height: 60,
                    borderRadius: 1
                  }}
                />
                <Box> 
                </Box>
              </Box>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: '#1e3a8a',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textTransform: 'none',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#f0f9ff',
                        color: '#0369a1',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              {/* WhatsApp Button for Desktop */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<WhatsApp />}
                  component="a"
                  href="https://wa.me/916266203629"
                  target="_blank"
                  sx={{
                    bgcolor: '#25D366',
                    '&:hover': { bgcolor: '#128C7E' },
                    fontWeight: 'bold',
                    textTransform: 'none',
                  }}
                >
                  WhatsApp
                </Button>

                {/* Mobile Menu Button */}
                <IconButton
                  sx={{ display: { lg: 'none' } }}
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              {/* Mobile Menu Button Only */}
              <IconButton
                sx={{ display: { lg: 'none', xs: 'flex' } }}
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ display: { lg: 'none' } }}
            PaperProps={{
              sx: { width: 280, maxHeight: 400 }
            }}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                component={Link}
                to={item.path}
                onClick={handleMenuClose}
                sx={{ py: 1.5 }}
              >
                {item.label}
              </MenuItem>
            ))}
            <MenuItem 
              component="a"
              href="https://wa.me/916266203629"
              target="_blank"
              onClick={handleMenuClose}
              sx={{ 
                py: 1.5,
                color: '#25D366',
                fontWeight: 'bold'
              }}
            >
              <WhatsApp sx={{ mr: 1 }} />
              WhatsApp
            </MenuItem>
          </Menu>
        </AppBar>
      </Slide>
    </>
  );
};

export default Header;