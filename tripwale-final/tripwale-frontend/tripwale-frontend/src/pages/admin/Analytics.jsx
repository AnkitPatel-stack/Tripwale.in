import React, { useState, useEffect } from 'react'
import {
  Box, Paper, Typography, Grid, Card, CardContent, CircularProgress,
  Chip, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider,
  Button, Fade, LinearProgress,
} from '@mui/material'
import { TrendingUp, Category, Star, Phone, FlightTakeoff, Refresh } from '@mui/icons-material'
import { analyticsAPI } from '../../services/api'
import { keyframes } from '@emotion/react'

const slideUp = keyframes`from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}`

const StatCard = ({ label, value, icon, color, sub }) => (
  <Card sx={{ borderRadius: 3, border: `1px solid ${color}20`, background: `linear-gradient(135deg, ${color}10, ${color}05)`, height: '100%' }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" sx={{ color: '#888', mb: 0.5 }}>{label}</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color, lineHeight: 1 }}>{value}</Typography>
          {sub && <Typography variant="caption" sx={{ color: '#888', mt: 0.5, display: 'block' }}>{sub}</Typography>}
        </Box>
        <Box sx={{ width: 50, height: 50, borderRadius: 2, bgcolor: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {React.cloneElement(icon, { sx: { color: 'white', fontSize: 24 } })}
        </Box>
      </Box>
    </CardContent>
  </Card>
)

const Analytics = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await analyticsAPI.getDashboard()
      if (res.success) setData(res)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress sx={{ color: '#1e3a8a' }} /></Box>
  )

  const s = data?.stats || {}
  const byType = data?.toursByType || []

  return (
    <Box sx={{ animation: `${slideUp} 0.4s ease` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Analytics & Stats</Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>Real-time website statistics</Typography>
        </Box>
        <Button variant="outlined" startIcon={<Refresh />} onClick={load} sx={{ borderRadius: 2, borderColor: '#1e3a8a', color: '#1e3a8a' }}>Refresh</Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} md={3}><Fade in timeout={200}><Box><StatCard label="Total Tours" value={s.totalTours || 0} icon={<FlightTakeoff />} color="#1e3a8a" sub={`${s.activeTours || 0} active`} /></Box></Fade></Grid>
        <Grid item xs={6} md={3}><Fade in timeout={400}><Box><StatCard label="Active Tours" value={s.activeTours || 0} icon={<Category />} color="#10b981" sub="Live on website" /></Box></Fade></Grid>
        <Grid item xs={6} md={3}><Fade in timeout={600}><Box><StatCard label="Pending Reviews" value={s.pendingReviews || 0} icon={<Star />} color="#f59e0b" sub="Need approval" /></Box></Fade></Grid>
        <Grid item xs={6} md={3}><Fade in timeout={800}><Box><StatCard label="New Enquiries" value={s.newContacts || 0} icon={<Phone />} color="#ef4444" sub="From contact form" /></Box></Fade></Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Tours by Type */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Tours by Category</Typography>
            {byType.length === 0 ? (
              <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', py: 4 }}>No data available</Typography>
            ) : byType.map((t, i) => {
              const total = byType.reduce((sum, x) => sum + x.count, 0)
              const pct = total ? Math.round((t.count / total) * 100) : 0
              const colors = ['#1e3a8a', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
              return (
                <Box key={i} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{t._id || 'Unknown'}</Typography>
                    <Typography variant="body2" sx={{ color: '#888' }}>{t.count} tours ({pct}%)</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={pct} sx={{ height: 8, borderRadius: 4, bgcolor: `${colors[i%5]}20`, '& .MuiLinearProgress-bar': { bgcolor: colors[i%5], borderRadius: 4 } }} />
                </Box>
              )
            })}
          </Paper>
        </Grid>

        {/* Top Tours */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>🏆 Top Viewed Tours</Typography>
            {!data?.topTours?.length ? (
              <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', py: 4 }}>No tour views yet</Typography>
            ) : (
              <List dense>
                {data.topTours.map((tour, i) => (
                  <React.Fragment key={tour._id}>
                    <ListItem sx={{ borderRadius: 2, '&:hover': { bgcolor: '#f8fafc' } }}>
                      <ListItemAvatar>
                        <Avatar src={tour.image} sx={{ width: 44, height: 44, borderRadius: 2 }} variant="rounded">
                          <FlightTakeoff />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{tour.title}</Typography>}
                        secondary={<Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography variant="caption">👁 {tour.views || 0} views</Typography>
                        </Box>}
                      />
                      <Chip label={`#${i+1}`} size="small" sx={{ bgcolor: i === 0 ? '#fef3c7' : '#f8fafc', color: i === 0 ? '#92400e' : '#374141', fontWeight: 700 }} />
                    </ListItem>
                    {i < data.topTours.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Recent Contacts */}
        {data?.recentContacts?.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>📞 Recent Enquiries</Typography>
              <Grid container spacing={2}>
                {data.recentContacts.map((c, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid #e5e7eb' }}>
                      <Box sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: '#1e3a8a', fontSize: '0.8rem' }}>{c.name?.[0]}</Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{c.name}</Typography>
                          <Typography variant="caption" sx={{ color: '#888' }}>{c.email}</Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#555', fontSize: '0.85rem' }} noWrap>{c.subject || 'Tour Enquiry'}</Typography>
                    </Box>
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

export default Analytics
