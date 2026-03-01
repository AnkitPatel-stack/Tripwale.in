import React, { useState, useEffect } from 'react'
import {
  Box, Paper, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Chip, TextField,
  InputAdornment, MenuItem, Select, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions, Alert,
  Pagination, Tooltip, Avatar, Switch, FormControlLabel, CircularProgress,
  Fade, Grid, Card, CardContent,
} from '@mui/material'
import {
  Add, Edit, Delete, Search, Refresh, Visibility,
  CheckCircle, Cancel, FlightTakeoff, Star, Download,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { toursAPI } from '../../services/api'
import { keyframes } from '@emotion/react'

const slideUp = keyframes`from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}`

const pageTypeColors = {
  domestic: { bg: '#dbeafe', color: '#1d4ed8' },
  international: { bg: '#d1fae5', color: '#065f46' },
  religious: { bg: '#fef3c7', color: '#92400e' },
  'one-day': { bg: '#ede9fe', color: '#5b21b6' },
  trekking: { bg: '#fee2e2', color: '#991b1b' },
}

const ToursManagement = () => {
  const navigate = useNavigate()
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [pageType, setPageType] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [deleteDialog, setDeleteDialog] = useState({ open: false, tour: null })
  const [success, setSuccess] = useState('')

  const fetchTours = async () => {
    setLoading(true)
    try {
      const params = { page, limit: 12 }
      if (pageType !== 'all') params.pageType = pageType
      if (searchTerm) params.search = searchTerm
      const res = await toursAPI.getAll(params)
      if (res.success) {
        setTours(res.tours)
        setTotal(res.total || res.tours.length)
        setTotalPages(res.pages || Math.ceil((res.total || res.tours.length) / 12))
      }
    } catch (err) {
      console.error('Failed to load tours:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTours() }, [page, pageType])

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') fetchTours()
  }

  const handleDelete = async () => {
    try {
      await toursAPI.delete(deleteDialog.tour._id)
      setSuccess('Tour deleted successfully!')
      setDeleteDialog({ open: false, tour: null })
      fetchTours()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const handleToggleActive = async (tour) => {
    try {
      await toursAPI.update(tour._id, { active: !tour.active })
      setTours(prev => prev.map(t => t._id === tour._id ? { ...t, active: !t.active } : t))
    } catch (err) {
      console.error('Toggle failed:', err)
    }
  }

  return (
    <Box sx={{ animation: `${slideUp} 0.4s ease` }}>
      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Tour Packages</Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>{total} total packages</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Refresh"><IconButton onClick={fetchTours} sx={{ bgcolor: '#f0f4ff' }}><Refresh sx={{ color: '#1e3a8a' }} /></IconButton></Tooltip>
          <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/admin/tours/add')}
            sx={{ borderRadius: 2, bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' }, fontWeight: 600 }}>
            Add New Tour
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth size="small" placeholder="Search tours..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleSearch}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#aaa' }} /></InputAdornment>, sx: { borderRadius: 2 } }} />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select value={pageType} label="Category" onChange={(e) => { setPageType(e.target.value); setPage(1) }} sx={{ borderRadius: 2 }}>
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="domestic">Domestic</MenuItem>
                <MenuItem value="international">International</MenuItem>
                <MenuItem value="religious">Religious</MenuItem>
                <MenuItem value="one-day">One Day</MenuItem>
                <MenuItem value="trekking">Trekking</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <Button fullWidth variant="outlined" onClick={handleSearch} sx={{ borderRadius: 2, borderColor: '#1e3a8a', color: '#1e3a8a' }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress sx={{ color: '#1e3a8a' }} /></Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8fafc' }}>
                    {['Tour Package', 'Category', 'Price', 'Rating', 'Active', 'Actions'].map(h => (
                      <TableCell key={h} sx={{ fontWeight: 700, color: '#374151', fontSize: '0.85rem' }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tours.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: 'center', py: 6, color: '#888' }}>
                        No tours found. <Button onClick={() => navigate('/admin/tours/add')}>Add your first tour</Button>
                      </TableCell>
                    </TableRow>
                  ) : tours.map((tour) => {
                    const typeStyle = pageTypeColors[tour.pageType] || { bg: '#f3f4f6', color: '#374151' }
                    return (
                      <Fade in key={tour._id}>
                        <TableRow sx={{ '&:hover': { bgcolor: '#f8fafc' }, transition: 'background 0.15s' }}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar src={tour.image} sx={{ width: 48, height: 48, borderRadius: 2 }} variant="rounded">
                                <FlightTakeoff />
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a2e' }}>{tour.title}</Typography>
                                <Typography variant="caption" sx={{ color: '#888' }}>{tour.location}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={tour.pageType} size="small" sx={{ bgcolor: typeStyle.bg, color: typeStyle.color, fontWeight: 600, fontSize: '0.75rem' }} />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e3a8a' }}>{tour.price}</Typography>
                            {tour.originalPrice && <Typography variant="caption" sx={{ color: '#aaa', textDecoration: 'line-through', display: 'block' }}>{tour.originalPrice}</Typography>}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Star sx={{ fontSize: 16, color: '#f59e0b' }} />
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{tour.rating}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Switch checked={tour.active} onChange={() => handleToggleActive(tour)} size="small"
                              sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#10b981' } }} />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <Tooltip title="View on site">
                                <IconButton size="small" onClick={() => window.open(`/tour/${tour._id}`, '_blank')} sx={{ color: '#888' }}><Visibility fontSize="small" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Edit tour">
                                <IconButton size="small" onClick={() => navigate(`/admin/tours/edit/${tour._id}`)} sx={{ color: '#3b82f6', '&:hover': { bgcolor: '#dbeafe' } }}><Edit fontSize="small" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Delete tour">
                                <IconButton size="small" onClick={() => setDeleteDialog({ open: true, tour })} sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' } }}><Delete fontSize="small" /></IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </Fade>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3, borderTop: '1px solid #f0f0f0' }}>
                <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)}
                  sx={{ '& .MuiPaginationItem-root.Mui-selected': { bgcolor: '#1e3a8a', color: 'white' } }} />
              </Box>
            )}
          </>
        )}
      </Paper>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, tour: null })} PaperProps={{ sx: { borderRadius: 3, maxWidth: 420 } }}>
        <DialogTitle sx={{ fontWeight: 700, color: '#1a1a2e' }}>Delete Tour?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <strong>{deleteDialog.tour?.title}</strong>? This cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1, gap: 1 }}>
          <Button onClick={() => setDeleteDialog({ open: false, tour: null })} variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" sx={{ borderRadius: 2, bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' } }}>Delete Tour</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ToursManagement
