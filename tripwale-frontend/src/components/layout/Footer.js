import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Phone,
  Email,
  LocationOn,
  WhatsApp,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Tripwale.in
            </Typography>
            <Typography variant="body2">
              Your Trusted Travel Partner – Pan India & Abroad. Explore the World with Us.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" href="https://facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://youtube.com" target="_blank">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/trips" color="inherit" display="block" sx={{ mb: 1 }}>
              All Trips
            </Link>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Domestic & International Tours
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Religious Yatra Packages
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Corporate & Student Tours
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Hotel & Flight Booking
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body2">
                Indore, Madhya Pradesh
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">
                6266203629
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">
                info@tripwale.in
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WhatsApp sx={{ mr: 1 }} />
              <Typography variant="body2">
                WhatsApp: 6266203629
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: 1, borderColor: 'grey.700', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Tripwale.in. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            PAN India & Abroad Travel Services
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;