import React, { useState } from 'react'
import {
  Container, Box, Typography, Grid, Button, CircularProgress, Alert, Chip,
} from '@mui/material'
import { CalendarToday, WhatsApp } from '@mui/icons-material'
import { useTours } from '../hooks/useTours'
import TourCard from '../components/common/TourCard'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`

const OneDayTrips = () => {
  const { tours, loading, error } = useTours('one-day')

  const handlePlan = () => {
    const phone = '916266203629'
    const msg = "Hi, I want to plan a one day trip. Please help me with options."
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <Box>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #a78bfa 100%)',
        py: { xs: 6, md: 10 }, textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1527824404775-dce343118ebc?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <CalendarToday sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
            One Day Trips
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto', mb: 4 }}>
            Perfect weekend escapes and day excursions from your city
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['No Hotel Required', 'Easy Day Plans', 'Great for Families'].map((t, i) => (
              <Chip key={i} label={t} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }} />
            ))}
          </Box>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {error && <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>Could not connect to server. ({error})</Alert>}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <CircularProgress sx={{ color: '#7c3aed' }} size={48} />
            <Typography color="#888">Loading day trips...</Typography>
          </Box>
        ) : tours.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#888' }}>No one day trips available. Admin can add them from the dashboard.</Typography>
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ animation: `${fadeIn} 0.5s ease` }}>
            {tours.map((tour) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={tour._id || tour.id}>
                <TourCard tour={tour} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* CTA */}
        <Box sx={{ mt: 8, textAlign: 'center', p: 6, borderRadius: 4, background: 'linear-gradient(135deg, #4c1d95, #7c3aed)', color: 'white' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Want a Custom Day Trip?</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>Tell us your location and we'll plan the perfect day out for you</Typography>
          <Button variant="contained" size="large" startIcon={<WhatsApp />} onClick={handlePlan}
            sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' }, borderRadius: 3, px: 4, py: 1.5, fontWeight: 700 }}>
            Plan Day Trip on WhatsApp
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default OneDayTrips
