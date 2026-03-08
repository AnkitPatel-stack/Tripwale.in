import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Person,
  Email,
  Lock,
  Phone,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Registration attempt:', formData)
      navigate('/auth/login')
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 4,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 1,
              }}
            >
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join TripWale.in and start your journey
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <Link to="/terms" style={{ color: '#2A5C82', textDecoration: 'none' }}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" style={{ color: '#2A5C82', textDecoration: 'none' }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ mt: 2, mb: 3 }}
            />
            
            {errors.agreeTerms && (
              <Typography color="error" variant="caption">
                {errors.agreeTerms}
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2, mb: 3 }}
            >
              Create Account
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
              <Divider sx={{ flexGrow: 1 }} />
              <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
                OR SIGN UP WITH
              </Typography>
              <Divider sx={{ flexGrow: 1 }} />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{ py: 1.5 }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                sx={{ py: 1.5 }}
              >
                Facebook
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Button
                  component={Link}
                  to="/auth/login"
                  sx={{ textTransform: 'none' }}
                >
                  Sign In
                </Button>
              </Typography>
            </Box>
          </form>
        </Paper>

        <Paper
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            bgcolor: 'primary.50',
          }}
        >
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Account Benefits:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#4A5568' }}>
            <li>Save favorite tours and destinations</li>
            <li>Get personalized travel recommendations</li>
            <li>Track your bookings and itinerary</li>
            <li>Exclusive member-only deals</li>
            <li>Faster checkout process</li>
          </ul>
        </Paper>
      </motion.div>
    </Container>
  )
}

// Add Grid import at the top
import { Grid } from '@mui/material'

export default RegisterPage