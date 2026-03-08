import React, { useState, useEffect, useRef } from 'react'
import {
  Box, Paper, Typography, Grid, Card, IconButton, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, Chip, TextField, Alert,
  CircularProgress, Tooltip, FormControl, InputLabel, Select, MenuItem,
  Pagination, Fade,
} from '@mui/material'
import { Upload, Delete, ContentCopy, Image, Close, Search, FilterList } from '@mui/icons-material'
import { mediaAPI } from '../../services/api'
import { keyframes } from '@emotion/react'

const slideUp = keyframes`from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}`

const MediaLibrary = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [success, setSuccess] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [previewFile, setPreviewFile] = useState(null)
  const fileRef = useRef()

  useEffect(() => { loadFiles() }, [page])

  const loadFiles = async () => {
    setLoading(true)
    try {
      const res = await mediaAPI.getAll({ page, limit: 20 })
      if (res.success) {
        setFiles(res.files)
        setTotal(res.total)
        setTotalPages(Math.ceil(res.total / 20))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (!selectedFiles.length) return
    setUploading(true)
    let uploaded = 0
    for (const file of selectedFiles) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', 'general')
      try {
        await mediaAPI.upload(formData)
        uploaded++
      } catch (err) {
        console.error('Upload failed:', file.name, err)
      }
    }
    setUploading(false)
    setSuccess(`${uploaded} file(s) uploaded successfully!`)
    setTimeout(() => setSuccess(''), 3000)
    loadFiles()
  }

  const handleDelete = async () => {
    try {
      await mediaAPI.delete(deleteConfirm._id)
      setDeleteConfirm(null)
      setSuccess('File deleted')
      setTimeout(() => setSuccess(''), 3000)
      loadFiles()
    } catch (err) {
      console.error(err)
    }
  }

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url)
    setSuccess('URL copied to clipboard!')
    setTimeout(() => setSuccess(''), 2000)
  }

  const formatSize = (bytes) => {
    if (!bytes) return 'Unknown'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <Box sx={{ animation: `${slideUp} 0.4s ease` }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Media Library</Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>{total} files uploaded</Typography>
        </Box>
        <Box>
          <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
          <Button variant="contained" startIcon={uploading ? <CircularProgress size={18} sx={{ color: 'white' }} /> : <Upload />}
            onClick={() => fileRef.current?.click()} disabled={uploading}
            sx={{ borderRadius: 2, bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' }, fontWeight: 700, px: 3 }}>
            {uploading ? 'Uploading...' : 'Upload Images'}
          </Button>
        </Box>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{success}</Alert>}

      {/* Drop Zone */}
      <Paper
        sx={{
          border: '2px dashed #d1d5db', borderRadius: 3, p: 4, textAlign: 'center', mb: 3, cursor: 'pointer',
          '&:hover': { borderColor: '#1e3a8a', bgcolor: '#eff6ff' }, transition: 'all 0.2s',
        }}
        onClick={() => fileRef.current?.click()}
      >
        <Upload sx={{ fontSize: 40, color: '#9ca3af', mb: 1 }} />
        <Typography variant="body1" sx={{ color: '#6b7280', fontWeight: 500 }}>
          Click to upload or drag & drop images here
        </Typography>
        <Typography variant="caption" sx={{ color: '#9ca3af' }}>PNG, JPG, WEBP up to 10MB each</Typography>
      </Paper>

      {/* Media Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress sx={{ color: '#1e3a8a' }} /></Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {files.length === 0 ? (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 8, color: '#888' }}>
                  <Image sx={{ fontSize: 64, color: '#e5e7eb', mb: 2 }} />
                  <Typography>No images uploaded yet. Upload your first image!</Typography>
                </Box>
              </Grid>
            ) : files.map((file) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={file._id}>
                <Fade in>
                  <Card sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', '&:hover .actions': { opacity: 1 }, position: 'relative' }}>
                    <Box sx={{ height: 140, overflow: 'hidden', position: 'relative' }} onClick={() => setPreviewFile(file)}>
                      <img src={file.url} alt={file.altText || file.originalName} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.2s' }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} />
                    </Box>
                    <Box className="actions" sx={{ position: 'absolute', top: 6, right: 6, display: 'flex', gap: 0.5, opacity: 0, transition: 'opacity 0.2s', bgcolor: 'rgba(0,0,0,0.5)', borderRadius: 1, p: 0.5 }}>
                      <Tooltip title="Copy URL">
                        <IconButton size="small" onClick={() => copyUrl(file.url)} sx={{ color: 'white', p: 0.5 }}><ContentCopy fontSize="small" /></IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => setDeleteConfirm(file)} sx={{ color: '#ff6b6b', p: 0.5 }}><Delete fontSize="small" /></IconButton>
                      </Tooltip>
                    </Box>
                    <Box sx={{ p: 1 }}>
                      <Typography variant="caption" sx={{ color: '#888', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {file.originalName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#bbb' }}>{formatSize(file.size)}</Typography>
                    </Box>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)}
                sx={{ '& .MuiPaginationItem-root.Mui-selected': { bgcolor: '#1e3a8a', color: 'white' } }} />
            </Box>
          )}
        </>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!previewFile} onClose={() => setPreviewFile(null)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
          {previewFile?.originalName}
          <IconButton onClick={() => setPreviewFile(null)}><Close /></IconButton>
        </DialogTitle>
        <DialogContent>
          <img src={previewFile?.url} alt="" style={{ width: '100%', borderRadius: 8, maxHeight: '60vh', objectFit: 'contain' }} />
          <Box sx={{ mt: 2, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
            <Typography variant="caption" sx={{ display: 'block', color: '#888', mb: 1 }}>URL (click to copy)</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', cursor: 'pointer', color: '#1e3a8a', wordBreak: 'break-all' }}
              onClick={() => copyUrl(previewFile?.url)}>
              {previewFile?.url}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button onClick={() => copyUrl(previewFile?.url)} startIcon={<ContentCopy />} variant="outlined" sx={{ borderRadius: 2 }}>Copy URL</Button>
          <Button onClick={() => setDeleteConfirm(previewFile)} color="error" variant="outlined" startIcon={<Delete />} sx={{ borderRadius: 2 }}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete File?</DialogTitle>
        <DialogContent><Typography>Delete <strong>{deleteConfirm?.originalName}</strong>? This cannot be undone.</Typography></DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button onClick={() => setDeleteConfirm(null)} variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" sx={{ borderRadius: 2, bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' } }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default MediaLibrary
