// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
//   Container,
//   Typography,
//   Avatar,
//   Badge,
//   Fade,
//   Zoom,
//   useScrollTrigger,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   Phone,
//   WhatsApp,
//   LocationOn,
//   FlightTakeoff,
//   FlightLand,
//   Email,
// } from '@mui/icons-material';
// import Tripwalelogo from './Tripwalelogo.png';

// const Header = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [showFlight, setShowFlight] = useState(false);
//   const [flightDirection, setFlightDirection] = useState('takeoff');
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

//   const menuItems = [
//     { label: 'Home', path: '/' },
//     { label: 'Domestic Tours', path: '/domestic-tours' },
//     { label: 'International Tours', path: '/international-tours' },
//     { label: 'One Day Trips', path: '/one-day-trips' },
//     { label: 'Religious Yatra', path: '/religious-yatra' },
//     { label: 'Trekking Tours', path: '/trekking' },
//     { label: 'About Us', path: '/about' },
//     { label: 'Contact Us', path: '/contact' },
//   ];

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Handle flight animation on route change
//   useEffect(() => {
//     setFlightDirection(Math.random() > 0.5 ? 'takeoff' : 'land');
//     setShowFlight(true);
    
//     const timer = setTimeout(() => {
//       setShowFlight(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, [location.pathname]);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   // Flight Animation Component
//   const FlightAnimation = ({ direction }) => (
//     <Fade in={showFlight} timeout={500}>
//       <Box
//         sx={{
//           position: 'fixed',
//           top: '50%',
//           left: direction === 'takeoff' ? '-100px' : 'calc(100% + 100px)',
//           transform: 'translateY(-50%)',
//           zIndex: 9999,
//           animation: direction === 'takeoff' 
//             ? 'flightTakeoff 1.5s ease-in-out forwards' 
//             : 'flightLand 1.5s ease-in-out forwards',
//           '@keyframes flightTakeoff': {
//             '0%': {
//               left: '-100px',
//               opacity: 0,
//               transform: 'translateY(-50%) rotate(0deg)',
//             },
//             '10%': {
//               opacity: 1,
//             },
//             '100%': {
//               left: 'calc(100% + 100px)',
//               opacity: 0,
//               transform: 'translateY(-50%) rotate(5deg)',
//             },
//           },
//           '@keyframes flightLand': {
//             '0%': {
//               left: 'calc(100% + 100px)',
//               opacity: 0,
//               transform: 'translateY(-50%) rotate(0deg)',
//             },
//             '10%': {
//               opacity: 1,
//             },
//             '100%': {
//               left: '-100px',
//               opacity: 0,
//               transform: 'translateY(-50%) rotate(-5deg)',
//             },
//           },
//         }}
//       >
//         {direction === 'takeoff' ? (
//           <FlightTakeoff
//             sx={{
//               fontSize: 60,
//               color: '#1e3a8a',
//               filter: 'drop-shadow(0 4px 8px rgba(30, 58, 138, 0.3))',
//             }}
//           />
//         ) : (
//           <FlightLand
//             sx={{
//               fontSize: 60,
//               color: '#1e3a8a',
//               filter: 'drop-shadow(0 4px 8px rgba(30, 58, 138, 0.3))',
//             }}
//           />
//         )}
//       </Box>
//     </Fade>
//   );

//   return (
//     <>
//       {/* Flight Animation */}
//       <FlightAnimation direction={flightDirection} />

//       {/* Top Contact Bar */}
//       <Fade in timeout={1000}>
//         <Box
//           sx={{
//             bgcolor: '#1e3a8a',
//             background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
//             color: 'white',
//             py: 1,
//             display: { xs: 'none', md: 'block' },
//             position: 'relative',
//             overflow: 'hidden',
//             '&::before': {
//               content: '""',
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               height: '2px',
//               background: 'linear-gradient(90deg, transparent, #fff, transparent)',
//             },
//           }}
//         >
//           <Container maxWidth="xl">
//             <Box sx={{ 
//               display: 'flex', 
//               justifyContent: 'space-between', 
//               alignItems: 'center',
//               position: 'relative',
//               zIndex: 1,
//             }}>
//               <Box sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 gap: { md: 3, lg: 4 },
//                 flexWrap: 'wrap',
//               }}>
//                 <Box 
//                   sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 1,
//                     transition: 'all 0.3s',
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                     }
//                   }}
//                 >
//                   <Phone fontSize="small" sx={{ color: '#93c5fd' }} />
//                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     +91 6266203629
//                   </Typography>
//                 </Box>
//                 <Box 
//                   sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 1,
//                     transition: 'all 0.3s',
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                     }
//                   }}
//                 >
//                   <Email fontSize="small" sx={{ color: '#93c5fd' }} />
//                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     info@tripwale.in
//                   </Typography>
//                 </Box>
//                 <Box 
//                   sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 1,
//                     transition: 'all 0.3s',
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                     }
//                   }}
//                 >
//                   <LocationOn fontSize="small" sx={{ color: '#93c5fd' }} />
//                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     Indore, MP |India
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 gap: 2,
//                 transition: 'all 0.3s',
//                 '&:hover': {
//                   transform: 'scale(1.05)',
//                 }
//               }}>
//                 <Badge 
//                   color="success" 
//                   variant="dot"
//                   sx={{
//                     '& .MuiBadge-dot': {
//                       backgroundColor: '#25D366',
//                       boxShadow: '0 0 0 2px #fff',
//                     }
//                   }}
//                 >
//                   <IconButton
//                     size="small"
//                     sx={{ 
//                       color: 'white',
//                       bgcolor: '#25D366',
//                       '&:hover': { bgcolor: '#128C7E' },
//                       transition: 'all 0.3s',
//                     }}
//                     component="a"
//                     href="https://wa.me/916266203629"
//                     target="_blank"
//                   >
//                     <WhatsApp />
//                   </IconButton>
//                 </Badge>
//               </Box>
//             </Box>
//           </Container>
//         </Box>
//       </Fade>

//       {/* Main Sticky Header */}
//       <AppBar
//         position="sticky"
//         elevation={0}
//         sx={{
//           background: scrolled 
//             ? 'rgba(255, 255, 255, 0.98)'
//             : 'rgba(255, 255, 255, 0.95)',
//           backdropFilter: 'blur(10px)',
//           borderBottom: '1px solid rgba(30, 58, 138, 0.1)',
//           transition: 'all 0.3s ease',
//           boxShadow: scrolled 
//             ? '0 8px 32px rgba(30, 58, 138, 0.1)'
//             : '0 4px 20px rgba(30, 58, 138, 0.08)',
//         }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar sx={{ 
//             justifyContent: 'space-between', 
//             py: scrolled ? 1 : 1.5,
//             transition: 'all 0.3s',
//           }}>
//             {/* Logo with Animation */}
//             <Zoom in timeout={800}>
//               <Box
//                 component={Link}
//                 to="/"
//                 sx={{
//                   textDecoration: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 2,
//                   '&:hover': {
//                     '& .logo-text': {
//                       transform: 'translateX(5px)',
//                     }
//                   }
//                 }}
//               >
//                 <Avatar 
//                   src={Tripwalelogo} 
//                   alt="TripWale.in"
//                   sx={{ 
//                     width: scrolled ? 80 : 90, 
//                     height: scrolled ? 80 : 90,
//                     borderRadius: 2,
//                     border: '3px solid #1e3a8a',
//                     transition: 'all 0.3s',
//                     '&:hover': {
//                       transform: 'rotate(5deg) scale(1.05)',
//                       boxShadow: '0 8px 24px rgba(30, 58, 138, 0.2)',
//                     }
//                   }}
//                 />
//                 {/* {!isTablet && (
                 
//                 )} */}
//               </Box>
//             </Zoom>

//             {/* Desktop Navigation */}
//             {!isTablet && (
//               <Box sx={{ 
//                 display: 'flex', 
//                 gap: 0.5,
//                 mx: 2,
//               }}>
//                 {menuItems.map((item, index) => (
//                   <Zoom in timeout={800} key={item.label} style={{ transitionDelay: `${index * 50}ms` }}>
//                     <Button
//                       component={Link}
//                       to={item.path}
//                       sx={{
//                         color: location.pathname === item.path ? '#1e3a8a' : '#4b5563',
//                         fontWeight: location.pathname === item.path ? 700 : 600,
//                         fontSize: '0.875rem',
//                         textTransform: 'none',
//                         px: 2,
//                         py: 1,
//                         borderRadius: 2,
//                         position: 'relative',
//                         overflow: 'hidden',
//                         transition: 'all 0.3s',
//                         '&::before': location.pathname === item.path ? {
//                           content: '""',
//                           position: 'absolute',
//                           bottom: 0,
//                           left: '10%',
//                           right: '10%',
//                           height: '3px',
//                           backgroundColor: '#1e3a8a',
//                           borderRadius: '3px 3px 0 0',
//                         } : {},
//                         '&:hover': {
//                           backgroundColor: 'rgba(30, 58, 138, 0.05)',
//                           color: '#1e3a8a',
//                           transform: 'translateY(-2px)',
//                           '&::after': {
//                             content: '""',
//                             position: 'absolute',
//                             bottom: 0,
//                             left: '10%',
//                             right: '10%',
//                             height: '3px',
//                             backgroundColor: '#1e3a8a',
//                             borderRadius: '3px 3px 0 0',
//                           }
//                         },
//                       }}
//                     >
//                       {item.label}
//                     </Button>
//                   </Zoom>
//                 ))}
//               </Box>
//             )}

//             {/* Action Buttons */}
//             <Box sx={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: 2,
//             }}>
//               {/* WhatsApp Button */}
//               {!isMobile && (
//                 <Zoom in timeout={800} style={{ transitionDelay: '400ms' }}>
//                   <Button
//                     variant="contained"
//                     startIcon={<WhatsApp />}
//                     component="a"
//                     href="https://wa.me/916266203629"
//                     target="_blank"
//                     sx={{
//                       bgcolor: '#25D366',
//                       background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
//                       color: 'white',
//                       fontWeight: 'bold',
//                       textTransform: 'none',
//                       px: 3,
//                       py: 1,
//                       borderRadius: 3,
//                       boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
//                       transition: 'all 0.3s',
//                       '&:hover': { 
//                         bgcolor: '#128C7E',
//                         transform: 'translateY(-2px)',
//                         boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
//                       },
//                     }}
//                   >
//                     Book on WhatsApp
//                   </Button>
//                 </Zoom>
//               )}

//               {/* Mobile Menu Button */}
//               <Zoom in timeout={800} style={{ transitionDelay: '450ms' }}>
//                 <IconButton
//                   onClick={handleMenuOpen}
//                   sx={{
//                     color: '#1e3a8a',
//                     bgcolor: 'rgba(30, 58, 138, 0.05)',
//                     '&:hover': {
//                       bgcolor: 'rgba(30, 58, 138, 0.1)',
//                       transform: 'rotate(90deg)',
//                     },
//                     transition: 'all 0.3s',
//                   }}
//                 >
//                   <MenuIcon />
//                 </IconButton>
//               </Zoom>
//             </Box>
//           </Toolbar>
//         </Container>

//         {/* Mobile Menu */}
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//           sx={{ 
//             display: { lg: 'none' },
//             '& .MuiPaper-root': {
//               width: 280,
//               maxHeight: '80vh',
//               borderRadius: 2,
//               boxShadow: '0 20px 60px rgba(30, 58, 138, 0.2)',
//               border: '1px solid rgba(30, 58, 138, 0.1)',
//               mt: 1,
//             }
//           }}
//           MenuListProps={{
//             sx: { py: 1 }
//           }}
//         >
//           {menuItems.map((item) => (
//             <MenuItem
//               key={item.label}
//               component={Link}
//               to={item.path}
//               onClick={handleMenuClose}
//               selected={location.pathname === item.path}
//               sx={{ 
//                 py: 1.5,
//                 px: 3,
//                 fontSize: '0.95rem',
//                 fontWeight: location.pathname === item.path ? 600 : 400,
//                 color: location.pathname === item.path ? '#1e3a8a' : '#4b5563',
//                 borderLeft: location.pathname === item.path ? '4px solid #1e3a8a' : '4px solid transparent',
//                 transition: 'all 0.2s',
//                 '&:hover': {
//                   backgroundColor: 'rgba(30, 58, 138, 0.05)',
//                   borderLeft: '4px solid #1e3a8a',
//                   paddingLeft: 'calc(12px + 4px)',
//                 },
//                 '&.Mui-selected': {
//                   backgroundColor: 'rgba(30, 58, 138, 0.08)',
//                 },
//                 '&.Mui-selected:hover': {
//                   backgroundColor: 'rgba(30, 58, 138, 0.12)',
//                 },
//               }}
//             >
//               {item.label}
//             </MenuItem>
//           ))}
          
//           <Box sx={{ px: 3, py: 2, mt: 1, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
//             <MenuItem 
//               component="a"
//               href="https://wa.me/916266203629"
//               target="_blank"
//               onClick={handleMenuClose}
//               sx={{ 
//                 py: 1.5,
//                 color: 'white',
//                 fontWeight: 'bold',
//                 borderRadius: 2,
//                 bgcolor: '#25D366',
//                 background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
//                 justifyContent: 'center',
//                 '&:hover': {
//                   bgcolor: '#128C7E',
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
//                 },
//                 transition: 'all 0.3s',
//               }}
//             >
//               <WhatsApp sx={{ mr: 1.5 }} />
//               Chat on WhatsApp
//             </MenuItem>
//           </Box>
//         </Menu>
//       </AppBar>
//     </>
//   );
// };

// export default Header;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
} from '@mui/material';
import {
  Menu as MenuIcon,
  Phone,
  WhatsApp,
  LocationOn,
  Email,
} from '@mui/icons-material';
import Tripwalelogo from './Tripwalelogo.png';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
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
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <Fade in timeout={1000}>
        <Box
          sx={{
            bgcolor: '#1e3a8a',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            color: 'white',
            py: 1,
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #fff, transparent)',
            },
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { md: 3, lg: 4 },
                flexWrap: 'wrap',
              }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <Phone fontSize="small" sx={{ color: '#93c5fd' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    +91 6266203629
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <Email fontSize="small" sx={{ color: '#93c5fd' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    info@tripwale.in
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <LocationOn fontSize="small" sx={{ color: '#93c5fd' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Indore, MP | India
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}>
                <Badge 
                  color="success" 
                  variant="dot"
                  sx={{
                    '& .MuiBadge-dot': {
                      backgroundColor: '#25D366',
                      boxShadow: '0 0 0 2px #fff',
                    }
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{ 
                      color: 'white',
                      bgcolor: '#25D366',
                      '&:hover': { bgcolor: '#128C7E' },
                      transition: 'all 0.3s',
                    }}
                    component="a"
                    href="https://wa.me/916266203629"
                    target="_blank"
                  >
                    <WhatsApp />
                  </IconButton>
                </Badge>
              </Box>
            </Box>
          </Container>
        </Box>
      </Fade>

      {/* Main Sticky Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(30, 58, 138, 0.1)',
          transition: 'all 0.3s ease',
          boxShadow: scrolled 
            ? '0 8px 32px rgba(30, 58, 138, 0.1)'
            : '0 4px 20px rgba(30, 58, 138, 0.08)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            py: scrolled ? 1 : 1.5,
            transition: 'all 0.3s',
          }}>
            {/* Logo */}
            <Zoom in timeout={800}>
              <Box
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  '&:hover': {
                    '& .logo-text': {
                      transform: 'translateX(5px)',
                    }
                  }
                }}
              >
                <Avatar 
                  src={Tripwalelogo} 
                  alt="TripWale.in"
                  sx={{ 
                    width: scrolled ? 80 : 90, 
                    height: scrolled ? 80 : 90,
                    borderRadius: 2,
                    border: '3px solid #1e3a8a',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'rotate(5deg) scale(1.05)',
                      boxShadow: '0 8px 24px rgba(30, 58, 138, 0.2)',
                    }
                  }}
                />
              </Box>
            </Zoom>

            {/* Desktop Navigation */}
            {!isTablet && (
              <Box sx={{ 
                display: 'flex', 
                gap: 0.5,
                mx: 2,
              }}>
                {menuItems.map((item, index) => (
                  <Zoom in timeout={800} key={item.label} style={{ transitionDelay: `${index * 50}ms` }}>
                    <Button
                      component={Link}
                      to={item.path}
                      sx={{
                        color: location.pathname === item.path ? '#1e3a8a' : '#4b5563',
                        fontWeight: location.pathname === item.path ? 700 : 600,
                        fontSize: '0.875rem',
                        textTransform: 'none',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s',
                        '&::before': location.pathname === item.path ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '10%',
                          right: '10%',
                          height: '3px',
                          backgroundColor: '#1e3a8a',
                          borderRadius: '3px 3px 0 0',
                        } : {},
                        '&:hover': {
                          backgroundColor: 'rgba(30, 58, 138, 0.05)',
                          color: '#1e3a8a',
                          transform: 'translateY(-2px)',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '10%',
                            right: '10%',
                            height: '3px',
                            backgroundColor: '#1e3a8a',
                            borderRadius: '3px 3px 0 0',
                          }
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Zoom>
                ))}
              </Box>
            )}

            {/* Action Buttons */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
            }}>
              {/* WhatsApp Button */}
              {!isMobile && (
                <Zoom in timeout={800} style={{ transitionDelay: '400ms' }}>
                  <Button
                    variant="contained"
                    startIcon={<WhatsApp />}
                    component="a"
                    href="https://wa.me/916266203629"
                    target="_blank"
                    sx={{
                      bgcolor: '#25D366',
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      color: 'white',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      px: 3,
                      py: 1,
                      borderRadius: 3,
                      boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
                      transition: 'all 0.3s',
                      '&:hover': { 
                        bgcolor: '#128C7E',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                      },
                    }}
                  >
                    Book on WhatsApp
                  </Button>
                </Zoom>
              )}

              {/* Mobile Menu Button */}
              <Zoom in timeout={800} style={{ transitionDelay: '450ms' }}>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    color: '#1e3a8a',
                    bgcolor: 'rgba(30, 58, 138, 0.05)',
                    '&:hover': {
                      bgcolor: 'rgba(30, 58, 138, 0.1)',
                      transform: 'rotate(90deg)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Zoom>
            </Box>
          </Toolbar>
        </Container>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ 
            display: { lg: 'none' },
            '& .MuiPaper-root': {
              width: 280,
              maxHeight: '80vh',
              borderRadius: 2,
              boxShadow: '0 20px 60px rgba(30, 58, 138, 0.2)',
              border: '1px solid rgba(30, 58, 138, 0.1)',
              mt: 1,
            }
          }}
          MenuListProps={{
            sx: { py: 1 }
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              component={Link}
              to={item.path}
              onClick={handleMenuClose}
              selected={location.pathname === item.path}
              sx={{ 
                py: 1.5,
                px: 3,
                fontSize: '0.95rem',
                fontWeight: location.pathname === item.path ? 600 : 400,
                color: location.pathname === item.path ? '#1e3a8a' : '#4b5563',
                borderLeft: location.pathname === item.path ? '4px solid #1e3a8a' : '4px solid transparent',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(30, 58, 138, 0.05)',
                  borderLeft: '4px solid #1e3a8a',
                  paddingLeft: 'calc(12px + 4px)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(30, 58, 138, 0.08)',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(30, 58, 138, 0.12)',
                },
              }}
            >
              {item.label}
            </MenuItem>
          ))}
          
          <Box sx={{ px: 3, py: 2, mt: 1, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <MenuItem 
              component="a"
              href="https://wa.me/916266203629"
              target="_blank"
              onClick={handleMenuClose}
              sx={{ 
                py: 1.5,
                color: 'white',
                fontWeight: 'bold',
                borderRadius: 2,
                bgcolor: '#25D366',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                justifyContent: 'center',
                '&:hover': {
                  bgcolor: '#128C7E',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                },
                transition: 'all 0.3s',
              }}
            >
              <WhatsApp sx={{ mr: 1.5 }} />
              Chat on WhatsApp
            </MenuItem>
          </Box>
        </Menu>
      </AppBar>
    </>
  );
};

export default Header;