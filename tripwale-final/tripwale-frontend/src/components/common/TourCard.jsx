import React from 'react'
import {
  Card, CardContent, CardMedia, CardActions, Button,
  Box, Typography, Chip, Rating,
} from '@mui/material'
import { LocationOn, CalendarToday, Star, WhatsApp } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const TourCard = ({ tour, onBook }) => {
  const navigate = useNavigate()

  if (!tour) return null

  const handleBook = () => {
    if (onBook) { onBook(tour); return }
    const phone = '916266203629'
    const msg = `Hi, I'm interested in the "${tour.title}" tour (${tour.duration}, ${tour.price}). Please share details.`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <Card sx={{
      height: '100%', display: 'flex', flexDirection: 'column',
      borderRadius: 3, overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        '& .tour-img': { transform: 'scale(1.08)' },
      },
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    }}>
      {/* Image */}
      <Box sx={{ position: 'relative', overflow: 'hidden', height: 220 }}>
        <CardMedia
          className="tour-img"
          component="img"
          image={tour.image || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600'}
          alt={tour.title}
          sx={{
            height: '100%', width: '100%', objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600' }}
        />
        {tour.tag && (
          <Chip
            label={tour.tag} size="small"
            sx={{
              position: 'absolute', top: 12, right: 12, zIndex: 1,
              bgcolor: tour.tag?.toLowerCase().includes('popular') ? '#FF6B6B' :
                       tour.tag?.toLowerCase().includes('seller') ? '#10b981' : '#1e3a8a',
              color: 'white', fontWeight: 700, fontSize: '0.72rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          />
        )}
        {tour.discount && (
          <Chip
            label={tour.discount} size="small"
            sx={{
              position: 'absolute', top: 12, left: 12, zIndex: 1,
              bgcolor: '#f59e0b', color: 'white', fontWeight: 700, fontSize: '0.72rem',
            }}
          />
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 1, color: '#1a1a2e', lineHeight: 1.3 }}>
          {tour.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.8, gap: 0.5 }}>
          <LocationOn sx={{ fontSize: 15, color: '#FF6B6B' }} />
          <Typography variant="caption" sx={{ color: '#666', fontSize: '0.8rem' }} noWrap>{tour.location}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarToday sx={{ fontSize: 14, color: '#888' }} />
            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.8rem' }}>{tour.duration}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <Star sx={{ fontSize: 15, color: '#f59e0b' }} />
            <Typography variant="caption" sx={{ color: '#555', fontWeight: 700, fontSize: '0.85rem' }}>{tour.rating}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3a8a', fontSize: '1.1rem' }}>
            {tour.price}
          </Typography>
          {tour.originalPrice && (
            <Typography variant="caption" sx={{ color: '#bbb', textDecoration: 'line-through', fontSize: '0.85rem' }}>
              {tour.originalPrice}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <Button
          variant="outlined" size="small" sx={{
            flex: 1, borderRadius: '50px', fontWeight: 600, fontSize: '0.8rem',
            borderColor: '#1e3a8a', color: '#1e3a8a',
            '&:hover': { bgcolor: 'rgba(30,58,138,0.06)' },
          }}
          onClick={() => navigate(`/tour/${tour._id || tour.id}`)}
        >
          View Details
        </Button>
        <Button
          variant="contained" size="small" startIcon={<WhatsApp sx={{ fontSize: '1rem !important' }} />}
          sx={{
            flex: 1, borderRadius: '50px', fontWeight: 600, fontSize: '0.8rem',
            bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' },
          }}
          onClick={handleBook}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  )
}

export default TourCard
