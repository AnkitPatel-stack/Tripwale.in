// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material'
import {
  Edit,
  Delete,
  Add,
  Save,
  Dashboard as DashboardIcon,
  People,
  Category,
  Image,
  TrendingUp,
  Warning,
  CheckCircle,
  PendingActions,
  Speed,
  Refresh,
} from '@mui/icons-material'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTours: 45,
    activeTours: 32,
    pendingReviews: 12,
    totalUsers: 543,
    websiteViews: '12.5K',
    conversionRate: '4.2%',
  })

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'Updated Kerala Backwaters tour', time: '10 mins ago', type: 'update' },
    { id: 2, action: 'Added new trekking package', time: '2 hours ago', type: 'add' },
    { id: 3, action: 'Modified website theme colors', time: '1 day ago', type: 'update' },
    { id: 4, action: 'Approved 5 customer reviews', time: '2 days ago', type: 'approve' },
    { id: 5, action: 'Uploaded 8 new images', time: '3 days ago', type: 'upload' },
  ])

  const [quickActions, setQuickActions] = useState([
    { label: 'Add New Tour', icon: <Add />, color: '#1e3a8a' },
    { label: 'Update Prices', icon: <Edit />, color: '#3b82f6' },
    { label: 'Manage Images', icon: <Image />, color: '#10b981' },
    { label: 'Edit Home Page', icon: <DashboardIcon />, color: '#f59e0b' },
  ])

  const [openDialog, setOpenDialog] = useState(false)
  const [editContent, setEditContent] = useState('')

  const handleQuickAction = (action) => {
    alert(`Opening ${action} editor...`)
  }

  const handleSaveContent = () => {
    // Save content logic here
    setOpenDialog(false)
    alert('Content saved successfully!')
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 1 }}>
          Welcome Back, Admin
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Manage your website content, tours, and settings from here
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Tours', value: stats.totalTours, icon: <Category />, color: '#1e3a8a' },
          { label: 'Active Tours', value: stats.activeTours, icon: <CheckCircle />, color: '#10b981' },
          { label: 'Pending Reviews', value: stats.pendingReviews, icon: <PendingActions />, color: '#f59e0b' },
          { label: 'Total Users', value: stats.totalUsers, icon: <People />, color: '#3b82f6' },
          { label: 'Website Views', value: stats.websiteViews, icon: <TrendingUp />, color: '#8b5cf6' },
          { label: 'Conversion Rate', value: stats.conversionRate, icon: <Speed />, color: '#ef4444' },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card sx={{ 
              height: '100%', 
              border: '1px solid rgba(0,0,0,0.08)',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              }
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  display: 'inline-flex',
                  p: 1.5,
                  mb: 2,
                  borderRadius: '50%',
                  bgcolor: `${stat.color}15`,
                  color: stat.color,
                }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                Quick Actions
              </Typography>
              <Button
                startIcon={<Refresh />}
                size="small"
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: '1px solid rgba(0,0,0,0.08)',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                        borderColor: action.color,
                      },
                    }}
                    onClick={() => handleQuickAction(action.label)}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2.5 }}>
                      <Box sx={{ 
                        mr: 2,
                        p: 1,
                        borderRadius: '50%',
                        bgcolor: `${action.color}15`,
                        color: action.color,
                      }}>
                        {action.icon}
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {action.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Quick Edit Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a', mb: 2 }}>
                Quick Content Edit
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Type content to edit quickly..."
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={() => setOpenDialog(true)}
                disabled={!editContent.trim()}
                sx={{ bgcolor: '#1e3a8a' }}
              >
                Save Content
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a', mb: 3 }}>
              Recent Activities
            </Typography>
            
            <List>
              {recentActivities.map((activity) => (
                <ListItem
                  key={activity.id}
                  sx={{
                    px: 0,
                    py: 1.5,
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    '&:last-child': { borderBottom: 0 },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box sx={{ 
                      p: 0.5,
                      borderRadius: '50%',
                      bgcolor: activity.type === 'update' ? '#3b82f615' : 
                               activity.type === 'add' ? '#10b98115' : 
                               activity.type === 'approve' ? '#f59e0b15' : '#8b5cf615',
                      color: activity.type === 'update' ? '#3b82f6' : 
                             activity.type === 'add' ? '#10b981' : 
                             activity.type === 'approve' ? '#f59e0b' : '#8b5cf6',
                    }}>
                      {activity.type === 'update' ? <Edit fontSize="small" /> :
                       activity.type === 'add' ? <Add fontSize="small" /> :
                       activity.type === 'approve' ? <CheckCircle fontSize="small" /> : <Image fontSize="small" />}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={activity.time}
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ fontSize: '0.75rem', color: '#999' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Save Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Save Content</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            This will update the content on your live website.
          </Alert>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Preview:
          </Typography>
          <Paper sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, mb: 2 }}>
            {editContent}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveContent} variant="contained" sx={{ bgcolor: '#1e3a8a' }}>
            Save to Website
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdminDashboard