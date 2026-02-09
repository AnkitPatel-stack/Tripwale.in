// src/pages/AdminLogin.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Fade,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  Lock,
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  Dashboard,
} from '@mui/icons-material'

const AdminLogin = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Admin credentials (In production, this should be in environment variables or backend)
  const ADMIN_USERNAME = 'admin'
  const ADMIN_PASSWORD = 'TripWale@2024'

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
        // Store auth token in localStorage
        localStorage.setItem('admin_token', 'authenticated')
        localStorage.setItem('admin_logged_in', 'true')
        navigate('/admin/dashboard')
      } else {
        setError('Invalid username or password')
      }
      setLoading(false)
    }, 1000)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #0c2461 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 4, md: 6 },
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Logo */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 8px 32px rgba(30, 58, 138, 0.3)',
                }}
              >
                <AdminPanelSettings sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: '#1e3a8a',
                  mb: 1,
                  fontSize: { xs: '1.8rem', sm: '2rem' },
                }}
              >
                Admin Portal
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 1 }}>
                TripWale.in Content Management System
              </Typography>
              <Typography variant="caption" sx={{ color: '#999' }}>
                Restricted Access - Authorized Personnel Only
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AdminPanelSettings sx={{ color: '#1e3a8a' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={handleChange}
                required
                sx={{ mb: 4 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#1e3a8a' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                  borderRadius: 3,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(30, 58, 138, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Authenticating...' : 'Login to Dashboard'}
              </Button>
            </form>

            {/* Security Notice */}
            <Box
              sx={{
                mt: 4,
                pt: 3,
                borderTop: '1px dashed rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: '#666',
                  display: 'block',
                  fontSize: '0.75rem',
                }}
              >
                ⚠️ This portal is for authorized administrators only.
                <br />
                Unauthorized access is strictly prohibited.
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  )
}

export default AdminLogin