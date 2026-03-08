import React from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material'
import {
  Facebook,
  Instagram,
  Twitter,
  WhatsApp,
  Phone,
  Email,
  LocationOn,
  Flight,
  Hotel,
  DirectionsBus,
  Restaurant,
  Terrain
} from '@mui/icons-material'

// Import your logo
import Logo from '../layout/Tripwalelogo.png'

const Footer = () => {

  // Function to open location in Google Maps
  const openLocationInMaps = () => {
    const address = "41-42, 1st Floor, PU4 scheme no.54 behind C21 mall Vijay Nagar Indore-452010";
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Box
      component="footer"
      sx={{
        background: 'white',
        color: '#333',
        py: { xs: 4, sm: 5, md: 6 },
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #e0e0e0',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}>
          {/* Logo and Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              mb: { xs: 2, sm: 3 },
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              {/* Logo Section with actual logo */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: { xs: 2, sm: 0 },
                mr: { sm: 2 },
                gap: 2
              }}>
                {/* Actual Logo Image */}
                <Box
                  component="img"
                  src={Logo}
                  alt="TripWale Logo"
                  sx={{
                    width: { xs: 120, sm: 140, md: 160 },
                    height: 'auto',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
              </Box>
            </Box>

            <Typography variant="body2" sx={{
              mb: { xs: 2, sm: 3 },
              color: '#666',
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              Your trusted travel partner for unforgettable domestic and international tours.
              We create memories that last forever.
            </Typography>

            {/* Social Media Icons */}
            <Box sx={{
              display: 'flex',
              gap: 1,
              justifyContent: { xs: 'center', sm: 'flex-start' },
              mb: { xs: 2, sm: 3 }
            }}>
              {[
                { icon: <Facebook />, tooltip: 'Facebook', color: '#4267B2', href: 'https://www.facebook.com/share/1bRyfaDRHp/?mibextid=wwXIfr', target: '_blank' },
                { icon: <Instagram />, tooltip: 'Instagram', color: '#E1306C', href:'https://www.instagram.com/tripwale.in?igsh=MXZycXRjYzFnNDRjMQ==&utm_source=ig_contact_invite',target: '_blank' },
                {
                  icon: <WhatsApp />,
                  tooltip: 'WhatsApp',
                  color: '#25D366',
                  href: 'https://wa.me/916266203629',
                  target: '_blank'
                }
              ].map((social, index) => (
                <Tooltip key={index} title={social.tooltip}>
                  <IconButton
                    component={social.href ? 'a' : 'button'}
                    href={social.href}
                    target={social.target}
                    sx={{
                      backgroundColor: `${social.color}10`,
                      color: social.color,
                      border: `1px solid ${social.color}30`,
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      '&:hover': {
                        backgroundColor: `${social.color}20`,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>

            {/* Travel Icons */}
            <Box sx={{
              display: 'flex',
              gap: 2,
              justifyContent: { xs: 'center', sm: 'flex-start' },
              color: '#4a69bd'
            }}>
              {[<Flight />, <Hotel />, <DirectionsBus />, <Restaurant />, <Terrain />].map((icon, index) => (
                <Box key={index} sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    transform: 'translateY(-2px)'
                  }
                }}>
                  {icon}
                </Box>
              ))}
            </Box>
            {/* <Typography variant="body2" sx={{
                }}>
                  © {new Date().getFullYear()} TripWale.in Tour & Travels. All rights reserved.
                </Typography> */}
          </Grid>
 
          

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{
              mb: { xs: 2, sm: 3 },
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              position: 'relative',
              display: 'inline-block',
              color: '#1e3799',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, #FF8E53, #FF6B6B)',
                borderRadius: '2px'
              }
            }}>
              Quick Links
            </Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1, sm: 1.5 },
              mt: 3
            }}>
              {[
                { text: 'Home', href: '/' },
                { text: 'Domestic Tours', href: '/domestic-tours' },
                { text: 'International Tours', href: '/international-tours' },
                { text: 'Religious Yatra', href: '/religious-yatra' },
                { text: 'Trekking & Adventure', href: '/trekking' },
                { text: 'About Us', href: '/about' },
                { text: 'Contact Us', href: '/contact' },
                { text: 'Testimonials', href: '/testimonials' }
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  sx={{
                    textDecoration: 'none',
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    color: '#555',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#FF8E53',
                      transform: 'translateX(5px)',
                      '& .arrow': {
                        opacity: 1,
                        transform: 'translateX(3px)'
                      }
                    },
                    '& .arrow': {
                      opacity: 0,
                      transition: 'all 0.3s ease',
                      marginLeft: '8px',
                      fontSize: '0.8rem'
                    }
                  }}
                >
                  › {link.text} <span className="arrow">→</span>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{
              mb: { xs: 2, sm: 3 },
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              position: 'relative',
              display: 'inline-block',
              color: '#1e3799',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, #FF8E53, #FF6B6B)',
                borderRadius: '2px'
              }
            }}>
              Contact Info
            </Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1.5, sm: 2 },
              mt: 3
            }}>
              {[
                {
                  icon: <Phone sx={{ fontSize: { xs: 18, sm: 20 }, color: '#FF8E53' }} />,
                  text: '+91 6266203629',
                  subtext: 'Call us anytime',
                  href: 'tel:+916266203629'
                },
                {
                  icon: <Email sx={{ fontSize: { xs: 18, sm: 20 }, color: '#FF8E53' }} />,
                  text: 'Infotripwale09@gmail.com',
                  subtext: 'Email for inquiries',
                  href: 'mailto:Infotripwale09@gmail.com'
                },
                {
                  icon: <LocationOn sx={{ fontSize: { xs: 18, sm: 20 }, color: '#FF8E53' }} />,
                  text: '41-42, 1st Floor, PU4 scheme no.54 behind C21 mall Vijay Nagar Indore-452010',
                  subtext: 'PAN India & International Services',
                  onClick: openLocationInMaps,
                  clickable: true
                }
              ].map((contact, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: { xs: 1, sm: 1.5 },
                    transition: 'all 0.3s ease',
                    p: 1,
                    borderRadius: 1,
                    cursor: contact.clickable ? 'pointer' : 'default',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 142, 83, 0.05)',
                      transform: contact.clickable ? 'translateX(3px)' : 'none',
                    }
                  }}
                  onClick={contact.onClick}
                >
                  <Box sx={{
                    backgroundColor: 'rgba(255, 142, 83, 0.1)',
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: { xs: 36, sm: 40 }
                  }}>
                    {contact.icon}
                  </Box>
                  <Box>
                    {contact.href ? (
                      <Link
                        href={contact.href}
                        sx={{
                          textDecoration: 'none',
                          color: '#333',
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          fontWeight: 500,
                          display: 'block',
                          lineHeight: 1.4,
                          '&:hover': {
                            color: '#FF8E53'
                          }
                        }}
                      >
                        {contact.text}
                      </Link>
                    ) : (
                      <Typography
                        sx={{
                          color: contact.clickable ? '#333' : '#666',
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          fontWeight: contact.clickable ? 500 : 400,
                          display: 'block',
                          lineHeight: 1.4,
                          cursor: contact.clickable ? 'pointer' : 'default',
                          textDecoration: contact.clickable ? 'none' : 'none',
                          '&:hover': {
                            color: contact.clickable ? '#FF8E53' : '#666'
                          }
                        }}
                      >
                        {contact.text}
                      </Typography>
                    )}
                    <Typography variant="caption" sx={{
                      color: '#888',
                      fontSize: { xs: '0.75rem', sm: '0.8rem' },
                      display: 'block',
                      mt: 0.5
                    }}>
                      {contact.subtext}
                      {contact.clickable && (
                        <Box component="span" sx={{
                          color: '#FF8E53',
                          fontWeight: 600,
                          ml: 1,
                          fontSize: '0.7rem'
                        }}>
                          (Click to open in Maps)
                        </Box>
                      )}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>



            {/* Business Hours */}
            <Box sx={{
              mt: { xs: 3, sm: 4 },
              p: { xs: 2, sm: 2.5 },
              backgroundColor: 'rgba(255, 142, 83, 0.05)',
              borderRadius: 2,
              border: '1px solid rgba(255, 142, 83, 0.2)'
            }}>
              <Typography variant="subtitle2" sx={{
                mb: 1,
                fontWeight: 600,
                color: '#FF8E53',
                fontSize: { xs: '0.85rem', sm: '0.9rem' }
              }}>
                ⏰ Business Hours
              </Typography>
              <Typography variant="caption" sx={{
                color: '#666',
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                display: 'block'
              }}>
                Monday - Sunday: 8:00 AM - 10:00 PM
              </Typography>
              <Typography variant="caption" sx={{
                color: '#666',
                fontSize: { xs: '0.75rem', sm: '0.8rem' }
              }}>
                24/7 Customer Support Available
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{
          my: { xs: 3, sm: 4 },
          backgroundColor: '#e0e0e0'
        }} />




        {/* Services Tagline */}
        <Box sx={{
          mt: { xs: 2, sm: 3 },
          pt: { xs: 2, sm: 3 },
          borderTop: '1px solid #e0e0e0',
          textAlign: 'center'
        }}>
          <Typography variant="caption" sx={{
            color: '#666',
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
            display: 'block'
          }}>
            ✈️ Domestic & International Tours | 🏨 Package Tours | 🏕️ Customized Tour Packages |
            🚌 Group Tours | ❤️ Honeymoon Packages | 🏔️ Adventure Trips
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer