import React, { useState, useEffect } from 'react'
import {
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Rating, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, Alert, CircularProgress,
  Avatar, Tooltip, Fade, Badge,
} from '@mui/material'
import { CheckCircle, Cancel, Delete, Refresh, Star, HourglassTop } from '@mui/icons-material'
import { reviewsAPI } from '../../services/api'
import { keyframes } from '@emotion/react'

const slideUp = keyframes`from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}`

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [counts, setCounts] = useState({ all: 0, pending: 0, approved: 0 })

  const loadReviews = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filter === 'pending') params.approved = false
      if (filter === 'approved') params.approved = true
      const res = await reviewsAPI.getAll(params)
      if (res.success) setReviews(res.reviews)

      // Load counts for badges
      const [allRes, pendingRes, approvedRes] = await Promise.all([
        reviewsAPI.getAll({}),
        reviewsAPI.getAll({ approved: false }),
        reviewsAPI.getAll({ approved: true }),
      ])
      setCounts({
        all: allRes.total || allRes.reviews?.length || 0,
        pending: pendingRes.total || pendingRes.reviews?.length || 0,
        approved: approvedRes.total || approvedRes.reviews?.length || 0,
      })
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(() => { loadReviews() }, [filter])

  const showMsg = (msg, isError = false) => {
    if (isError) setError(msg)
    else setSuccess(msg)
    setTimeout(() => { setSuccess(''); setError('') }, 3000)
  }

  const handleApprove = async (id) => {
    try {
      await reviewsAPI.approve(id)
      showMsg('✅ Review approved! It is now visible on the tour page.')
      loadReviews()
    } catch (err) {
      showMsg('Failed to approve review', true)
    }
  }

  const handleReject = async (id) => {
    try {
      await reviewsAPI.reject(id)
      showMsg('Review rejected.')
      loadReviews()
    } catch (err) {
      showMsg('Failed to reject review', true)
    }
  }

  const handleDelete = async () => {
    try {
      await reviewsAPI.delete(deleteConfirm._id)
      setDeleteConfirm(null)
      showMsg('Review deleted.')
      loadReviews()
    } catch (err) {
      showMsg('Failed to delete review', true)
    }
  }

  const filterConfig = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'pending', label: 'Pending', count: counts.pending, color: '#f59e0b' },
    { key: 'approved', label: 'Approved', count: counts.approved, color: '#10b981' },
  ]

  return (
    <Box sx={{ animation: `${slideUp} 0.4s ease` }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Reviews & Ratings</Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>
            Approve reviews to make them visible on tour pages
          </Typography>
        </Box>
        <Tooltip title="Refresh">
          <IconButton onClick={loadReviews} sx={{ bgcolor: '#f0f4ff' }}>
            <Refresh sx={{ color: '#1e3a8a' }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Info banner */}
      <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
        <strong>How it works:</strong> When you approve a review, it automatically appears on the tour's detail page under the Reviews tab.
      </Alert>

      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

      {/* Filter Chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {filterConfig.map(({ key, label, count, color }) => (
          <Chip
            key={key}
            label={`${label} (${count})`}
            onClick={() => setFilter(key)}
            icon={key === 'pending' ? <HourglassTop sx={{ fontSize: 16 }} /> : key === 'approved' ? <CheckCircle sx={{ fontSize: 16 }} /> : undefined}
            sx={{
              cursor: 'pointer', fontWeight: 600, px: 0.5,
              bgcolor: filter === key ? '#1e3a8a' : '#f3f4f6',
              color: filter === key ? 'white' : '#374141',
              '&:hover': { bgcolor: filter === key ? '#1e40af' : '#e5e7eb' },
              '& .MuiChip-icon': { color: filter === key ? 'white !important' : `${color} !important` }
            }}
          />
        ))}
      </Box>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
            <CircularProgress sx={{ color: '#1e3a8a' }} />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8fafc' }}>
                  {['Reviewer', 'Review', 'Rating', 'Tour', 'Date', 'Status', 'Actions'].map(h => (
                    <TableCell key={h} sx={{ fontWeight: 700, color: '#374151', whiteSpace: 'nowrap' }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center', py: 6, color: '#888' }}>
                      No {filter === 'all' ? '' : filter} reviews found
                    </TableCell>
                  </TableRow>
                ) : reviews.map((review) => (
                  <Fade in key={review._id}>
                    <TableRow sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                      {/* Reviewer */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: '#1e3a8a', fontSize: '0.85rem' }}>
                            {review.name?.[0]?.toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{review.name}</Typography>
                            <Typography variant="caption" sx={{ color: '#888' }}>{review.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Review Text */}
                      <TableCell sx={{ maxWidth: 250 }}>
                        <Typography variant="body2" sx={{
                          overflow: 'hidden', textOverflow: 'ellipsis',
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
                        }}>
                          {review.comment}
                        </Typography>
                      </TableCell>

                      {/* Rating */}
                      <TableCell>
                        <Rating value={review.rating} readOnly size="small" sx={{ color: '#f59e0b' }} />
                      </TableCell>

                      {/* Tour */}
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#1e3a8a', fontWeight: 500 }}>
                          {review.tourTitle || '—'}
                        </Typography>
                      </TableCell>

                      {/* Date */}
                      <TableCell>
                        <Typography variant="caption" sx={{ color: '#888', whiteSpace: 'nowrap' }}>
                          {new Date(review.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </Typography>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Chip
                          label={review.approved ? 'Approved' : 'Pending'}
                          size="small"
                          sx={{
                            bgcolor: review.approved ? '#d1fae5' : '#fef3c7',
                            color: review.approved ? '#065f46' : '#92400e',
                            fontWeight: 600
                          }}
                        />
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {!review.approved && (
                            <Tooltip title="Approve — makes visible on tour page">
                              <IconButton size="small" onClick={() => handleApprove(review._id)}
                                sx={{ color: '#10b981', '&:hover': { bgcolor: '#d1fae5' } }}>
                                <CheckCircle fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {review.approved && (
                            <Tooltip title="Revoke approval">
                              <IconButton size="small" onClick={() => handleReject(review._id)}
                                sx={{ color: '#f59e0b', '&:hover': { bgcolor: '#fef3c7' } }}>
                                <Cancel fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Delete permanently">
                            <IconButton size="small" onClick={() => setDeleteConfirm(review)}
                              sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' } }}>
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
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

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Review?</DialogTitle>
        <DialogContent>
          <Typography>
            Delete review by <strong>{deleteConfirm?.name}</strong>?<br />
            This will also remove it from the tour page. This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button onClick={() => setDeleteConfirm(null)} variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained"
            sx={{ borderRadius: 2, bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' } }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ReviewsManagement
