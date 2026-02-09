// src/pages/admin/Analytics.jsx
import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

const Analytics = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, color: '#1e3a8a' }}>
        Analytics Dashboard
      </Typography>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Analytics dashboard coming soon...
        </Typography>
      </Paper>
    </Box>
  )
}

export default Analytics