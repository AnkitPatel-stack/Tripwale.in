import React, { useState, useEffect } from 'react'
import {
  Grid, Paper, Typography, Box, Card, CardContent, Button, 
  List, ListItem, ListItemIcon, ListItemText, Chip, CircularProgress,
  Avatar, IconButton, Tooltip, LinearProgress, Fade, Grow,
} from '@mui/material'
import {
  Edit, Add, Image, TrendingUp, CheckCircle, PendingActions,
  People, Category, Refresh, ArrowForward, FlightTakeoff,
  TempleHindu, DirectionsCar, Hiking, CalendarToday, Star,
  Phone, Palette, AdminPanelSettings, OpenInNew,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { analyticsAPI } from '../../services/api'
import { keyframes } from '@emotion/react'

const slideUp = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`

const StatCard = ({ label, value, icon, color, subtitle, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      borderRadius: 3, cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
      '&:hover': onClick ? { transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } : {},
      background: `linear-gradient(135deg, ${color}15, ${color}08)`,
      border: `1px solid ${color}30`,
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontWeight: 500 }}>{label}</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color, lineHeight: 1 }}>{value}</Typography>
          {subtitle && <Typography variant="caption" sx={{ color: '#888', mt: 0.5, display: 'block' }}>{subtitle}</Typography>}
        </Box>
        <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${color}50` }}>
          {React.cloneElement(icon, { sx: { color: 'white', fontSize: 26 } })}
        </Box>
      </Box>
    </CardContent>
  </Card>
)

const QuickAction = ({ label, icon, color, onClick, description }) => (
  <Card
    onClick={onClick}
    sx={{
      borderRadius: 3, cursor: 'pointer', p: 2.5,
      transition: 'all 0.3s ease', height: '100%',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 35px rgba(0,0,0,0.12)', bgcolor: `${color}08` },
      border: `1px solid ${color}20`,
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
      <Box sx={{ width: 46, height: 46, borderRadius: 2, bgcolor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 15px ${color}40` }}>
        {React.cloneElement(icon, { sx: { color: 'white', fontSize: 22 } })}
      </Box>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.3 }}>{label}</Typography>
        <Typography variant="caption" sx={{ color: '#888' }}>{description}</Typography>
      </Box>
    </Box>
  </Card>
)

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [adminName, setAdminName] = useState('Admin')

  const loadDashboard = async () => {
    setLoading(true)
    try {
      const res = await analyticsAPI.getDashboard()
      if (res.success) setStats(res)
    } catch (err) {
      // Use fallback data
      setStats({
        stats: { totalTours: 0, activeTours: 0, pendingReviews: 0, newContacts: 0 },
        topTours: [],
        recentContacts: [],
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
    const adminData = localStorage.getItem('admin_data')
    if (adminData) {
      try { setAdminName(JSON.parse(adminData).name || 'Admin') } catch {}
    }
  }, [])

  const quickActions = [
    { label: 'Add New Tour', icon: <Add />, color: '#1e3a8a', description: 'Create a new tour package', onClick: () => navigate('/admin/tours/add') },
    { label: 'Edit Home Page', icon: <Edit />, color: '#3b82f6', description: 'Update hero, content & sections', onClick: () => navigate('/admin/content/home') },
    { label: 'Manage Tours', icon: <FlightTakeoff />, color: '#10b981', description: 'View, edit or delete tours', onClick: () => navigate('/admin/tours') },
    { label: 'Theme & Design', icon: <Palette />, color: '#f59e0b', description: 'Change colors, fonts & styles', onClick: () => navigate('/admin/theme') },
    { label: 'Media Library', icon: <Image />, color: '#8b5cf6', description: 'Upload & manage images', onClick: () => navigate('/admin/media') },
    { label: 'Site Settings', icon: <AdminPanelSettings />, color: '#ef4444', description: 'Configure site & integrations', onClick: () => navigate('/admin/settings') },
  ]

  const pageLinks = [
    { label: 'Home Page', path: '/admin/content/home', icon: <Edit />, color: '#1e3a8a' },
    { label: 'Domestic Tours', path: '/admin/content/domestic', icon: <DirectionsCar />, color: '#10b981' },
    { label: 'International Tours', path: '/admin/content/international', icon: <FlightTakeoff />, color: '#3b82f6' },
    { label: 'Religious Yatra', path: '/admin/content/religious', icon: <TempleHindu />, color: '#f59e0b' },
    { label: 'One Day Trips', path: '/admin/content/one-day-trips', icon: <CalendarToday />, color: '#8b5cf6' },
    { label: 'Trekking', path: '/admin/content/trekking', icon: <Hiking />, color: '#ef4444' },
  ]

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column', gap: 2 }}>
        <CircularProgress size={48} sx={{ color: '#1e3a8a' }} />
        <Typography variant="body1" sx={{ color: '#666' }}>Loading Dashboard...</Typography>
      </Box>
    )
  }

  const s = stats?.stats || {}

  return (
    <Box sx={{ animation: `${slideUp} 0.5s ease` }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 0.5 }}>
            Welcome back, {adminName}! 👋
          </Typography>
          <Typography variant="body1" sx={{ color: '#888' }}>
            Here's what's happening with your website today
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Refresh Dashboard">
            <IconButton onClick={loadDashboard} sx={{ bgcolor: '#f0f4ff', '&:hover': { bgcolor: '#dbeafe' } }}>
              <Refresh sx={{ color: '#1e3a8a' }} />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained" startIcon={<OpenInNew />}
            onClick={() => window.open('/', '_blank')}
            sx={{ borderRadius: 2, bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' } }}
          >
            View Website
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Grow in timeout={200}><Box><StatCard label="Total Tours" value={s.totalTours || 0} icon={<Category />} color="#1e3a8a" subtitle={`${s.activeTours || 0} active`} onClick={() => navigate('/admin/tours')} /></Box></Grow>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Grow in timeout={400}><Box><StatCard label="Active Tours" value={s.activeTours || 0} icon={<CheckCircle />} color="#10b981" subtitle="Live on website" onClick={() => navigate('/admin/tours')} /></Box></Grow>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Grow in timeout={600}><Box><StatCard label="Pending Reviews" value={s.pendingReviews || 0} icon={<Star />} color="#f59e0b" subtitle="Awaiting approval" onClick={() => navigate('/admin/reviews')} /></Box></Grow>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Grow in timeout={800}><Box><StatCard label="New Enquiries" value={s.newContacts || 0} icon={<Phone />} color="#ef4444" subtitle="From contact form" onClick={() => navigate('/admin/contacts')} /></Box></Grow>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1a1a2e' }}>
              ⚡ Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Fade in timeout={300 + i * 100}>
                    <Box><QuickAction {...action} /></Box>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Page Editor Links */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>
              📄 Edit Pages
            </Typography>
            <List dense>
              {pageLinks.map((link, i) => (
                <ListItem
                  key={i} button onClick={() => navigate(link.path)}
                  sx={{ borderRadius: 2, mb: 0.5, '&:hover': { bgcolor: `${link.color}10` }, transition: 'all 0.2s' }}
                >
                  <ListItemIcon sx={{ minWidth: 38 }}>
                    <Box sx={{ width: 30, height: 30, borderRadius: 1.5, bgcolor: link.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {React.cloneElement(link.icon, { sx: { color: 'white', fontSize: 16 } })}
                    </Box>
                  </ListItemIcon>
                  <ListItemText primary={link.label} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                  <ArrowForward sx={{ color: '#ccc', fontSize: 18 }} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Recent Contacts */}
          {stats?.recentContacts?.length > 0 && (
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>
                📞 New Enquiries
              </Typography>
              {stats.recentContacts.map((c, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, p: 1.5, borderRadius: 2, bgcolor: '#f8fafc' }}>
                  <Avatar sx={{ width: 36, height: 36, bgcolor: '#1e3a8a', fontSize: '0.8rem' }}>
                    {c.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, truncate: true }}>{c.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#888' }}>{c.subject || 'Tour Enquiry'}</Typography>
                  </Box>
                  <Chip label="New" size="small" sx={{ bgcolor: '#dcfce7', color: '#16a34a', fontSize: '0.7rem', height: 20 }} />
                </Box>
              ))}
              <Button size="small" endIcon={<ArrowForward />} onClick={() => navigate('/admin/contacts')} sx={{ mt: 1 }}>
                View All
              </Button>
            </Paper>
          )}
        </Grid>

        {/* Top Tours */}
        {stats?.topTours?.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a2e' }}>🏆 Top Viewed Tours</Typography>
                <Button size="small" endIcon={<ArrowForward />} onClick={() => navigate('/admin/tours')}>View All</Button>
              </Box>
              <Grid container spacing={2}>
                {stats.topTours.map((tour, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={i}>
                    <Card sx={{ borderRadius: 2, overflow: 'hidden', cursor: 'pointer', '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 }, transition: 'all 0.2s' }} onClick={() => navigate(`/admin/tours/edit/${tour._id}`)}>
                      <Box sx={{ height: 100, overflow: 'hidden' }}>
                        <img src={tour.image} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display='none'} />
                      </Box>
                      <Box sx={{ p: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem', mb: 0.5 }} noWrap>{tour.title}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TrendingUp sx={{ fontSize: 14, color: '#10b981' }} />
                          <Typography variant="caption" sx={{ color: '#888' }}>{tour.views || 0} views</Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default AdminDashboard
