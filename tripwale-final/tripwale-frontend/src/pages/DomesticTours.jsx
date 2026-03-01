import React, { useState } from 'react'
import {
  Container, Box, Typography, Grid, Button, Chip, TextField,
  InputAdornment, CircularProgress, Alert, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material'
import { Search, WhatsApp } from '@mui/icons-material'
import { useTours } from '../hooks/useTours'
import TourCard from '../components/common/TourCard'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`

const DomesticTours = () => {
  const { tours, loading, error } = useTours('domestic')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = tours.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.location?.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || t.category === category
    return matchSearch && matchCat
  })

  const categories = ['all', ...new Set(tours.map(t => t.category).filter(Boolean))]

  const handleCustomTour = () => {
    const phone = '916266203629'
    const msg = "Hi, I'm looking for a custom domestic tour package. Can you help me?"
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <Box>
      {/* Hero Banner */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #0ea5e9 100%)',
        py: { xs: 6, md: 10 }, textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
            🇮🇳 Domestic Tour Packages
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto', mb: 4 }}>
            Explore the incredible beauty of India with our curated packages
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['500+ Happy Travelers', '50+ Destinations', 'Best Price Guaranteed'].map((t, i) => (
              <Chip key={i} label={t} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }} />
            ))}
          </Box>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* Search & Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search destinations, tours..." value={search}
            onChange={(e) => setSearch(e.target.value)} size="small"
            sx={{ flex: 1, minWidth: 240, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#aaa' }} /></InputAdornment> }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)} sx={{ borderRadius: 3 }}>
              {categories.map(c => <MenuItem key={c} value={c} sx={{ textTransform: 'capitalize' }}>{c === 'all' ? 'All Categories' : c}</MenuItem>)}
            </Select>
          </FormControl>
          <Typography variant="body2" sx={{ color: '#888', whiteSpace: 'nowrap' }}>
            {loading ? '...' : `${filtered.length} packages`}
          </Typography>
        </Box>

        {/* Error State */}
        {error && <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>Could not connect to server. Showing cached data. ({error})</Alert>}

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8, flexDirection: 'column', gap: 2 }}>
            <CircularProgress sx={{ color: '#1e3a8a' }} size={48} />
            <Typography color="#888">Loading tour packages...</Typography>
          </Box>
        ) : filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#888', mb: 2 }}>No tours found</Typography>
            <Button variant="outlined" onClick={() => { setSearch(''); setCategory('all') }}>Clear filters</Button>
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

        {/* Custom Tour CTA */}
        <Box sx={{
          mt: 8, textAlign: 'center', p: 6, borderRadius: 4,
          background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
          color: 'white',
        }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Can't Find Your Perfect Tour?</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
            Tell us your preferences and we'll create a custom package just for you
          </Typography>
          <Button
            variant="contained" size="large" startIcon={<WhatsApp />}
            onClick={handleCustomTour}
            sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' }, borderRadius: 3, px: 4, py: 1.5, fontWeight: 700, fontSize: '1rem' }}
          >
            Plan Custom Tour on WhatsApp
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default DomesticTours
