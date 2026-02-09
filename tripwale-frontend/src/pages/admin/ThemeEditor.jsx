// src/pages/admin/ThemeEditor.jsx
import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
  Alert,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from '@mui/material'
import {
  Save,
  Palette,
  Refresh,
  Visibility,
  VisibilityOff,
  ColorLens,
  TextFields,
  BorderAll,
  Dashboard,
  Smartphone,
  Tablet,
  DesktopWindows,
} from '@mui/icons-material'

const ThemeEditor = () => {
  const [theme, setTheme] = useState({
    colors: {
      primary: '#1e3a8a',
      secondary: '#FF6B6B',
      background: '#ffffff',
      text: '#333333',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    typography: {
      fontFamily: 'Poppins, Arial, sans-serif',
      h1: { size: '3.5rem', weight: 800, lineHeight: 1.2 },
      h2: { size: '2.5rem', weight: 700, lineHeight: 1.3 },
      h3: { size: '2rem', weight: 600, lineHeight: 1.4 },
      h4: { size: '1.5rem', weight: 600, lineHeight: 1.4 },
      h5: { size: '1.25rem', weight: 500, lineHeight: 1.5 },
      h6: { size: '1rem', weight: 500, lineHeight: 1.5 },
      body1: { size: '1rem', weight: 400, lineHeight: 1.6 },
      body2: { size: '0.875rem', weight: 400, lineHeight: 1.6 },
    },
    spacing: {
      unit: 8,
      borderRadius: '8px',
      buttonRadius: '50px',
      cardRadius: '12px',
    },
    effects: {
      shadows: true,
      transitions: true,
      hoverEffects: true,
      animations: true,
    },
    layout: {
      containerWidth: 'xl',
      sidebarWidth: '280px',
      headerHeight: '64px',
      footerHeight: 'auto',
    },
  })

  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [showCode, setShowCode] = useState(false)

  const handleColorChange = (colorName, value) => {
    setTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorName]: value
      }
    }))
  }

  const handleTypographyChange = (element, property, value) => {
    setTheme(prev => ({
      ...prev,
      typography: {
        ...prev.typography,
        [element]: {
          ...prev.typography[element],
          [property]: value
        }
      }
    }))
  }

  const handleSpacingChange = (property, value) => {
    setTheme(prev => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        [property]: value
      }
    }))
  }

  const handleEffectToggle = (effect) => {
    setTheme(prev => ({
      ...prev,
      effects: {
        ...prev.effects,
        [effect]: !prev.effects[effect]
      }
    }))
  }

  const handleSave = () => {
    localStorage.setItem('tripwale_theme', JSON.stringify(theme))
    // Apply theme to website
    document.documentElement.style.setProperty('--primary-color', theme.colors.primary)
    document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary)
    document.documentElement.style.setProperty('--background-color', theme.colors.background)
    document.documentElement.style.setProperty('--text-color', theme.colors.text)
    
    alert('Theme saved successfully! Refresh page to see changes.')
  }

  const handleReset = () => {
    setTheme({
      colors: {
        primary: '#1e3a8a',
        secondary: '#FF6B6B',
        background: '#ffffff',
        text: '#333333',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
        h1: { size: '3.5rem', weight: 800, lineHeight: 1.2 },
        h2: { size: '2.5rem', weight: 700, lineHeight: 1.3 },
        h3: { size: '2rem', weight: 600, lineHeight: 1.4 },
        h4: { size: '1.5rem', weight: 600, lineHeight: 1.4 },
        h5: { size: '1.25rem', weight: 500, lineHeight: 1.5 },
        h6: { size: '1rem', weight: 500, lineHeight: 1.5 },
        body1: { size: '1rem', weight: 400, lineHeight: 1.6 },
        body2: { size: '0.875rem', weight: 400, lineHeight: 1.6 },
      },
      spacing: {
        unit: 8,
        borderRadius: '8px',
        buttonRadius: '50px',
        cardRadius: '12px',
      },
      effects: {
        shadows: true,
        transitions: true,
        hoverEffects: true,
        animations: true,
      },
      layout: {
        containerWidth: 'xl',
        sidebarWidth: '280px',
        headerHeight: '64px',
        footerHeight: 'auto',
      },
    })
    alert('Theme reset to default!')
  }

  const ColorPicker = ({ label, color, onChange }) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" sx={{ mb: 1, color: '#666', textTransform: 'capitalize' }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            bgcolor: color,
            border: '2px solid rgba(0,0,0,0.1)',
            cursor: 'pointer',
          }}
          onClick={() => {
            const newColor = prompt(`Enter ${label} color (hex, rgb, or name):`, color)
            if (newColor) onChange(newColor)
          }}
        />
        <TextField
          size="small"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          sx={{ flex: 1 }}
        />
      </Box>
    </Box>
  )

  const PreviewBox = ({ children, sx = {} }) => (
    <Box
      sx={{
        width: previewDevice === 'mobile' ? '320px' : 
               previewDevice === 'tablet' ? '768px' : '100%',
        maxWidth: '100%',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: theme.spacing.cardRadius,
        overflow: 'hidden',
        transition: 'all 0.3s',
        ...sx,
      }}
    >
      {children}
    </Box>
  )

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 1 }}>
            Theme Editor
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Customize the look and feel of your entire website
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            sx={{ bgcolor: '#1e3a8a' }}
          >
            Save Theme
          </Button>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        Changes made here will affect the entire website appearance. Preview changes before saving.
      </Alert>

      <Grid container spacing={3}>
        {/* Left Column - Theme Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ColorLens sx={{ mr: 1, color: '#1e3a8a' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                Color Scheme
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {Object.entries(theme.colors).map(([colorName, colorValue]) => (
                <Grid item xs={12} sm={6} key={colorName}>
                  <ColorPicker
                    label={colorName}
                    color={colorValue}
                    onChange={(value) => handleColorChange(colorName, value)}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TextFields sx={{ mr: 1, color: '#1e3a8a' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                Typography
              </Typography>
            </Box>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Font Family</InputLabel>
              <Select
                value={theme.typography.fontFamily.split(',')[0]}
                label="Font Family"
                onChange={(e) => 
                  setTheme(prev => ({
                    ...prev,
                    typography: {
                      ...prev.typography,
                      fontFamily: `${e.target.value}, Arial, sans-serif`
                    }
                  }))
                }
              >
                <MenuItem value="Poppins">Poppins</MenuItem>
                <MenuItem value="Roboto">Roboto</MenuItem>
                <MenuItem value="Montserrat">Montserrat</MenuItem>
                <MenuItem value="Open Sans">Open Sans</MenuItem>
                <MenuItem value="Lato">Lato</MenuItem>
                <MenuItem value="Inter">Inter</MenuItem>
              </Select>
            </FormControl>

            {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((element) => (
              <Box key={element} sx={{ mb: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, textTransform: 'uppercase' }}>
                  {element.toUpperCase()}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      label="Size"
                      value={theme.typography[element].size.replace('rem', '')}
                      onChange={(e) => handleTypographyChange(element, 'size', `${e.target.value}rem`)}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      label="Weight"
                      value={theme.typography[element].weight}
                      onChange={(e) => handleTypographyChange(element, 'weight', parseInt(e.target.value))}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      label="Line Height"
                      value={theme.typography[element].lineHeight}
                      onChange={(e) => handleTypographyChange(element, 'lineHeight', parseFloat(e.target.value))}
                      type="number"
                      step="0.1"
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <BorderAll sx={{ mr: 1, color: '#1e3a8a' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                Spacing & Effects
              </Typography>
            </Box>

            {Object.entries(theme.spacing).map(([key, value]) => (
              <Box key={key} sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, color: '#666', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </Typography>
                {typeof value === 'number' ? (
                  <Slider
                    value={value}
                    min={1}
                    max={20}
                    onChange={(e, val) => handleSpacingChange(key, val)}
                    valueLabelDisplay="auto"
                  />
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    value={value}
                    onChange={(e) => handleSpacingChange(key, e.target.value)}
                  />
                )}
              </Box>
            ))}

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Effects
            </Typography>
            {Object.entries(theme.effects).map(([effect, enabled]) => (
              <FormControlLabel
                key={effect}
                control={
                  <Switch
                    checked={enabled}
                    onChange={() => handleEffectToggle(effect)}
                    color="primary"
                  />
                }
                label={
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {effect.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </Typography>
                }
                sx={{ display: 'block', mb: 1 }}
              />
            ))}
          </Paper>
        </Grid>

        {/* Right Column - Preview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)', mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                Live Preview
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  size="small"
                  color={previewDevice === 'mobile' ? 'primary' : 'default'}
                  onClick={() => setPreviewDevice('mobile')}
                >
                  <Smartphone />
                </IconButton>
                <IconButton
                  size="small"
                  color={previewDevice === 'tablet' ? 'primary' : 'default'}
                  onClick={() => setPreviewDevice('tablet')}
                >
                  <Tablet />
                </IconButton>
                <IconButton
                  size="small"
                  color={previewDevice === 'desktop' ? 'primary' : 'default'}
                  onClick={() => setPreviewDevice('desktop')}
                >
                  <DesktopWindows />
                </IconButton>
              </Box>
            </Box>

            {/* Preview */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PreviewBox>
                {/* Header Preview */}
                <Box
                  sx={{
                    p: 2,
                    bgcolor: theme.colors.primary,
                    color: 'white',
                    fontFamily: theme.typography.fontFamily,
                  }}
                >
                  <Typography variant="h6" sx={{ 
                    fontSize: theme.typography.h6.size,
                    fontWeight: theme.typography.h6.weight,
                  }}>
                    {theme.colors.primary === '#1e3a8a' ? 'TripWale.in' : 'Website Header'}
                  </Typography>
                </Box>

                {/* Content Preview */}
                <Box sx={{ p: 3, fontFamily: theme.typography.fontFamily }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: theme.typography.h1.size,
                      fontWeight: theme.typography.h1.weight,
                      lineHeight: theme.typography.h1.lineHeight,
                      color: theme.colors.text,
                      mb: 2,
                    }}
                  >
                    Welcome Preview
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: theme.typography.body1.size,
                      fontWeight: theme.typography.body1.weight,
                      lineHeight: theme.typography.body1.lineHeight,
                      color: theme.colors.text,
                      mb: 3,
                    }}
                  >
                    This is how your website text will look with the current theme settings.
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: theme.colors.primary,
                        borderRadius: theme.spacing.buttonRadius,
                      }}
                    >
                      Primary Button
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: theme.colors.secondary,
                        color: theme.colors.secondary,
                        borderRadius: theme.spacing.buttonRadius,
                      }}
                    >
                      Secondary Button
                    </Button>
                  </Box>

                  {/* Color Palette Preview */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: theme.colors.text }}>
                      Color Palette
                    </Typography>
                    <Grid container spacing={1}>
                      {Object.entries(theme.colors).map(([name, color]) => (
                        <Grid item xs={4} sm={3} key={name}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Box
                              sx={{
                                width: '100%',
                                height: 40,
                                bgcolor: color,
                                borderRadius: theme.spacing.borderRadius,
                                mb: 0.5,
                                border: '1px solid rgba(0,0,0,0.1)',
                              }}
                            />
                            <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                              {name}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Card Preview */}
                  <Card sx={{ 
                    borderRadius: theme.spacing.cardRadius,
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: theme.effects.shadows ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                    transition: theme.effects.transitions ? 'all 0.3s' : 'none',
                    '&:hover': theme.effects.hoverEffects ? {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    } : {},
                  }}>
                    <Box sx={{ 
                      height: 120, 
                      bgcolor: theme.colors.primary,
                      borderTopLeftRadius: theme.spacing.cardRadius,
                      borderTopRightRadius: theme.spacing.cardRadius,
                    }} />
                    <CardContent>
                      <Typography variant="h6" sx={{ color: theme.colors.text, mb: 1 }}>
                        Sample Card
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.colors.text }}>
                        This card demonstrates the current theme settings including border radius and shadows.
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </PreviewBox>
            </Box>
          </Paper>

          {/* Current Theme Summary */}
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1e3a8a' }}>
              Theme Summary
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    Primary Color
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: '50%', 
                      bgcolor: theme.colors.primary,
                      border: '1px solid rgba(0,0,0,0.1)',
                    }} />
                    <Typography variant="body1">{theme.colors.primary}</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    Font Family
                  </Typography>
                  <Typography variant="body1">
                    {theme.typography.fontFamily.split(',')[0]}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    Border Radius
                  </Typography>
                  <Typography variant="body1">
                    {theme.spacing.borderRadius}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    Active Effects
                  </Typography>
                  <Typography variant="body1">
                    {Object.values(theme.effects).filter(v => v).length} of 4
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="outlined"
              startIcon={showCode ? <VisibilityOff /> : <Visibility />}
              onClick={() => setShowCode(!showCode)}
              sx={{ mt: 2 }}
            >
              {showCode ? 'Hide Theme Code' : 'Show Theme Code'}
            </Button>

            {showCode && (
              <Box sx={{ 
                mt: 2, 
                p: 2, 
                bgcolor: '#f8f9fa', 
                borderRadius: 2,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                overflow: 'auto',
                maxHeight: 200,
              }}>
                <pre>{JSON.stringify(theme, null, 2)}</pre>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ThemeEditor