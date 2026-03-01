import React, { useState } from 'react'
import {
  Box, Card, CardContent, TextField, Button, Typography,
  InputAdornment, IconButton, Alert, CircularProgress, Fade,
} from '@mui/material'
import { Visibility, VisibilityOff, Lock, Email, AdminPanelSettings, FlightTakeoff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { keyframes } from '@emotion/react'
import { adminAuthAPI } from '../services/api'

const float = keyframes`
  0%,100%{ transform:translateY(0) rotate(0deg); }
  50%{ transform:translateY(-20px) rotate(5deg); }
`
const pulse = keyframes`
  0%,100%{ opacity:0.3; transform:scale(1); }
  50%{ opacity:0.6; transform:scale(1.1); }
`

const AdminLogin = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await adminAuthAPI.login(form)
      if (res.success) {
        localStorage.setItem('admin_token_jwt', res.token)
        localStorage.setItem('admin_logged_in', 'true')
        localStorage.setItem('admin_data', JSON.stringify(res.admin))
        // Legacy support
        localStorage.setItem('admin_token', 'authenticated')
        navigate('/admin/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      position: 'relative', overflow: 'hidden', p: 2,
    }}>
      {/* Animated Background Blobs */}
      {[...Array(6)].map((_, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          width: [300,200,400,150,250,350][i],
          height: [300,200,400,150,250,350][i],
          borderRadius: '50%',
          background: ['rgba(30,58,138,0.15)','rgba(59,130,246,0.1)','rgba(139,92,246,0.1)','rgba(16,185,129,0.1)','rgba(245,158,11,0.08)','rgba(30,58,138,0.12)'][i],
          top: ['10%','60%','-5%','75%','30%','80%'][i],
          left: ['-5%','75%','60%','-3%','40%','15%'][i],
          animation: `${pulse} ${3+i*0.5}s ease-in-out infinite`,
          animationDelay: `${i*0.4}s`,
          filter: 'blur(40px)',
        }} />
      ))}

      {/* Floating Icons */}
      {[FlightTakeoff, AdminPanelSettings].map((Icon, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          top: [20,70][i]+'%', left: [10,80][i]+'%',
          animation: `${float} ${4+i}s ease-in-out infinite`,
          animationDelay: `${i*1.5}s`, opacity: 0.15,
        }}>
          <Icon sx={{ fontSize: [60,80][i], color: 'white' }} />
        </Box>
      ))}

      <Fade in timeout={800}>
        <Card sx={{
          width: '100%', maxWidth: 440, borderRadius: 4,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          overflow: 'visible',
        }}>
          <CardContent sx={{ p: 5 }}>
            {/* Logo */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                mx: 'auto', mb: 2, boxShadow: '0 10px 30px rgba(30,58,138,0.5)',
              }}>
                <AdminPanelSettings sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 0.5 }}>
                TripWale Admin
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Complete Website Control Panel
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2, bgcolor: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)', '& .MuiAlert-icon': { color: '#fca5a5' } }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth label="Email Address" type="email" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { color: 'white', borderRadius: 2, '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' }, '&.Mui-focused fieldset': { borderColor: '#3b82f6' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' }, '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' } }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 20 }} /></InputAdornment> }}
              />
              <TextField
                fullWidth label="Password" required
                type={showPass ? 'text' : 'password'}
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                sx={{ mb: 4, '& .MuiOutlinedInput-root': { color: 'white', borderRadius: 2, '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' }, '&.Mui-focused fieldset': { borderColor: '#3b82f6' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' }, '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 20 }} /></InputAdornment>,
                  endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPass(!showPass)} sx={{ color: 'rgba(255,255,255,0.4)' }}>{showPass ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>
                }}
              />
              <Button
                fullWidth type="submit" variant="contained" disabled={loading} size="large"
                sx={{
                  py: 1.8, borderRadius: 3, fontWeight: 700, fontSize: '1rem',
                  background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                  boxShadow: '0 10px 30px rgba(30,58,138,0.4)',
                  '&:hover': { background: 'linear-gradient(135deg, #1e40af, #2563eb)', transform: 'translateY(-2px)', boxShadow: '0 15px 35px rgba(30,58,138,0.5)' },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In to Dashboard'}
              </Button>
            </Box>

            <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', textAlign: 'center' }}>
                Default: admin@tripwale.in / Admin@123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  )
}

export default AdminLogin
