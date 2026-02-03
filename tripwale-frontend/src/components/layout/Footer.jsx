import React from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link,
  IconButton 
} from '@mui/material'
import {
  Facebook,
  Instagram,
  Twitter,
  WhatsApp,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1e3a8a',
        color: 'white',
        py: 4,
        mt: 'auto'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              TripWale.in
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your trusted travel partner for domestic and international tours
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'white' }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <Twitter />
              </IconButton>
              <IconButton 
                sx={{ color: 'white' }}
                component="a"
                href="https://wa.me/916266203629"
                target="_blank"
              >
                <WhatsApp />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Home
              </Link>
              <Link href="/domestic-tours" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Domestic Tours
              </Link>
              <Link href="/international-tours" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                International Tours
              </Link>
              <Link href="/religious-yatra" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Religious Yatra
              </Link>
              <Link href="/trekking" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Trekking
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone fontSize="small" />
                <Typography variant="body2">+91 6266203629</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" />
                <Typography variant="body2">info@tripwale.in</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn fontSize="small" />
                <Typography variant="body2">Indore, MP | PAN India & Abroad</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} TripWale.in Tour & Travels. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.8 }}>
            Domestic & International Tours | Package Tours | Customized Tour Packages
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer