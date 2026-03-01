const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const MediaFile = require('../models/MediaFile')
const { protect } = require('../middleware/auth')

const uploadDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${uuidv4()}${ext}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/
    const ext = allowed.test(path.extname(file.originalname).toLowerCase())
    const mime = allowed.test(file.mimetype)
    if (ext && mime) return cb(null, true)
    cb(new Error('Only image files allowed'))
  }
})

// GET /api/media - List all media (admin)
router.get('/', protect, async (req, res) => {
  try {
    const { category, page: p, limit: l } = req.query
    const filter = category ? { category } : {}
    const pageNum = parseInt(p) || 1
    const limitNum = parseInt(l) || 30
    
    const [files, total] = await Promise.all([
      MediaFile.find(filter).sort({ createdAt: -1 }).skip((pageNum-1)*limitNum).limit(limitNum),
      MediaFile.countDocuments(filter)
    ])
    
    res.json({ success: true, files, total })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/media/upload - Upload file (admin)
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })
    
    const baseUrl = `${req.protocol}://${req.get('host')}`
    const url = `${baseUrl}/uploads/${req.file.filename}`
    
    const mediaFile = await MediaFile.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      url,
      category: req.body.category || 'general',
      altText: req.body.altText || '',
      uploadedBy: req.admin.name,
    })
    
    res.status(201).json({ success: true, file: mediaFile, message: 'File uploaded successfully' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/media/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const file = await MediaFile.findById(req.params.id)
    if (!file) return res.status(404).json({ success: false, message: 'File not found' })
    
    // Delete physical file
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path)
    await MediaFile.findByIdAndDelete(req.params.id)
    
    res.json({ success: true, message: 'File deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
