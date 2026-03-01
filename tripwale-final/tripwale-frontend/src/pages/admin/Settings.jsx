import React, { useState, useEffect } from 'react'
import {
  Box, Paper, Typography, TextField, Button, Switch, FormControlLabel,
  Divider, Alert, Grid, CircularProgress, Tabs, Tab, IconButton, Chip,
} from '@mui/material'
import { Save, Settings as SettingsIcon, Phone, Email, Language, Notifications, Security, WhatsApp } from '@mui/icons-material'
import { settingsAPI } from '../../services/api'
import { keyframes } from '@emotion/react'

const slideUp = keyframes`from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}`

const Settings = () => {
  const [tab, setTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [settings, setSettings] = useState({
    general: { siteName: 'TripWale.in', siteTagline: 'Explore India with Us', contactPhone: '+91 6266203629', contactEmail: 'info@tripwale.in', contactAddress: 'Indore, Madhya Pradesh, India' },
    integrations: { whatsappNumber: '916266203629', googleAnalytics: '', googleMapsApi: '', facebookPixel: '' },
    social: { facebook: '', instagram: '', youtube: '', twitter: '' },
    seo: { metaTitle: 'TripWale - Best Tour Packages in India', metaDescription: 'Discover amazing tour packages across India and abroad with TripWale.', keywords: 'tour packages, travel india, pilgrimage tours' },
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const res = await settingsAPI.getAll()
      if (res.success) {
        setSettings(prev => ({ ...prev, ...res.settings }))
      }
    } catch (err) {
      console.error('Load settings error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const categories = Object.keys(settings)
      for (const cat of categories) {
        await settingsAPI.updateCategory(cat, settings[cat])
      }
      setSuccess('Settings saved successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({ ...prev, [category]: { ...prev[category], [key]: value } }))
  }

  const tabConfigs = [
    { label: 'General', icon: <SettingsIcon />, category: 'general', fields: [
      { key: 'siteName', label: 'Website Name', placeholder: 'TripWale.in' },
      { key: 'siteTagline', label: 'Tagline', placeholder: 'Explore India with Us' },
      { key: 'contactPhone', label: 'Contact Phone', placeholder: '+91 6266203629' },
      { key: 'contactEmail', label: 'Contact Email', placeholder: 'info@tripwale.in' },
      { key: 'contactAddress', label: 'Address', placeholder: 'Indore, Madhya Pradesh' },
    ]},
    { label: 'Integrations', icon: <WhatsApp />, category: 'integrations', fields: [
      { key: 'whatsappNumber', label: 'WhatsApp Number (with country code)', placeholder: '916266203629' },
      { key: 'googleAnalytics', label: 'Google Analytics ID', placeholder: 'G-XXXXXXXXXX' },
      { key: 'googleMapsApi', label: 'Google Maps API Key', placeholder: 'AIzaSy...' },
      { key: 'facebookPixel', label: 'Facebook Pixel ID', placeholder: '123456789' },
    ]},
    { label: 'Social Media', icon: <Language />, category: 'social', fields: [
      { key: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/tripwale' },
      { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/tripwale' },
      { key: 'youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/tripwale' },
      { key: 'twitter', label: 'Twitter/X URL', placeholder: 'https://twitter.com/tripwale' },
    ]},
    { label: 'SEO', icon: <Language />, category: 'seo', fields: [
      { key: 'metaTitle', label: 'Meta Title', placeholder: 'TripWale - Best Tours' },
      { key: 'metaDescription', label: 'Meta Description', placeholder: '...', multiline: true, rows: 3 },
      { key: 'keywords', label: 'Keywords (comma separated)', placeholder: 'tour, travel, india', multiline: true, rows: 2 },
    ]},
  ]

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress sx={{ color: '#1e3a8a' }} /></Box>
  )

  return (
    <Box sx={{ animation: `${slideUp} 0.4s ease` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Site Settings</Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>Configure your website settings</Typography>
        </Box>
        <Button variant="contained" startIcon={saving ? <CircularProgress size={18} sx={{ color: 'white' }} /> : <Save />}
          onClick={handleSave} disabled={saving}
          sx={{ borderRadius: 2, bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' }, fontWeight: 700 }}>
          {saving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError('')}>{error}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', position: 'sticky', top: 80 }}>
            {tabConfigs.map((t, i) => (
              <Box key={i} onClick={() => setTab(i)}
                sx={{
                  px: 2.5, py: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2,
                  bgcolor: tab === i ? '#eff6ff' : 'white',
                  borderLeft: tab === i ? '3px solid #1e3a8a' : '3px solid transparent',
                  borderBottom: '1px solid #f0f0f0', transition: 'all 0.2s',
                  '&:hover': { bgcolor: '#f8fafc' },
                }}
              >
                <Box sx={{ color: tab === i ? '#1e3a8a' : '#888' }}>{t.icon}</Box>
                <Typography variant="body2" sx={{ fontWeight: tab === i ? 700 : 400, color: tab === i ? '#1e3a8a' : '#374141' }}>{t.label}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.cloneElement(tabConfigs[tab].icon, { sx: { color: 'white' } })}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a2e' }}>{tabConfigs[tab].label} Settings</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              {tabConfigs[tab].fields.map(({ key, label, placeholder, multiline, rows }) => (
                <Grid item xs={12} md={multiline ? 12 : 6} key={key}>
                  <TextField fullWidth label={label} placeholder={placeholder}
                    multiline={multiline} rows={rows || 1}
                    value={settings[tabConfigs[tab].category]?.[key] || ''}
                    onChange={(e) => updateSetting(tabConfigs[tab].category, key, e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" startIcon={<Save />} onClick={handleSave} disabled={saving}
                sx={{ borderRadius: 2, bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' }, fontWeight: 700 }}>
                Save {tabConfigs[tab].label} Settings
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Settings
