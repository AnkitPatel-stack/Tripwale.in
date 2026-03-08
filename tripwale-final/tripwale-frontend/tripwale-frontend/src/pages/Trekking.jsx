import React, { useState } from 'react'
import {
  Container, Box, Typography, Grid, Button, Chip, CircularProgress, Alert,
} from '@mui/material'
import { Hiking, WhatsApp } from '@mui/icons-material'
import { useTours } from '../hooks/useTours'
import TourCard from '../components/common/TourCard'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`

const difficultyColors = { Easy: '#10b981', Moderate: '#f59e0b', Hard: '#ef4444', Expert: '#8b5cf6' }

const Trekking = () => {
  const { tours, loading, error } = useTours('trekking')
  const [difficulty, setDifficulty] = useState('all')

  const filtered = difficulty === 'all' ? tours : tours.filter(t => t.difficulty === difficulty)

  const handleCustomTrek = () => {
    const phone = '916266203629'
    const msg = "Hi, I'm interested in a trekking package. Can you guide me?"
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <Box>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
        py: { xs: 6, md: 10 }, textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Hiking sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
            Trekking Packages
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto', mb: 4 }}>
            Conquer India's most breathtaking mountain trails with expert guides
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* Difficulty Filter */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 600, color: '#555' }}>Filter by Difficulty:</Typography>
          {['all', 'Easy', 'Moderate', 'Hard', 'Expert'].map((d) => (
            <Chip key={d} label={d === 'all' ? 'All Levels' : d}
              onClick={() => setDifficulty(d)}
              sx={{
                cursor: 'pointer', fontWeight: 600,
                bgcolor: difficulty === d ? (difficultyColors[d] || '#1e3a8a') : '#f3f4f6',
                color: difficulty === d ? 'white' : '#374141',
                '&:hover': { opacity: 0.9 },
              }} />
          ))}
        </Box>

        {error && <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>Could not connect to server. ({error})</Alert>}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <CircularProgress sx={{ color: '#10b981' }} size={48} />
            <Typography color="#888">Loading trekking packages...</Typography>
          </Box>
        ) : filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#888' }}>No trekking packages found for this level.</Typography>
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ animation: `${fadeIn} 0.5s ease` }}>
            {filtered.map((tour) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={tour._id || tour.id}>
                <TourCard tour={tour} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* CTA */}
        <Box sx={{ mt: 8, textAlign: 'center', p: 6, borderRadius: 4, background: 'linear-gradient(135deg, #064e3b, #047857)', color: 'white' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Looking for a Custom Trek?</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>Tell us your fitness level and we'll find the perfect trail for you</Typography>
          <Button variant="contained" size="large" startIcon={<WhatsApp />} onClick={handleCustomTrek}
            sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' }, borderRadius: 3, px: 4, py: 1.5, fontWeight: 700 }}>
            Plan Trek on WhatsApp
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Trekking
