import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container, Box, Typography, Button, Grid, Paper, Chip, Rating,
  Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Divider,
  CircularProgress, Alert, Avatar, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, useMediaQuery, useTheme,
} from '@mui/material'
import {
  LocationOn, CalendarToday, Groups, AccessTime, ArrowBack,
  WhatsApp, Phone, CheckCircle, Cancel, Terrain, Hotel, Restaurant,
  FlightTakeoff, Star, Share, Bookmark, Photo,
} from '@mui/icons-material'
import { keyframes } from '@emotion/react'
import { useTour } from '../hooks/useTours'
import { reviewsAPI } from '../services/api'

const fadeIn = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`

const TourDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { tour, loading, error } = useTour(id)
  const [tabValue, setTabValue] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [openBooking, setOpenBooking] = useState(false)
  const [openReview, setOpenReview] = useState(false)
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', rating: 5, comment: '' })
  const [reviewSuccess, setReviewSuccess] = useState(false)

  const handleWhatsApp = (type = 'book') => {
    const phone = '916266203629'
    const msg = type === 'book'
      ? `Hi, I want to book the "${tour?.title}" tour (${tour?.duration}, ${tour?.price}). Please confirm availability.`
      : `Hi, I have a query about the "${tour?.title}" tour. Please help.`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const handleCall = () => window.open('tel:+916266203629')

  const handleSubmitReview = async () => {
    if (!reviewForm.name || !reviewForm.comment) return
    try {
      await reviewsAPI.create({ ...reviewForm, tourId: tour._id, tourTitle: tour.title })
      setReviewSuccess(true)
      setOpenReview(false)
      setReviewForm({ name: '', email: '', rating: 5, comment: '' })
    } catch (err) { console.error(err) }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column', gap: 2 }}>
        <CircularProgress size={56} sx={{ color: '#1e3a8a' }} />
        <Typography>Loading tour details...</Typography>
      </Box>
    )
  }

  if (error || !tour) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>Tour not found or could not load. Please try again.</Alert>
        <Button variant="contained" startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ borderRadius: 2 }}>Go Back</Button>
      </Container>
    )
  }

  const allImages = [tour.image, ...(tour.gallery || [])].filter(Boolean)

  return (
    <Box sx={{ animation: `${fadeIn} 0.4s ease` }}>
      {/* Hero Image Gallery */}
      <Box sx={{ position: 'relative', bgcolor: '#1a1a2e' }}>
        <Box sx={{ height: { xs: 280, md: 480 }, overflow: 'hidden' }}>
          <img
            src={allImages[selectedImage] || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600'}
            alt={tour.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600' }}
          />
        </Box>
        {/* Overlay */}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          p: { xs: 3, md: 5 }, color: 'white',
        }}>
          <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, '&:hover': { color: 'white' } }}>
            Back
          </Button>
          <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            {tour.tag && <Chip label={tour.tag} sx={{ bgcolor: '#FF6B6B', color: 'white', fontWeight: 700 }} />}
            {tour.difficulty && <Chip label={tour.difficulty} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(10px)' }} />}
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 900, fontSize: { xs: '1.6rem', md: '2.5rem' }, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            {tour.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOn sx={{ fontSize: 18 }} /><Typography variant="body2">{tour.location}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarToday sx={{ fontSize: 16 }} /><Typography variant="body2">{tour.duration}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: 18, color: '#fbbf24' }} />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>{tour.rating}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Thumbnail Strip */}
        {allImages.length > 1 && (
          <Box sx={{ position: 'absolute', bottom: { xs: -40, md: -50 }, right: 24, display: 'flex', gap: 1 }}>
            {allImages.slice(0, 4).map((img, i) => (
              <Box key={i} onClick={() => setSelectedImage(i)}
                sx={{
                  width: { xs: 50, md: 70 }, height: { xs: 50, md: 70 }, borderRadius: 2, overflow: 'hidden', cursor: 'pointer',
                  border: selectedImage === i ? '3px solid #3b82f6' : '2px solid rgba(255,255,255,0.5)',
                  transition: 'all 0.2s',
                }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display='none'} />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Container maxWidth="xl" sx={{ pt: { xs: 5, md: 8 }, pb: 6 }}>
        <Grid container spacing={4}>
          {/* Left: Main Content */}
          <Grid item xs={12} md={8}>
            {/* Price Card - Mobile Only */}
            {isMobile && (
              <Paper sx={{ p: 3, borderRadius: 3, mb: 3, background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', color: 'white' }}>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>{tour.price}</Typography>
                {tour.originalPrice && <Typography variant="body2" sx={{ textDecoration: 'line-through', opacity: 0.7 }}>{tour.originalPrice}</Typography>}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button fullWidth variant="contained" startIcon={<WhatsApp />} onClick={() => handleWhatsApp('book')}
                    sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' }, borderRadius: 2, fontWeight: 700 }}>Book Now</Button>
                  <Button fullWidth variant="outlined" onClick={handleCall}
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', borderRadius: 2 }}>Call Us</Button>
                </Box>
              </Paper>
            )}

            {/* Description */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>About This Tour</Typography>
              <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8 }}>{tour.description}</Typography>
              {tour.detailedDescription && (
                <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mt: 2 }}>{tour.detailedDescription}</Typography>
              )}
            </Paper>

            {/* Highlights */}
            {tour.highlights?.length > 0 && (
              <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>✨ Tour Highlights</Typography>
                <Grid container spacing={1}>
                  {tour.highlights.map((h, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <CheckCircle sx={{ color: '#10b981', fontSize: 20, mt: 0.3, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: '#555' }}>{h}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}

            {/* Tabs: Itinerary / Inclusions / Reviews */}
            <Paper sx={{ borderRadius: 3, overflow: 'hidden', mb: 3 }}>
              <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}
                sx={{ bgcolor: '#f8fafc', '& .MuiTab-root': { fontWeight: 600 }, '& .Mui-selected': { color: '#1e3a8a' }, '& .MuiTabs-indicator': { bgcolor: '#1e3a8a' } }}>
                <Tab label="Itinerary" />
                <Tab label="Inclusions" />
                <Tab label="Reviews" />
              </Tabs>

              <Box sx={{ p: 3 }}>
                {tabValue === 0 && (
                  <>
                    {tour.itinerary?.length > 0 ? tour.itinerary.map((day, i) => (
                      <Box key={i} sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Typography sx={{ color: 'white', fontWeight: 800 }}>D{day.day || i+1}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#1a1a2e' }}>{day.title}</Typography>
                          <Typography variant="body2" sx={{ color: '#666', mt: 0.5, lineHeight: 1.6 }}>{day.description}</Typography>
                        </Box>
                      </Box>
                    )) : (
                      <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', py: 3 }}>No itinerary details available yet.</Typography>
                    )}
                  </>
                )}

                {tabValue === 1 && (
                  <Grid container spacing={3}>
                    {tour.inclusions?.length > 0 && (
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#10b981', mb: 2 }}>✅ Inclusions</Typography>
                        {tour.inclusions.map((item, i) => (
                          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                            <CheckCircle sx={{ color: '#10b981', fontSize: 18, mt: 0.2, flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ color: '#555' }}>{item}</Typography>
                          </Box>
                        ))}
                      </Grid>
                    )}
                    {tour.exclusions?.length > 0 && (
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#ef4444', mb: 2 }}>❌ Exclusions</Typography>
                        {tour.exclusions.map((item, i) => (
                          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                            <Cancel sx={{ color: '#ef4444', fontSize: 18, mt: 0.2, flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ color: '#555' }}>{item}</Typography>
                          </Box>
                        ))}
                      </Grid>
                    )}
                    {!tour.inclusions?.length && !tour.exclusions?.length && (
                      <Grid item xs={12}><Typography variant="body2" sx={{ color: '#888', textAlign: 'center', py: 3 }}>Details not available yet.</Typography></Grid>
                    )}
                  </Grid>
                )}

                {tabValue === 2 && (
                  <Box>
                    {reviewSuccess && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>Review submitted! It will appear after approval.</Alert>}
                    {tour.reviews?.filter(r => r.approved)?.length > 0 ? tour.reviews.filter(r => r.approved).map((r, i) => (
                      <Box key={i} sx={{ display: 'flex', gap: 2, mb: 3, p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
                        <Avatar sx={{ bgcolor: '#1e3a8a', flexShrink: 0 }}>{r.name?.[0]?.toUpperCase()}</Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{r.name}</Typography>
                          <Rating value={r.rating} readOnly size="small" sx={{ mb: 0.5 }} />
                          <Typography variant="body2" sx={{ color: '#555' }}>{r.comment}</Typography>
                        </Box>
                      </Box>
                    )) : (
                      <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', py: 3 }}>No approved reviews yet. Be the first!</Typography>
                    )}
                    <Button variant="outlined" onClick={() => setOpenReview(true)} sx={{ mt: 2, borderRadius: 2, borderColor: '#1e3a8a', color: '#1e3a8a' }}>
                      Write a Review
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Right: Booking Card (Desktop) */}
          {!isMobile && (
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 80, background: 'linear-gradient(135deg, #f8fafc, #eff6ff)' }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#1e3a8a' }}>{tour.price}</Typography>
                  <Typography variant="body2" sx={{ color: '#888' }}>per person</Typography>
                </Box>
                {tour.originalPrice && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography variant="body2" sx={{ color: '#aaa', textDecoration: 'line-through' }}>{tour.originalPrice}</Typography>
                    {tour.discount && <Chip label={tour.discount} size="small" sx={{ bgcolor: '#fef3c7', color: '#92400e', fontWeight: 700, fontSize: '0.72rem' }} />}
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Quick Info */}
                {[
                  { icon: <CalendarToday sx={{ fontSize: 18, color: '#1e3a8a' }} />, label: 'Duration', value: tour.duration },
                  { icon: <Terrain sx={{ fontSize: 18, color: '#10b981' }} />, label: 'Difficulty', value: tour.difficulty },
                  { icon: <Groups sx={{ fontSize: 18, color: '#f59e0b' }} />, label: 'Group Size', value: tour.groupSize },
                  { icon: <AccessTime sx={{ fontSize: 18, color: '#8b5cf6' }} />, label: 'Best Time', value: tour.bestTime },
                ].filter(i => i.value).map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {item.icon}
                      <Typography variant="body2" sx={{ color: '#666' }}>{item.label}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a2e', textAlign: 'right', maxWidth: '55%' }}>{item.value}</Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Button fullWidth variant="contained" size="large" startIcon={<WhatsApp />}
                  onClick={() => handleWhatsApp('book')}
                  sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' }, borderRadius: 3, py: 1.5, fontWeight: 800, fontSize: '1rem', mb: 2, boxShadow: '0 8px 20px rgba(37,211,102,0.4)' }}>
                  Book via WhatsApp
                </Button>
                <Button fullWidth variant="outlined" size="large" startIcon={<Phone />} onClick={handleCall}
                  sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, borderColor: '#1e3a8a', color: '#1e3a8a', mb: 2 }}>
                  Call +91 6266203629
                </Button>
                <Typography variant="caption" sx={{ color: '#888', display: 'block', textAlign: 'center' }}>
                  🔒 Secure booking • Best price guaranteed
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Mobile Sticky Book Bar */}
      {isMobile && (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', p: 2, boxShadow: '0 -4px 20px rgba(0,0,0,0.15)', zIndex: 100, display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Phone />} onClick={handleCall}
            sx={{ flex: 1, borderRadius: 3, fontWeight: 700, borderColor: '#1e3a8a', color: '#1e3a8a' }}>Call</Button>
          <Button variant="contained" startIcon={<WhatsApp />} onClick={() => handleWhatsApp('book')}
            sx={{ flex: 2, bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' }, borderRadius: 3, fontWeight: 800 }}>Book Now</Button>
        </Box>
      )}

      {/* Review Dialog */}
      <Dialog open={openReview} onClose={() => setOpenReview(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Write a Review</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Your Name *" value={reviewForm.name} onChange={(e) => setReviewForm(p => ({...p, name: e.target.value}))} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" value={reviewForm.email} onChange={(e) => setReviewForm(p => ({...p, email: e.target.value}))} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>Rating *</Typography>
              <Rating value={reviewForm.rating} onChange={(_, v) => setReviewForm(p => ({...p, rating: v}))} size="large" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Your Review *" multiline rows={4} value={reviewForm.comment} onChange={(e) => setReviewForm(p => ({...p, comment: e.target.value}))} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={() => setOpenReview(false)} variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button onClick={handleSubmitReview} variant="contained" sx={{ borderRadius: 2, bgcolor: '#1e3a8a' }}>Submit Review</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TourDetails
