import React, { useState } from 'react'
import {
  Container, Box, Typography, Grid, Button, Chip, TextField,
  InputAdornment, CircularProgress, Alert,
} from '@mui/material'
import { Search, Flight, WhatsApp } from '@mui/icons-material'
import { useTours } from '../hooks/useTours'
import TourCard from '../components/common/TourCard'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`

const InternationalTours = () => {
  const { tours, loading, error } = useTours('international')
  const [search, setSearch] = useState('')

  const filtered = tours.filter(t =>
    !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.location?.toLowerCase().includes(search.toLowerCase())
  )

  const handleVisa = () => {
    const phone = '916266203629'
    const msg = "Hi, I need visa assistance for an international trip. Can you help me?"
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <Box>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        py: { xs: 6, md: 10 }, textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
            ✈️ International Tour Packages
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto', mb: 4 }}>
            Explore the world's most stunning destinations with expert guidance
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Visa Assistance', 'Flight Booking Help', 'Expert Travel Guides'].map((t, i) => (
              <Chip key={i} label={t} sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)' }} />
            ))}
          </Box>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* Visa Banner */}
        <Box sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #1e3a8a15, #3b82f615)', border: '1px solid #1e3a8a30', mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e3a8a' }}>🛂 Visa Assistance Available</Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>We provide complete visa documentation support for all international tours</Typography>
          </Box>
          <Button variant="contained" startIcon={<WhatsApp />} onClick={handleVisa}
            sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' }, borderRadius: 2, fontWeight: 700 }}>
            Get Visa Help
          </Button>
        </Box>

        {/* Search */}
        <TextField
          fullWidth placeholder="Search countries, destinations..." value={search}
          onChange={(e) => setSearch(e.target.value)} size="small" sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#aaa' }} /></InputAdornment> }}
        />

        {error && <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>Could not connect to server. ({error})</Alert>}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <CircularProgress sx={{ color: '#1e3a8a' }} size={48} />
            <Typography color="#888">Loading international packages...</Typography>
          </Box>
        ) : filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#888' }}>No international tours found</Typography>
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
      </Container>
    </Box>
  )
}

export default InternationalTours
