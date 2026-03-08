import React, { useState } from 'react'
import {
  Container, Box, Typography, Grid, Button, Chip, CircularProgress, Alert,
} from '@mui/material'
import { TempleHindu, WhatsApp } from '@mui/icons-material'
import { useTours } from '../hooks/useTours'
import TourCard from '../components/common/TourCard'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`

const ReligiousYatra = () => {
  const { tours, loading, error } = useTours('religious')

  const handleCustomYatra = () => {
    const phone = '916266203629'
    const msg = "Hi, I want to plan a custom religious yatra. Please help me with the details."
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const inclusions = [
    '🏨 Comfortable Accommodation', '🚌 AC Transport', '🍽️ Meals Included',
    '👮 Security Arrangements', '🧭 Experienced Guides', '📋 Puja Arrangements',
    '🎫 Darshan Tickets', '🏥 Medical Support',
  ]

  return (
    <Box>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #92400e 0%, #d97706 50%, #f59e0b 100%)',
        py: { xs: 6, md: 10 }, textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <TempleHindu sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
          <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
            Religious Yatra Packages
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto', mb: 4 }}>
            Divine journeys to India's most sacred temples and pilgrimage sites
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* Inclusions Strip */}
        <Box sx={{ p: 3, borderRadius: 3, bgcolor: '#fffbeb', border: '1px solid #f59e0b30', mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#92400e', mb: 2, textAlign: 'center' }}>
            All Yatra Packages Include
          </Typography>
          <Grid container spacing={2}>
            {inclusions.map((item, i) => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <Typography variant="body2" sx={{ color: '#555', fontWeight: 500 }}>{item}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        {error && <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>Could not connect to server. ({error})</Alert>}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <CircularProgress sx={{ color: '#d97706' }} size={48} />
            <Typography color="#888">Loading yatra packages...</Typography>
          </Box>
        ) : tours.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#888' }}>No yatra packages available. Admin can add them from the dashboard.</Typography>
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
        <Box sx={{ mt: 8, textAlign: 'center', p: 6, borderRadius: 4, background: 'linear-gradient(135deg, #92400e, #d97706)', color: 'white' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Plan Your Custom Yatra</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>Personalized yatra packages as per your convenience and budget</Typography>
          <Button variant="contained" size="large" startIcon={<WhatsApp />} onClick={handleCustomYatra}
            sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' }, borderRadius: 3, px: 4, py: 1.5, fontWeight: 700, fontSize: '1rem' }}>
            Plan Yatra on WhatsApp
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default ReligiousYatra
