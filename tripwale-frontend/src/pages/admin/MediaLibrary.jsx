// src/pages/admin/MediaLibrary.jsx
import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Button,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  LinearProgress,
} from '@mui/material'
import {
  Delete,
  Edit,
  Search,
  CloudUpload,
  Image,
  VideoLibrary,
  InsertPhoto,
  Link,
  Folder,
  FilterList,
  Sort,
  Refresh,
} from '@mui/icons-material'

const MediaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedImages, setSelectedImages] = useState([])
  const [openUpload, setOpenUpload] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Sample media data
  const [mediaItems, setMediaItems] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4', type: 'image', title: 'Hero Image 1', size: '2.4 MB', uploaded: '2024-01-15', tags: ['hero', 'home'] },
    { id: 2, url: 'https://images.unsplash.com/photo-1593693397695-36243b84f70b', type: 'image', title: 'Kashmir Tour', size: '1.8 MB', uploaded: '2024-01-14', tags: ['kashmir', 'tour'] },
    { id: 3, url: 'https://images.unsplash.com/photo-1528164344705-47542687000d', type: 'image', title: 'Kerala Backwaters', size: '2.1 MB', uploaded: '2024-01-13', tags: ['kerala', 'backwaters'] },
    { id: 4, url: 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3', type: 'image', title: 'Rajasthan Fort', size: '3.2 MB', uploaded: '2024-01-12', tags: ['rajasthan', 'fort'] },
    { id: 5, url: 'https://images.unsplash.com/photo-1551632811-561732d1e306', type: 'image', title: 'Himalayan Trek', size: '2.9 MB', uploaded: '2024-01-11', tags: ['himalayas', 'trek'] },
    { id: 6, url: 'https://images.unsplash.com/photo-1621265113764-2af0479b2d0b', type: 'image', title: 'Char Dham', size: '2.5 MB', uploaded: '2024-01-10', tags: ['temple', 'religious'] },
    { id: 7, url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2', type: 'image', title: 'Goa Beach', size: '1.9 MB', uploaded: '2024-01-09', tags: ['beach', 'goa'] },
    { id: 8, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', type: 'image', title: 'Ladakh Lake', size: '3.1 MB', uploaded: '2024-01-08', tags: ['ladakh', 'lake'] },
  ])

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          
          // Add uploaded files
          const newItems = files.map((file, index) => ({
            id: mediaItems.length + index + 1,
            url: URL.createObjectURL(file),
            type: file.type.startsWith('video') ? 'video' : 'image',
            title: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            uploaded: new Date().toISOString().split('T')[0],
            tags: ['new'],
          }))
          
          setMediaItems(prev => [...newItems, ...prev])
          setOpenUpload(false)
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  const handleDelete = (id) => {
    setMediaItems(prev => prev.filter(item => item.id !== id))
  }

  const handleSelect = (id) => {
    setSelectedImages(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  const filteredMedia = mediaItems.filter(item => {
    if (filter !== 'all' && item.type !== filter) return false
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 1 }}>
            Media Library
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Manage images and videos for your website
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          onClick={() => setOpenUpload(true)}
          sx={{ bgcolor: '#1e3a8a' }}
        >
          Upload Media
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filter by Type</InputLabel>
              <Select
                value={filter}
                label="Filter by Type"
                onChange={(e) => setFilter(e.target.value)}
                startAdornment={<FilterList />}
              >
                <MenuItem value="all">All Media</MenuItem>
                <MenuItem value="image">Images</MenuItem>
                <MenuItem value="video">Videos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={<Sort />}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="size">File Size</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => {
                setSearchTerm('')
                setFilter('all')
                setSortBy('newest')
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <Paper sx={{ p: 2, flex: 1, minWidth: 150, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1, borderRadius: '50%', bgcolor: '#1e3a8a15' }}>
              <Image sx={{ color: '#1e3a8a' }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {mediaItems.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Total Files
              </Typography>
            </Box>
          </Box>
        </Paper>
        
        <Paper sx={{ p: 2, flex: 1, minWidth: 150, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1, borderRadius: '50%', bgcolor: '#10b98115' }}>
              <InsertPhoto sx={{ color: '#10b981' }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {mediaItems.filter(m => m.type === 'image').length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Images
              </Typography>
            </Box>
          </Box>
        </Paper>
        
        <Paper sx={{ p: 2, flex: 1, minWidth: 150, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1, borderRadius: '50%', bgcolor: '#f59e0b15' }}>
              <VideoLibrary sx={{ color: '#f59e0b' }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {mediaItems.filter(m => m.type === 'video').length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Videos
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
            No media found
          </Typography>
          <Button
            variant="contained"
            startIcon={<CloudUpload />}
            onClick={() => setOpenUpload(true)}
            sx={{ bgcolor: '#1e3a8a' }}
          >
            Upload Your First Media
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredMedia.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                sx={{
                  border: selectedImages.includes(item.id) ? '2px solid #1e3a8a' : '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component={item.type === 'video' ? 'video' : 'img'}
                    height="200"
                    src={item.url}
                    alt={item.title}
                    sx={{ objectFit: 'cover' }}
                    {...(item.type === 'video' && { controls: true })}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: selectedImages.includes(item.id) ? '#1e3a8a' : 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': {
                        bgcolor: selectedImages.includes(item.id) ? '#0c2461' : 'rgba(0,0,0,0.7)',
                      },
                    }}
                    onClick={() => handleSelect(item.id)}
                  >
                    {selectedImages.includes(item.id) ? '✓' : '+'}
                  </IconButton>
                </Box>
                
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      {item.size}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      {item.uploaded}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    {item.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
                      />
                    ))}
                  </Box>
                  
                  <CardActions sx={{ p: 0, justifyContent: 'space-between' }}>
                    <Button
                      size="small"
                      startIcon={<Link />}
                      onClick={() => {
                        navigator.clipboard.writeText(item.url)
                        alert('URL copied to clipboard!')
                      }}
                    >
                      Copy URL
                    </Button>
                    <Box>
                      <IconButton size="small" color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Upload Dialog */}
      <Dialog open={openUpload} onClose={() => setOpenUpload(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Media</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            Upload images and videos for your website. Supported formats: JPG, PNG, GIF, MP4, WebM
          </Alert>
          
          <Box
            sx={{
              border: '2px dashed #1e3a8a',
              borderRadius: 3,
              p: 6,
              textAlign: 'center',
              mb: 3,
              bgcolor: '#f8fafc',
            }}
          >
            <CloudUpload sx={{ fontSize: 60, color: '#1e3a8a', mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" sx={{ mb: 1, color: '#1e3a8a' }}>
              Drop files here or click to upload
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Maximum file size: 10MB per file
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUpload />}
              sx={{ bgcolor: '#1e3a8a' }}
            >
              Select Files
              <input
                type="file"
                hidden
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
              />
            </Button>
          </Box>

          {uploadProgress > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Uploading... {uploadProgress}%
              </Typography>
              <LinearProgress variant="determinate" value={uploadProgress} sx={{ borderRadius: 1 }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpload(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default MediaLibrary