import React, { useState, useEffect } from 'react'
import {
  Box, Paper, Typography, Grid, Card, Button, TextField, Divider,
  Alert, Slider, Select, MenuItem, FormControl, InputLabel, CircularProgress,
} from '@mui/material'
import { Save, Refresh, Palette, TextFields } from '@mui/icons-material'
import { settingsAPI } from '../../services/api'
import { keyframes } from '@emotion/react'

const slideUp = keyframes`from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}`

const ColorSwatch = ({ label, value, onChange }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" sx={{ color: '#555', mb: 1, fontWeight: 600 }}>{label}</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: 50, height: 44, border: 'none', borderRadius: 8, cursor: 'pointer', padding: 2, background: 'none' }} />
      <TextField size="small" value={value} onChange={(e) => onChange(e.target.value)}
        sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: 2, fontFamily: 'monospace' } }} />
      <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: value, boxShadow: 2 }} />
    </Box>
  </Box>
)

const ThemeEditor = () => {
  const [theme, setTheme] = useState({
    primaryColor: '#1e3a8a', secondaryColor: '#FF6B6B', accentColor: '#10b981',
    backgroundColor: '#ffffff', textColor: '#333333', headerBg: '#ffffff',
    footerBg: '#1a1a2e', fontFamily: 'Poppins',
    borderRadius: 8, buttonRadius: 50,
  })
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadTheme()
  }, [])

  const loadTheme = async () => {
    setLoading(true)
    try {
      const res = await settingsAPI.getCategory('theme')
      if (res.success && Object.keys(res.settings).length) {
        setTheme(prev => ({ ...prev, ...res.settings }))
      }
    } catch {}
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await settingsAPI.updateCategory('theme', theme)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error(err)
    }
    setSaving(false)
  }

  const update = (key, value) => setTheme(prev => ({ ...prev, [key]: value }))

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress sx={{ color: '#1e3a8a' }} /></Box>
  )

  return (
    <Box sx={{ animation: `${slideUp} 0.4s ease` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Theme & Design</Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>Customize website colors, fonts & appearance</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Refresh />} onClick={loadTheme} sx={{ borderRadius: 2 }}>Reset</Button>
          <Button variant="contained" startIcon={saving ? <CircularProgress size={18} sx={{ color: 'white' }} /> : <Save />}
            onClick={handleSave} disabled={saving}
            sx={{ borderRadius: 2, bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' }, fontWeight: 700 }}>
            {saving ? 'Saving...' : 'Save Theme'}
          </Button>
        </Box>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>Theme saved! Refresh the website to see changes.</Alert>}

      <Grid container spacing={3}>
        {/* Colors */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Palette sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Color Palette</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <ColorSwatch label="Primary Color (Navbar, Buttons)" value={theme.primaryColor} onChange={(v) => update('primaryColor', v)} />
            <ColorSwatch label="Secondary / Accent Color" value={theme.secondaryColor} onChange={(v) => update('secondaryColor', v)} />
            <ColorSwatch label="Success / Highlight Color" value={theme.accentColor} onChange={(v) => update('accentColor', v)} />
            <ColorSwatch label="Background Color" value={theme.backgroundColor} onChange={(v) => update('backgroundColor', v)} />
            <ColorSwatch label="Text Color" value={theme.textColor} onChange={(v) => update('textColor', v)} />
            <ColorSwatch label="Footer Background" value={theme.footerBg} onChange={(v) => update('footerBg', v)} />
          </Paper>
        </Grid>

        {/* Typography & Spacing */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 15px rgba(0,0,0,0.06)', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TextFields sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Typography</Typography>
            </Box>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Font Family</InputLabel>
              <Select value={theme.fontFamily} label="Font Family" onChange={(e) => update('fontFamily', e.target.value)}
                sx={{ borderRadius: 2 }}>
                {['Poppins', 'Inter', 'Roboto', 'Nunito', 'Lato', 'Montserrat', 'Open Sans'].map(f => (
                  <MenuItem key={f} value={f} style={{ fontFamily: f }}>{f}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ color: '#555', mb: 2, fontWeight: 600 }}>
                Card Border Radius: {theme.borderRadius}px
              </Typography>
              <Slider value={theme.borderRadius} min={0} max={24} step={2} onChange={(_, v) => update('borderRadius', v)}
                sx={{ color: '#1e3a8a' }} marks={[{value:0,label:'0'},{value:12,label:'12'},{value:24,label:'24'}]} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: '#555', mb: 2, fontWeight: 600 }}>
                Button Border Radius: {theme.buttonRadius}px
              </Typography>
              <Slider value={theme.buttonRadius} min={0} max={50} step={4} onChange={(_, v) => update('buttonRadius', v)}
                sx={{ color: '#1e3a8a' }} marks={[{value:0,label:'Square'},{value:25,label:'Pill'},{value:50,label:'Round'}]} />
            </Box>
          </Paper>

          {/* Live Preview */}
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Live Preview</Typography>
            <Box sx={{ bgcolor: theme.backgroundColor, p: 3, borderRadius: 2, border: '1px solid #e5e7eb' }}>
              <Box sx={{ bgcolor: theme.primaryColor, p: 2, borderRadius: 1, mb: 2, textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontFamily: theme.fontFamily }}>Navigation Bar</Typography>
              </Box>
              <Typography sx={{ color: theme.textColor, mb: 2, fontFamily: theme.fontFamily, fontWeight: 700, fontSize: '1.2rem' }}>
                Sample Page Heading
              </Typography>
              <Typography sx={{ color: theme.textColor, mb: 2, fontFamily: theme.fontFamily, opacity: 0.7, fontSize: '0.9rem' }}>
                This is how your website text will look with the selected font and colors.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box sx={{ bgcolor: theme.primaryColor, px: 3, py: 1.5, borderRadius: `${theme.buttonRadius}px`, cursor: 'pointer' }}>
                  <Typography sx={{ color: 'white', fontFamily: theme.fontFamily, fontWeight: 600, fontSize: '0.85rem' }}>Primary Button</Typography>
                </Box>
                <Box sx={{ bgcolor: theme.secondaryColor, px: 3, py: 1.5, borderRadius: `${theme.buttonRadius}px`, cursor: 'pointer' }}>
                  <Typography sx={{ color: 'white', fontFamily: theme.fontFamily, fontWeight: 600, fontSize: '0.85rem' }}>Secondary</Typography>
                </Box>
              </Box>
              <Box sx={{ bgcolor: theme.footerBg, p: 2, borderRadius: 1, textAlign: 'center' }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontFamily: theme.fontFamily, fontSize: '0.8rem' }}>Footer</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ThemeEditor
