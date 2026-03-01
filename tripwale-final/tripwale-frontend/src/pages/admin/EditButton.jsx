// src/components/admin/EditButton.jsx
import React from 'react'
import { Fab, Tooltip } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const EditButton = ({ page }) => {
  const navigate = useNavigate()
  const isAdmin = localStorage.getItem('admin_logged_in') === 'true'

  if (!isAdmin) return null

  return (
    <Tooltip title={`Edit ${page} page`}>
      <Fab
        color="primary"
        size="small"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999,
          bgcolor: '#1e3a8a',
          '&:hover': {
            bgcolor: '#0f2d6b',
          }
        }}
        onClick={() => navigate(`/admin/content/${page}`)}
      >
        <Edit />
      </Fab>
    </Tooltip>
  )
}

export default EditButton