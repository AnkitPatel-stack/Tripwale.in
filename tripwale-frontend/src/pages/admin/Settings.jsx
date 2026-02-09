// src/pages/admin/Settings.jsx
import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Grid,
  Card,
  CardContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  Save,
  Security,
  Email,
  Phone,
  LocationOn,
  Language,
  Notifications,
  Backup,
  Restore,
  Delete,
  Add,
  Edit,
} from '@mui/icons-material'

const Settings = () => {
  const [settings, setSettings] = useState({
    general: {
      siteName: 'TripWale.in',
      siteUrl: 'https://tripwale.in',
      contactEmail: 'info@tripwale.in',
      contactPhone: '+91 6266203629',
      address: 'Indore, Madhya Pradesh, India',
      defaultLanguage: 'en',
      timezone: 'Asia/Kolkata',
      maintenanceMode: false,
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: 'noreply@tripwale.in',
      smtpPassword: '',
      fromEmail: 'noreply@tripwale.in',
      fromName: 'TripWale.in',
    },
    notifications: {
      newBooking: true,
      newReview: true,
      contactForm: true,
      newsletter: false,
      whatsappAlerts: true,
    },
    security: {
      requireLogin: false,
      enableCaptcha: true,
      maxLoginAttempts: '5',
      sessionTimeout: '30',
      backupFrequency: 'daily',
    },
    integrations: {
      whatsappNumber: '916266203629',
      googleAnalytics: '',
      facebookPixel: '',
      googleMapsApi: '',
    },
  })

  const [openDialog, setOpenDialog] = useState('')
  const [backupMessage, setBackupMessage] = useState('')

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  const handleSave = () => {
    localStorage.setItem('tripwale_settings', JSON.stringify(settings))
    alert('Settings saved successfully!')
  }

  const handleBackup = () => {
    const backupData = {
      settings,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }
    
    const dataStr = JSON.stringify(backupData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `tripwale-backup-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    setBackupMessage('Backup created successfully!')
    setTimeout(() => setBackupMessage(''), 3000)
  }

  const handleRestore = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target.result)
        if (backupData.settings) {
          setSettings(backupData.settings)
          alert('Settings restored successfully!')
        }
      } catch (error) {
        alert('Error restoring backup: Invalid file format')
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      setSettings({
        general: {
          siteName: 'TripWale.in',
          siteUrl: 'https://tripwale.in',
          contactEmail: 'info@tripwale.in',
          contactPhone: '+91 6266203629',
          address: 'Indore, Madhya Pradesh, India',
          defaultLanguage: 'en',
          timezone: 'Asia/Kolkata',
          maintenanceMode: false,
        },
        email: {
          smtpHost: 'smtp.gmail.com',
          smtpPort: '587',
          smtpUser: 'noreply@tripwale.in',
          smtpPassword: '',
          fromEmail: 'noreply@tripwale.in',
          fromName: 'TripWale.in',
        },
        notifications: {
          newBooking: true,
          newReview: true,
          contactForm: true,
          newsletter: false,
          whatsappAlerts: true,
        },
        security: {
          requireLogin: false,
          enableCaptcha: true,
          maxLoginAttempts: '5',
          sessionTimeout: '30',
          backupFrequency: 'daily',
        },
        integrations: {
          whatsappNumber: '916266203629',
          googleAnalytics: '',
          facebookPixel: '',
          googleMapsApi: '',
        },
      })
      alert('Settings reset to default!')
    }
  }

  const SettingSection = ({ title, icon, children }) => (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 600, color: '#1e3a8a' }}>
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  )

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 1 }}>
            Website Settings
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Configure your website preferences and integrations
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          sx={{ bgcolor: '#1e3a8a' }}
        >
          Save All Changes
        </Button>
      </Box>

      {backupMessage && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {backupMessage}
        </Alert>
      )}

      {/* General Settings */}
      <SettingSection title="General Settings" icon={<Language />}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Site Name"
              value={settings.general.siteName}
              onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Site URL"
              value={settings.general.siteUrl}
              onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Email"
              value={settings.general.contactEmail}
              onChange={(e) => handleSettingChange('general', 'contactEmail', e.target.value)}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: '#666' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Phone"
              value={settings.general.contactPhone}
              onChange={(e) => handleSettingChange('general', 'contactPhone', e.target.value)}
              InputProps={{
                startAdornment: <Phone sx={{ mr: 1, color: '#666' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={settings.general.address}
              onChange={(e) => handleSettingChange('general', 'address', e.target.value)}
              InputProps={{
                startAdornment: <LocationOn sx={{ mr: 1, color: '#666' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Default Language</InputLabel>
              <Select
                value={settings.general.defaultLanguage}
                label="Default Language"
                onChange={(e) => handleSettingChange('general', 'defaultLanguage', e.target.value)}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">Hindi</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Timezone</InputLabel>
              <Select
                value={settings.general.timezone}
                label="Timezone"
                onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
              >
                <MenuItem value="Asia/Kolkata">India (IST)</MenuItem>
                <MenuItem value="UTC">UTC</MenuItem>
                <MenuItem value="America/New_York">New York (EST)</MenuItem>
                <MenuItem value="Europe/London">London (GMT)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.general.maintenanceMode}
                  onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                  color="primary"
                />
              }
              label="Enable Maintenance Mode"
            />
            {settings.general.maintenanceMode && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Your website is currently in maintenance mode. Regular visitors will see a maintenance page.
              </Alert>
            )}
          </Grid>
        </Grid>
      </SettingSection>

      {/* Email Settings */}
      <SettingSection title="Email Settings" icon={<Email />}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="SMTP Host"
              value={settings.email.smtpHost}
              onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="SMTP Port"
              value={settings.email.smtpPort}
              onChange={(e) => handleSettingChange('email', 'smtpPort', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="SMTP Username"
              value={settings.email.smtpUser}
              onChange={(e) => handleSettingChange('email', 'smtpUser', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="SMTP Password"
              type="password"
              value={settings.email.smtpPassword}
              onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="From Email"
              value={settings.email.fromEmail}
              onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="From Name"
              value={settings.email.fromName}
              onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
            />
          </Grid>
        </Grid>
      </SettingSection>

      {/* Notification Settings */}
      <SettingSection title="Notification Settings" icon={<Notifications />}>
        <Grid container spacing={2}>
          {Object.entries(settings.notifications).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <FormControlLabel
                control={
                  <Switch
                    checked={value}
                    onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </Typography>
                }
              />
            </Grid>
          ))}
        </Grid>
      </SettingSection>

      {/* Security Settings */}
      <SettingSection title="Security Settings" icon={<Security />}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.security.requireLogin}
                  onChange={(e) => handleSettingChange('security', 'requireLogin', e.target.checked)}
                  color="primary"
                />
              }
              label="Require Login for Admin Panel"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.security.enableCaptcha}
                  onChange={(e) => handleSettingChange('security', 'enableCaptcha', e.target.checked)}
                  color="primary"
                />
              }
              label="Enable CAPTCHA on Contact Forms"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Max Login Attempts"
              type="number"
              value={settings.security.maxLoginAttempts}
              onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', e.target.value)}
              helperText="Number of failed attempts before lockout"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Session Timeout (minutes)"
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
            />
          </Grid>
        </Grid>
      </SettingSection>

      {/* Integration Settings */}
      <SettingSection title="Integration Settings" icon={<Add />}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="WhatsApp Number"
              value={settings.integrations.whatsappNumber}
              onChange={(e) => handleSettingChange('integrations', 'whatsappNumber', e.target.value)}
              helperText="Format: 91XXXXXXXXXX"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Google Analytics ID"
              value={settings.integrations.googleAnalytics}
              onChange={(e) => handleSettingChange('integrations', 'googleAnalytics', e.target.value)}
              helperText="UA-XXXXXXXXX-X or G-XXXXXXXX"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Facebook Pixel ID"
              value={settings.integrations.facebookPixel}
              onChange={(e) => handleSettingChange('integrations', 'facebookPixel', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Google Maps API Key"
              type="password"
              value={settings.integrations.googleMapsApi}
              onChange={(e) => handleSettingChange('integrations', 'googleMapsApi', e.target.value)}
            />
          </Grid>
        </Grid>
      </SettingSection>

      {/* Backup & Restore */}
      <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1e3a8a' }}>
          Backup & Restore
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          Create backups of your settings and restore them when needed
        </Alert>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Backup />}
              onClick={handleBackup}
              sx={{ bgcolor: '#1e3a8a', py: 1.5 }}
            >
              Create Backup
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="outlined"
              component="label"
              startIcon={<Restore />}
              sx={{ py: 1.5 }}
            >
              Restore Backup
              <input
                type="file"
                hidden
                accept=".json"
                onChange={handleRestore}
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={handleReset}
              sx={{ py: 1.5 }}
            >
              Reset to Default
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default Settings