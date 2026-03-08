import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Paper, Typography, TextField, Button, Grid, FormControl,
  InputLabel, Select, MenuItem, Chip, Rating, Switch, FormControlLabel,
  Divider, IconButton, InputAdornment, Alert, Stepper, Step, StepLabel,
  Card, CardMedia, CircularProgress, Fade, Tooltip,
} from '@mui/material'
import {
  Save, ArrowBack, Add, Delete, CloudUpload, PhotoCamera,
  LocationOn, AccessTime, AttachMoney, Star, Category, ArrowForward,
} from '@mui/icons-material'
import { toursAPI } from '../../services/api'

const steps = ['Basic Info', 'Details & Inclusions', 'Itinerary', 'Media', 'Review & Save']

const AddEditTour = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  
  const [tour, setTour] = useState({
    title: '', description: '', detailedDescription: '', location: '', duration: '',
    price: '', originalPrice: '', discount: '', rating: 4.5, image: '',
    gallery: [], category: 'general', pageType: 'domestic', tag: '',
    highlights: [], inclusions: [], exclusions: [], itinerary: [],
    difficulty: 'Moderate', groupSize: '', bestTime: '', flightIncluded: false, active: true, featured: false,
  })

  const [inputs, setInputs] = useState({ highlight: '', inclusion: '', exclusion: '' })
  const [newItineraryDay, setNewItineraryDay] = useState({ day: '', title: '', description: '' })

  useEffect(() => {
    if (isEdit) loadTour()
  }, [id])

  const loadTour = async () => {
    setLoading(true)
    try {
      const res = await toursAPI.getById(id)
      if (res.success) setTour(res.tour)
    } catch (err) {
      setError('Failed to load tour')
    } finally {
      setLoading(false)
    }
  }

  const update = (field, value) => setTour(prev => ({ ...prev, [field]: value }))

  const addToArray = (field, value) => {
    if (!value.trim()) return
    setTour(prev => ({ ...prev, [field]: [...prev[field], value.trim()] }))
    setInputs(prev => ({ ...prev, [field === 'highlights' ? 'highlight' : field === 'inclusions' ? 'inclusion' : 'exclusion']: '' }))
  }

  const removeFromArray = (field, index) => {
    setTour(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }))
  }

  const addItinerary = () => {
    if (!newItineraryDay.title) return
    setTour(prev => ({ ...prev, itinerary: [...prev.itinerary, { ...newItineraryDay, day: prev.itinerary.length + 1 }] }))
    setNewItineraryDay({ day: '', title: '', description: '' })
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      let res
      if (isEdit) {
        res = await toursAPI.update(id, tour)
      } else {
        res = await toursAPI.create(tour)
      }
      if (res.success) {
        setSuccess(isEdit ? 'Tour updated successfully!' : 'Tour created successfully!')
        setTimeout(() => navigate('/admin/tours'), 1500)
      }
    } catch (err) {
      setError(err.message || 'Failed to save tour')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress sx={{ color: '#1e3a8a' }} /></Box>
  )

  const stepContent = [
    // Step 0: Basic Info
    <Grid container spacing={3} key={0}>
      <Grid item xs={12}><TextField fullWidth label="Tour Title *" value={tour.title} onChange={(e) => update('title', e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
      <Grid item xs={12}><TextField fullWidth label="Short Description *" multiline rows={3} value={tour.description} onChange={(e) => update('description', e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
      <Grid item xs={12}><TextField fullWidth label="Detailed Description" multiline rows={5} value={tour.detailedDescription} onChange={(e) => update('detailedDescription', e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Location *" value={tour.location} onChange={(e) => update('location', e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><LocationOn sx={{ color: '#aaa' }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Duration (e.g. 5 Nights / 6 Days)" value={tour.duration} onChange={(e) => update('duration', e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><AccessTime sx={{ color: '#aaa' }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField fullWidth label="Price (e.g. ₹25,999)" value={tour.price} onChange={(e) => update('price', e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField fullWidth label="Original Price (e.g. ₹32,999)" value={tour.originalPrice} onChange={(e) => update('originalPrice', e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField fullWidth label="Discount Tag (e.g. 21% OFF)" value={tour.discount} onChange={(e) => update('discount', e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
          <InputLabel>Page Type *</InputLabel>
          <Select value={tour.pageType} label="Page Type *" onChange={(e) => update('pageType', e.target.value)}>
            <MenuItem value="domestic">Domestic Tours</MenuItem>
            <MenuItem value="international">International Tours</MenuItem>
            <MenuItem value="religious">Religious Yatra</MenuItem>
            <MenuItem value="one-day">One Day Trips</MenuItem>
            <MenuItem value="trekking">Trekking</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
          <InputLabel>Difficulty</InputLabel>
          <Select value={tour.difficulty} label="Difficulty" onChange={(e) => update('difficulty', e.target.value)}>
            {['Easy', 'Moderate', 'Hard', 'Expert'].map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField fullWidth label="Tag (e.g. Most Popular)" value={tour.tag} onChange={(e) => update('tag', e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField fullWidth label="Best Time to Visit" value={tour.bestTime} onChange={(e) => update('bestTime', e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField fullWidth label="Group Size" value={tour.groupSize} onChange={(e) => update('groupSize', e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%', pt: 1 }}>
          <Typography variant="body2" sx={{ color: '#555' }}>Rating:</Typography>
          <Rating value={tour.rating} precision={0.5} onChange={(_, v) => update('rating', v)} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}><FormControlLabel control={<Switch checked={tour.active} onChange={(e) => update('active', e.target.checked)} />} label="Active (Visible on website)" /></Grid>
      <Grid item xs={12} md={6}><FormControlLabel control={<Switch checked={tour.featured} onChange={(e) => update('featured', e.target.checked)} />} label="Featured (Show on homepage)" /></Grid>
    </Grid>,

    // Step 1: Details & Inclusions
    <Grid container spacing={3} key={1}>
      {[
        { label: 'Highlights', field: 'highlights', inputKey: 'highlight', color: '#1e3a8a' },
        { label: 'Inclusions', field: 'inclusions', inputKey: 'inclusion', color: '#10b981' },
        { label: 'Exclusions', field: 'exclusions', inputKey: 'exclusion', color: '#ef4444' },
      ].map(({ label, field, inputKey, color }) => (
        <Grid item xs={12} md={4} key={field}>
          <Paper sx={{ p: 2.5, borderRadius: 3, border: `1px solid ${color}20`, height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color }}>{label}</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField size="small" fullWidth placeholder={`Add ${label.slice(0,-1)}...`} value={inputs[inputKey]}
                onChange={(e) => setInputs(prev => ({ ...prev, [inputKey]: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && addToArray(field, inputs[inputKey])}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              <IconButton onClick={() => addToArray(field, inputs[inputKey])} sx={{ bgcolor: color, color: 'white', '&:hover': { bgcolor: color, opacity: 0.9 }, borderRadius: 2 }}><Add /></IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tour[field].map((item, i) => (
                <Chip key={i} label={item} size="small" onDelete={() => removeFromArray(field, i)}
                  sx={{ bgcolor: `${color}15`, color, borderColor: `${color}30`, borderWidth: 1, borderStyle: 'solid', maxWidth: '100%', '& .MuiChip-label': { whiteSpace: 'normal', py: 0.5 } }} />
              ))}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>,

    // Step 2: Itinerary
    <Box key={2}>
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>Add Itinerary Day</Typography>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={4}><TextField fullWidth label="Day Title" size="small" value={newItineraryDay.title} onChange={(e) => setNewItineraryDay(prev => ({ ...prev, title: e.target.value }))} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
          <Grid item xs={12} md={6}><TextField fullWidth label="Description" size="small" value={newItineraryDay.description} onChange={(e) => setNewItineraryDay(prev => ({ ...prev, description: e.target.value }))} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
          <Grid item xs={12} md={2}><Button fullWidth variant="contained" onClick={addItinerary} sx={{ borderRadius: 2, bgcolor: '#1e3a8a', py: 1 }}>Add Day</Button></Grid>
        </Grid>
      </Paper>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tour.itinerary.map((day, i) => (
          <Paper key={i} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #e5e7eb', display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>{i + 1}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>{day.title}</Typography>
              <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>{day.description}</Typography>
            </Box>
            <IconButton size="small" onClick={() => removeFromArray('itinerary', i)} sx={{ color: '#ef4444' }}><Delete /></IconButton>
          </Paper>
        ))}
      </Box>
    </Box>,

    // Step 3: Media
    <Grid container spacing={3} key={3}>
      <Grid item xs={12}>
        <TextField fullWidth label="Main Image URL" placeholder="https://images.unsplash.com/..." value={tour.image} onChange={(e) => update('image', e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><PhotoCamera sx={{ color: '#aaa' }} /></InputAdornment> }} />
        {tour.image && (
          <Box sx={{ mt: 2, height: 200, borderRadius: 2, overflow: 'hidden' }}>
            <img src={tour.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Gallery Images (one URL per line)</Typography>
        <TextField fullWidth multiline rows={4} placeholder="https://... (one URL per line)"
          value={tour.gallery.join('\n')} onChange={(e) => update('gallery', e.target.value.split('\n').filter(Boolean))}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      </Grid>
      {tour.gallery.length > 0 && (
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {tour.gallery.map((url, i) => url && (
              <Grid item xs={6} md={3} key={i}>
                <Box sx={{ height: 120, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                  <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <IconButton size="small" onClick={() => removeFromArray('gallery', i)}
                    sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(239,68,68,0.9)', color: 'white', '&:hover': { bgcolor: '#dc2626' } }}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Grid>,

    // Step 4: Review
    <Grid container spacing={3} key={4}>
      <Grid item xs={12}>
        <Alert severity="info" sx={{ borderRadius: 2, mb: 2 }}>Review all details before saving</Alert>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><Typography variant="body2" sx={{ color: '#888' }}>Title</Typography><Typography variant="body1" sx={{ fontWeight: 600 }}>{tour.title || 'Not set'}</Typography></Grid>
            <Grid item xs={12} md={6}><Typography variant="body2" sx={{ color: '#888' }}>Location</Typography><Typography variant="body1" sx={{ fontWeight: 600 }}>{tour.location || 'Not set'}</Typography></Grid>
            <Grid item xs={12} md={6}><Typography variant="body2" sx={{ color: '#888' }}>Price</Typography><Typography variant="body1" sx={{ fontWeight: 600, color: '#1e3a8a' }}>{tour.price || 'Not set'}</Typography></Grid>
            <Grid item xs={12} md={6}><Typography variant="body2" sx={{ color: '#888' }}>Duration</Typography><Typography variant="body1" sx={{ fontWeight: 600 }}>{tour.duration || 'Not set'}</Typography></Grid>
            <Grid item xs={12} md={6}><Typography variant="body2" sx={{ color: '#888' }}>Type</Typography><Chip label={tour.pageType} size="small" /></Grid>
            <Grid item xs={12} md={6}><Typography variant="body2" sx={{ color: '#888' }}>Itinerary Days</Typography><Typography variant="body1" sx={{ fontWeight: 600 }}>{tour.itinerary.length} days</Typography></Grid>
            <Grid item xs={12} md={6}><Typography variant="body2" sx={{ color: '#888' }}>Highlights</Typography><Typography variant="body1" sx={{ fontWeight: 600 }}>{tour.highlights.length} highlights</Typography></Grid>
            <Grid item xs={12} md={6}><Typography variant="body2" sx={{ color: '#888' }}>Status</Typography><Chip label={tour.active ? 'Active' : 'Inactive'} size="small" sx={{ bgcolor: tour.active ? '#d1fae5' : '#fee2e2', color: tour.active ? '#065f46' : '#991b1b' }} /></Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>,
  ]

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <IconButton onClick={() => navigate('/admin/tours')} sx={{ bgcolor: '#f0f4ff', '&:hover': { bgcolor: '#dbeafe' } }}>
          <ArrowBack sx={{ color: '#1e3a8a' }} />
        </IconButton>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e' }}>{isEdit ? 'Edit Tour Package' : 'Add New Tour Package'}</Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>{isEdit ? `Editing: ${tour.title}` : 'Create a new tour package'}</Typography>
        </Box>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError('')}>{error}</Alert>}

      {/* Stepper */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}><StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '0.8rem', fontWeight: 600 } }}>{label}</StepLabel></Step>
          ))}
        </Stepper>
      </Paper>

      {/* Content */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <Fade in key={activeStep}>{stepContent[activeStep]}</Fade>
      </Paper>

      {/* Navigation */}
      <Paper sx={{ p: 3, borderRadius: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Button disabled={activeStep === 0} onClick={() => setActiveStep(p => p - 1)} variant="outlined" sx={{ borderRadius: 2, borderColor: '#1e3a8a', color: '#1e3a8a' }}>
          Previous
        </Button>
        <Typography variant="body2" sx={{ color: '#888' }}>Step {activeStep + 1} of {steps.length}</Typography>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleSave} disabled={saving} startIcon={saving ? <CircularProgress size={18} sx={{ color: 'white' }} /> : <Save />}
            sx={{ borderRadius: 2, bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' }, fontWeight: 700, px: 3 }}>
            {saving ? 'Saving...' : (isEdit ? 'Update Tour' : 'Create Tour')}
          </Button>
        ) : (
          <Button variant="contained" endIcon={<ArrowForward />} onClick={() => setActiveStep(p => p + 1)}
            sx={{ borderRadius: 2, bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' }, fontWeight: 600 }}>
            Next
          </Button>
        )}
      </Paper>
    </Box>
  )
}

export default AddEditTour
