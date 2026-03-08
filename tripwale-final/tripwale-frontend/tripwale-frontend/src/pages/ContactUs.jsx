import React, { useState, useEffect } from 'react'
import {
  Container, Box, Typography, Grid, TextField, Button,
  Card, CardContent, Alert, CircularProgress, Chip,
} from '@mui/material'
import { Phone, Email, LocationOn, WhatsApp, Send, CheckCircle } from '@mui/icons-material'
import { contactAPI, settingsAPI } from '../services/api'

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [siteSettings, setSiteSettings] = useState({})

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await settingsAPI.getCategory('general')
        if (res.success) setSiteSettings(res.settings)
      } catch {}
    }
    loadSettings()
  }, [])

  const phone = siteSettings.contactPhone || '+91 6266203629'
  const email = siteSettings.contactEmail || 'info@tripwale.in'
  const address = siteSettings.contactAddress || 'Indore, Madhya Pradesh, India'
  const whatsapp = siteSettings.whatsappNumber || '916266203629'

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError('Please fill in all required fields')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await contactAPI.submit(formData)
      if (res.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      }
    } catch (err) {
      // Fallback: redirect to WhatsApp
      const msg = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsApp = () => {
    const msg = "Hi, I'd like to enquire about your tour packages."
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const contactInfo = [
    { icon: <Phone />, label: 'Phone', value: phone, color: '#1e3a8a', action: () => window.open(`tel:${phone}`) },
    { icon: <WhatsApp />, label: 'WhatsApp', value: phone, color: '#25D366', action: handleWhatsApp },
    { icon: <Email />, label: 'Email', value: email, color: '#3b82f6', action: () => window.open(`mailto:${email}`) },
    { icon: <LocationOn />, label: 'Office', value: address, color: '#ef4444' },
  ]

  return (
    <Box>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        py: { xs: 6, md: 10 }, textAlign: 'center', color: 'white', position: 'relative',
      }}>
        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
          Get In Touch
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 500, mx: 'auto' }}>
          Ready to plan your dream trip? We're here to help 24/7
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Contact Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {contactInfo.map((item, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Card
                onClick={item.action}
                sx={{
                  p: 2.5, textAlign: 'center', borderRadius: 3, cursor: item.action ? 'pointer' : 'default',
                  transition: 'all 0.3s', border: `1px solid ${item.color}20`,
                  '&:hover': item.action ? { transform: 'translateY(-4px)', boxShadow: `0 12px 30px ${item.color}25` } : {},
                  boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                }}
              >
                <Box sx={{ width: 52, height: 52, borderRadius: '50%', bgcolor: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
                  {React.cloneElement(item.icon, { sx: { color: item.color, fontSize: 24 } })}
                </Box>
                <Typography variant="body2" sx={{ color: '#888', mb: 0.5, fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</Typography>
                <Typography variant="body2" sx={{ color: '#1a1a2e', fontWeight: 600, fontSize: '0.85rem', wordBreak: 'break-all' }}>{item.value}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 30px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <Box sx={{ p: 0.5, background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }} />
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 3 }}>
                  Send Us a Message
                </Typography>

                {submitted ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <CheckCircle sx={{ fontSize: 64, color: '#10b981', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1a1a2e' }}>Message Sent!</Typography>
                    <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>We'll contact you within 24 hours. You can also reach us on WhatsApp for instant reply!</Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                      <Button variant="outlined" onClick={() => setSubmitted(false)} sx={{ borderRadius: 2 }}>Send Another</Button>
                      <Button variant="contained" startIcon={<WhatsApp />} onClick={handleWhatsApp}
                        sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' }, borderRadius: 2 }}>WhatsApp Us</Button>
                    </Box>
                  </Box>
                ) : (
                  <Box component="form" onSubmit={handleSubmit}>
                    {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError('')}>{error}</Alert>}
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField required fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField required fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField required fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField required fullWidth label="Message *" name="message" multiline rows={5} value={formData.message} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <Button fullWidth type="submit" variant="contained" size="large" disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Send />}
                        sx={{ borderRadius: 3, bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' }, py: 1.5, fontWeight: 700 }}>
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                      <Button fullWidth variant="outlined" size="large" startIcon={<WhatsApp />} onClick={handleWhatsApp}
                        sx={{ borderRadius: 3, borderColor: '#25D366', color: '#25D366', '&:hover': { bgcolor: '#25D36610' }, py: 1.5, fontWeight: 700 }}>
                        WhatsApp
                      </Button>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Info */}
          <Grid item xs={12} md={5}>
            <Box sx={{ p: 4, borderRadius: 3, background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', color: 'white', height: '100%' }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Why Contact Us?</Typography>
              {[
                '🎯 Personalized tour packages',
                '💰 Best price guarantee',
                '🏨 Hotel & flight booking help',
                '🛂 Visa assistance available',
                '📞 24/7 customer support',
                '✅ Trusted by 50,000+ travelers',
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#a5f3fc', flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ opacity: 0.95 }}>{item}</Typography>
                </Box>
              ))}
              <Box sx={{ mt: 4, p: 3, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.1)' }}>
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>Business Hours</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>Mon–Sat: 9AM – 8PM</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>Sunday: 10AM – 6PM</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ContactUs
