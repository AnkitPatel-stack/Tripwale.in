import React, { useState, useEffect } from 'react'
import {
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Rating, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, Alert, CircularProgress,
  Avatar, Tooltip, Fade, Grid,
} from '@mui/material'
import { CheckCircle, Delete, Refresh, Star } from '@mui/icons-material'
import { reviewsAPI } from '../../services/api'
import { keyframes } from '@emotion/react'

const slideUp = keyframes`from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}`

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [success, setSuccess] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const loadReviews = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filter === 'pending') params.approved = false
      if (filter === 'approved') params.approved = true
      const res = await reviewsAPI.getAll(params)
      if (res.success) setReviews(res.reviews)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(() => { loadReviews() }, [filter])

  const handleApprove = async (id) => {
    try {
      await reviewsAPI.approve(id)
      setSuccess('Review approved successfully!')
      setTimeout(() => setSuccess(''), 2000)
      loadReviews()
    } catch (err) { console.error(err) }
  }

  const handleDelete = async () => {
    try {
      await reviewsAPI.delete(deleteConfirm._id)
      setDeleteConfirm(null)
      setSuccess('Review deleted')
      setTimeout(() => setSuccess(''), 2000)
      loadReviews()
    } catch (err) { console.error(err) }
  }

  return (
    <Box sx={{ animation: `${slideUp} 0.4s ease` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Reviews & Ratings</Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>Manage customer reviews</Typography>
        </Box>
        <Tooltip title="Refresh"><IconButton onClick={loadReviews} sx={{ bgcolor: '#f0f4ff' }}><Refresh sx={{ color: '#1e3a8a' }} /></IconButton></Tooltip>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}

      {/* Filter Chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {['all', 'pending', 'approved'].map((f) => (
          <Chip key={f} label={f.charAt(0).toUpperCase() + f.slice(1)} onClick={() => setFilter(f)}
            sx={{ cursor: 'pointer', fontWeight: 600, bgcolor: filter === f ? '#1e3a8a' : '#f3f4f6', color: filter === f ? 'white' : '#374141', '&:hover': { bgcolor: filter === f ? '#1e40af' : '#e5e7eb' } }} />
        ))}
      </Box>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress sx={{ color: '#1e3a8a' }} /></Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8fafc' }}>
                  {['Reviewer', 'Review', 'Rating', 'Tour', 'Status', 'Actions'].map(h => (
                    <TableCell key={h} sx={{ fontWeight: 700, color: '#374151' }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.length === 0 ? (
                  <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 6, color: '#888' }}>No reviews found</TableCell></TableRow>
                ) : reviews.map((review) => (
                  <Fade in key={review._id}>
                    <TableRow sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: '#1e3a8a', fontSize: '0.85rem' }}>{review.name?.[0]}</Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{review.name}</Typography>
                            <Typography variant="caption" sx={{ color: '#888' }}>{review.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 250 }}>
                        <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {review.comment}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Rating value={review.rating} readOnly size="small" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#666' }}>{review.tourTitle || 'General'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={review.approved ? 'Approved' : 'Pending'}
                          size="small"
                          sx={{ bgcolor: review.approved ? '#d1fae5' : '#fef3c7', color: review.approved ? '#065f46' : '#92400e', fontWeight: 600 }} />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {!review.approved && (
                            <Tooltip title="Approve"><IconButton size="small" onClick={() => handleApprove(review._id)} sx={{ color: '#10b981', '&:hover': { bgcolor: '#d1fae5' } }}><CheckCircle fontSize="small" /></IconButton></Tooltip>
                          )}
                          <Tooltip title="Delete"><IconButton size="small" onClick={() => setDeleteConfirm(review)} sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' } }}><Delete fontSize="small" /></IconButton></Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </Fade>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Review?</DialogTitle>
        <DialogContent><Typography>Delete review by <strong>{deleteConfirm?.name}</strong>? This cannot be undone.</Typography></DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button onClick={() => setDeleteConfirm(null)} variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" sx={{ borderRadius: 2, bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' } }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ReviewsManagement
