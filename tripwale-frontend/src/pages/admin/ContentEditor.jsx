// src/pages/admin/ContentEditor.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Divider,
  Alert,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Slider,
  Avatar,
} from '@mui/material'
import {
  Save,
  Delete,
  AddPhotoAlternate,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  Link,
  Image,
  Title,
  Description,
  ArrowBack,
  CloudUpload,
  ColorLens,
  TextFields,
  Settings,
} from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const ContentEditor = () => {
  const { page } = useParams()
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)
  const [content, setContent] = useState({
    title: '',
    subtitle: '',
    description: '',
    images: [],
    colors: {
      primary: '#1e3a8a',
      secondary: '#FF6B6B',
      background: '#ffffff',
      text: '#333333',
    },
    typography: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontSize: '16px',
      lineHeight: 1.6,
    },
    settings: {
      showPrice: true,
      showRating: true,
      showReviews: true,
      enableBooking: true,
    }
  })

  const [pages] = useState([
    { id: 'home', name: 'Home Page', icon: <Title /> },
    { id: 'domestic', name: 'Domestic Tours', icon: <Description /> },
    { id: 'international', name: 'International Tours', icon: <Description /> },
    { id: 'religious', name: 'Religious Yatra', icon: <Description /> },
    { id: 'one-day-trips', name: 'One Day Trips', icon: <Description /> },
    { id: 'trekking', name: 'Trekking Tours', icon: <Description /> },
    { id: 'about', name: 'About Us', icon: <Description /> },
    { id: 'contact', name: 'Contact Us', icon: <Description /> },
  ])

  useEffect(() => {
    // Load saved content for this page
    const savedContent = localStorage.getItem(`tripwale_content_${page}`)
    if (savedContent) {
      setContent(JSON.parse(savedContent))
    }
  }, [page])

  const handleSave = () => {
    localStorage.setItem(`tripwale_content_${page}`, JSON.stringify(content))
    // Update live website content (in real app, this would be an API call)
    alert('Content saved successfully! Changes will reflect on website.')
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageUrls = files.map(file => URL.createObjectURL(file))
    setContent(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }))
  }

  const handleColorChange = (colorType, value) => {
    setContent(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }))
  }

  const handleTypographyChange = (property, value) => {
    setContent(prev => ({
      ...prev,
      typography: {
        ...prev.typography,
        [property]: value
      }
    }))
  }

  const handleSettingToggle = (setting) => {
    setContent(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: !prev.settings[setting]
      }
    }))
  }

  const currentPage = pages.find(p => p.id === page) || { name: 'Unknown Page' }

  const theme = createTheme({
    palette: {
      primary: { main: content.colors.primary },
      secondary: { main: content.colors.secondary },
    },
    typography: {
      fontFamily: content.typography.fontFamily,
      fontSize: parseInt(content.typography.fontSize),
      body1: {
        lineHeight: content.typography.lineHeight,
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate('/admin/dashboard')}>
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Editing: {currentPage.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Make changes and see live preview
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            sx={{ bgcolor: 'primary.main' }}
          >
            Save Changes
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          Changes made here will directly update your live website. Preview changes before saving.
        </Alert>

        <Grid container spacing={3}>
          {/* Left Column - Editor */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)', mb: 3 }}>
              <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
                <Tab icon={<TextFields />} label="Content" />
                <Tab icon={<ColorLens />} label="Design" />
                <Tab icon={<Settings />} label="Settings" />
              </Tabs>

              {tabValue === 0 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
                    Edit Page Content
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Page Title"
                    value={content.title}
                    onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: <Title sx={{ mr: 1, color: '#666' }} />,
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Page Subtitle"
                    value={content.subtitle}
                    onChange={(e) => setContent(prev => ({ ...prev, subtitle: e.target.value }))}
                    sx={{ mb: 3 }}
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={6}
                    value={content.description}
                    onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
                    sx={{ mb: 3 }}
                  />

                  {/* Rich Text Toolbar */}
                  <Paper sx={{ p: 2, mb: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <IconButton size="small">
                        <FormatBold />
                      </IconButton>
                      <IconButton size="small">
                        <FormatItalic />
                      </IconButton>
                      <IconButton size="small">
                        <FormatListBulleted />
                      </IconButton>
                      <IconButton size="small">
                        <FormatListNumbered />
                      </IconButton>
                      <IconButton size="small">
                        <Link />
                      </IconButton>
                      <IconButton size="small">
                        <Image />
                      </IconButton>
                    </Box>
                  </Paper>

                  {/* Image Upload */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      Page Images
                    </Typography>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUpload />}
                      sx={{ mr: 2 }}
                    >
                      Upload Images
                      <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Button>
                    <Button
                      variant="text"
                      startIcon={<AddPhotoAlternate />}
                      onClick={() => setContent(prev => ({ ...prev, images: [...prev.images, ''] }))}
                    >
                      Add Image URL
                    </Button>

                    {/* Image List */}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      {content.images.map((img, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <Card sx={{ position: 'relative' }}>
                            <Avatar
                              variant="square"
                              src={img}
                              sx={{ width: '100%', height: 100 }}
                            />
                            <IconButton
                              size="small"
                              sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}
                              onClick={() => {
                                const newImages = [...content.images]
                                newImages.splice(index, 1)
                                setContent(prev => ({ ...prev, images: newImages }))
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
                    Design Settings
                  </Typography>
                  
                  {/* Color Picker */}
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Color Scheme
                  </Typography>
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    {Object.entries(content.colors).map(([colorType, colorValue]) => (
                      <Grid item xs={6} sm={3} key={colorType}>
                        <Box>
                          <Typography variant="caption" sx={{ display: 'block', mb: 1, textTransform: 'capitalize' }}>
                            {colorType}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 1,
                                bgcolor: colorValue,
                                border: '2px solid rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                const color = prompt('Enter color (hex, rgb, or name):', colorValue)
                                if (color) handleColorChange(colorType, color)
                              }}
                            />
                            <TextField
                              size="small"
                              value={colorValue}
                              onChange={(e) => handleColorChange(colorType, e.target.value)}
                              sx={{ flex: 1 }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  {/* Typography */}
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Typography
                  </Typography>
                  
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Font Family</InputLabel>
                    <Select
                      value={content.typography.fontFamily.split(',')[0]}
                      label="Font Family"
                      onChange={(e) => handleTypographyChange('fontFamily', `${e.target.value}, Arial, sans-serif`)}
                    >
                      <MenuItem value="Poppins">Poppins</MenuItem>
                      <MenuItem value="Roboto">Roboto</MenuItem>
                      <MenuItem value="Montserrat">Montserrat</MenuItem>
                      <MenuItem value="Open Sans">Open Sans</MenuItem>
                      <MenuItem value="Lato">Lato</MenuItem>
                    </Select>
                  </FormControl>

                  <Box sx={{ mb: 3 }}>
                    <Typography gutterBottom>
                      Font Size: {content.typography.fontSize}
                    </Typography>
                    <Slider
                      value={parseInt(content.typography.fontSize)}
                      min={12}
                      max={24}
                      onChange={(e, value) => handleTypographyChange('fontSize', value.toString())}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography gutterBottom>
                      Line Height: {content.typography.lineHeight}
                    </Typography>
                    <Slider
                      value={content.typography.lineHeight}
                      min={1}
                      max={2}
                      step={0.1}
                      onChange={(e, value) => handleTypographyChange('lineHeight', value)}
                    />
                  </Box>
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
                    Page Settings
                  </Typography>
                  
                  {Object.entries(content.settings).map(([setting, value]) => (
                    <FormControlLabel
                      key={setting}
                      control={
                        <Switch
                          checked={value}
                          onChange={() => handleSettingToggle(setting)}
                          color="primary"
                        />
                      }
                      label={
                        <Typography sx={{ textTransform: 'capitalize' }}>
                          {setting.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </Typography>
                      }
                      sx={{ display: 'block', mb: 2 }}
                    />
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Right Column - Preview */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)' }}>
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
                Live Preview
              </Typography>

              <Card sx={{ border: '1px solid rgba(0,0,0,0.1)', mb: 3 }}>
                <CardContent sx={{ fontFamily: content.typography.fontFamily }}>
                  {content.title && (
                    <Typography variant="h5" sx={{ color: content.colors.primary, mb: 2 }}>
                      {content.title}
                    </Typography>
                  )}
                  {content.subtitle && (
                    <Typography variant="subtitle1" sx={{ color: content.colors.text, mb: 2, opacity: 0.8 }}>
                      {content.subtitle}
                    </Typography>
                  )}
                  {content.description && (
                    <Typography variant="body1" sx={{ 
                      color: content.colors.text,
                      lineHeight: content.typography.lineHeight,
                      fontSize: content.typography.fontSize,
                    }}>
                      {content.description}
                    </Typography>
                  )}
                </CardContent>
                {content.settings.showPrice && (
                  <CardActions>
                    <Button sx={{ color: content.colors.secondary, fontWeight: 600 }}>
                      ₹25,999
                    </Button>
                  </CardActions>
                )}
              </Card>

              {/* Color Preview */}
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Color Preview
              </Typography>
              <Grid container spacing={1} sx={{ mb: 3 }}>
                {Object.entries(content.colors).map(([colorType, colorValue]) => (
                  <Grid item xs={3} key={colorType}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: '100%',
                          height: 40,
                          bgcolor: colorValue,
                          borderRadius: 1,
                          mb: 0.5,
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                      />
                      <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                        {colorType}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Current Settings */}
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Active Settings
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Object.entries(content.settings).map(([setting, value]) => (
                  value && (
                    <Chip
                      key={setting}
                      label={setting.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default ContentEditor