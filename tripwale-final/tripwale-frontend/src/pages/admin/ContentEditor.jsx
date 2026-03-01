import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Paper, Typography, TextField, Button, Grid, Card, CardContent,
  IconButton, Alert, Tabs, Tab, Divider, CircularProgress, Fade,
  Chip, Switch, FormControlLabel, InputAdornment, Tooltip,
} from '@mui/material'
import {
  Save, ArrowBack, Add, Delete, Home, DirectionsCar, Flight,
  TempleHindu, CalendarToday, Hiking, Phone, Info, Refresh,
  CheckCircle, Preview,
} from '@mui/icons-material'
import { contentAPI } from '../../services/api'
import { keyframes } from '@emotion/react'

const slideUp = keyframes`from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}`

const pageIcons = {
  home: <Home />, domestic: <DirectionsCar />, international: <Flight />,
  religious: <TempleHindu />, 'one-day-trips': <CalendarToday />,
  trekking: <Hiking />, about: <Info />, contact: <Phone />,
}

const pageNames = {
  home: 'Home Page', domestic: 'Domestic Tours', international: 'International Tours',
  religious: 'Religious Yatra', 'one-day-trips': 'One Day Trips',
  trekking: 'Trekking Tours', about: 'About Us', contact: 'Contact Us',
}

const defaultSections = {
  home: {
    hero: { title: 'Experience Incredible India', subtitle: 'Discover diverse cultures, heritage & landscapes', buttonText: 'Explore Tours', buttonLink: '/domestic-tours' },
    stats: { tours: '500+', customers: '50,000+', destinations: '200+', awards: '15+' },
    ctaTitle: 'Ready to Plan Your Dream Trip?',
    ctaSubtitle: 'Get personalized tour packages with best prices guaranteed',
    ctaPhone: '+91 6266203629',
    whyChooseTitle: 'Why Choose TripWale?',
    featuredSection: { title: 'Featured Tour Packages', subtitle: 'Handpicked destinations just for you' },
  },
  domestic: {
    header: { title: 'Domestic Tour Packages', subtitle: 'Explore the beauty of incredible India' },
    customTour: { title: 'Want a Custom Tour?', description: 'Tell us your preferences and we will create the perfect package for you.', buttonText: 'Plan Custom Tour' },
  },
  international: {
    header: { title: 'International Tour Packages', subtitle: 'Explore the world with our expert guidance' },
    visa: { title: 'Visa Assistance Available', description: 'We provide complete visa documentation support.', buttonText: 'Get Visa Help' },
  },
  religious: {
    header: { title: 'Religious Yatra Packages', subtitle: 'Divine journeys to sacred destinations' },
    customYatra: { title: 'Plan Custom Yatra', description: 'Personalized yatra packages as per your convenience.', buttonText: 'Plan Now' },
  },
  'one-day-trips': {
    header: { title: 'One Day Trips', subtitle: 'Perfect weekend getaways from your city' },
  },
  trekking: {
    header: { title: 'Trekking Packages', subtitle: 'Conquer the mountains with expert guides' },
  },
  about: {
    hero: { title: 'About TripWale', subtitle: 'Your trusted travel partner since 2019' },
    story: { title: 'Our Story', content: 'TripWale was founded with a passion to make travel accessible and memorable for everyone.' },
    mission: { title: 'Our Mission', content: 'To provide exceptional travel experiences at the best prices with personalized service.' },
    stats: { years: '5+', customers: '50,000+', destinations: '200+', guides: '50+' },
  },
  contact: {
    phone: '+91 6266203629',
    email: 'info@tripwale.in',
    address: 'Indore, Madhya Pradesh, India',
    whatsapp: '916266203629',
    mapEmbed: '',
    formTitle: 'Send Us a Message',
  },
}

const SectionEditor = ({ sectionKey, data, onChange }) => {
  if (!data || typeof data !== 'object') {
    return (
      <TextField fullWidth multiline rows={3} label={sectionKey} value={data || ''}
        onChange={(e) => onChange(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
    )
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {Object.entries(data).map(([key, value]) => (
          <Grid item xs={12} md={typeof value === 'string' && value.length > 60 ? 12 : 6} key={key}>
            {typeof value === 'string' ? (
              <TextField fullWidth label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value} multiline={value.length > 100} rows={value.length > 100 ? 3 : 1}
                onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            ) : (
              <Box sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
                <Typography variant="caption" sx={{ color: '#888', mb: 1, display: 'block', textTransform: 'capitalize' }}>{key}</Typography>
                <SectionEditor sectionKey={key} data={value} onChange={(v) => onChange({ ...data, [key]: v })} />
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

const ContentEditor = () => {
  const { page } = useParams()
  const navigate = useNavigate()
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState(0)

  const sections = Object.keys(defaultSections[page] || {})

  useEffect(() => {
    loadContent()
  }, [page])

  const loadContent = async () => {
    setLoading(true)
    try {
      const res = await contentAPI.getPage(page)
      const savedSections = res.content?.sections || {}
      // Merge with defaults
      const merged = { ...defaultSections[page], ...savedSections }
      setContent(merged)
    } catch (err) {
      setContent(defaultSections[page] || {})
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      await contentAPI.updatePage(page, { sections: content })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message || 'Failed to save content')
    } finally {
      setSaving(false)
    }
  }

  const updateSection = (sectionKey, value) => {
    setContent(prev => ({ ...prev, [sectionKey]: value }))
  }

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress sx={{ color: '#1e3a8a' }} /></Box>
  )

  const currentSection = sections[activeTab]

  return (
    <Box sx={{ animation: `${slideUp} 0.4s ease` }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/admin/dashboard')} sx={{ bgcolor: '#f0f4ff', '&:hover': { bgcolor: '#dbeafe' } }}>
            <ArrowBack sx={{ color: '#1e3a8a' }} />
          </IconButton>
          <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {pageIcons[page] ? React.cloneElement(pageIcons[page], { sx: { color: 'white' } }) : <Home sx={{ color: 'white' }} />}
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e' }}>{pageNames[page] || page}</Typography>
            <Typography variant="body2" sx={{ color: '#888' }}>Edit page content - changes save to database</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Refresh />} onClick={loadContent} sx={{ borderRadius: 2, borderColor: '#1e3a8a', color: '#1e3a8a' }}>
            Reset
          </Button>
          <Button variant="outlined" startIcon={<Preview />} onClick={() => window.open('/', '_blank')} sx={{ borderRadius: 2, borderColor: '#888', color: '#666' }}>
            Preview
          </Button>
          <Button variant="contained" startIcon={saving ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <Save />}
            onClick={handleSave} disabled={saving}
            sx={{ borderRadius: 2, bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' }, fontWeight: 700 }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Box>

      {success && <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 3, borderRadius: 2 }}>Content saved successfully! Changes are now live on the website.</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError('')}>{error}</Alert>}

      {/* Section Tabs */}
      {sections.length > 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', position: 'sticky', top: 80 }}>
              <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#374151', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Page Sections</Typography>
              </Box>
              {sections.map((section, i) => (
                <Box
                  key={section} onClick={() => setActiveTab(i)}
                  sx={{
                    px: 2, py: 1.8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5,
                    bgcolor: activeTab === i ? '#eff6ff' : 'white',
                    borderLeft: activeTab === i ? '3px solid #1e3a8a' : '3px solid transparent',
                    transition: 'all 0.2s', '&:hover': { bgcolor: '#f8fafc' },
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: activeTab === i ? '#1e3a8a' : '#d1d5db' }} />
                  <Typography variant="body2" sx={{ fontWeight: activeTab === i ? 700 : 400, color: activeTab === i ? '#1e3a8a' : '#374141', textTransform: 'capitalize' }}>
                    {section.replace(/-/g, ' ').replace(/([A-Z])/g, ' $1')}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Fade in key={activeTab}>
              <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a2e', textTransform: 'capitalize' }}>
                    {currentSection?.replace(/-/g, ' ').replace(/([A-Z])/g, ' $1')} Section
                  </Typography>
                  <Chip label="Editable" size="small" sx={{ bgcolor: '#d1fae5', color: '#065f46' }} />
                </Box>
                <Divider sx={{ mb: 3 }} />
                {currentSection && (
                  <SectionEditor
                    sectionKey={currentSection}
                    data={content[currentSection]}
                    onChange={(value) => updateSection(currentSection, value)}
                  />
                )}
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" startIcon={<Save />} onClick={handleSave} disabled={saving}
                    sx={{ borderRadius: 2, bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' }, fontWeight: 700 }}>
                    Save This Section
                  </Button>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      ) : (
        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ color: '#888' }}>No sections defined for this page yet.</Typography>
        </Paper>
      )}
    </Box>
  )
}

export default ContentEditor
