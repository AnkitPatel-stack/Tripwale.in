const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Media = require('../models/Media')
const Activity = require('../models/Activity')
const { protect } = require('../middleware/auth')

const router = express.Router()

// Local storage fallback (when Cloudinary not configured)
const uploadsDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, unique + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (allowed.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Only images are allowed'))
  },
})

// Serve uploaded files
router.use('/files', express.static(uploadsDir))

// GET /api/media - Get all media (admin)
router.get('/', protect, async (req, res) => {
  try {
    const { folder, page = 1, limit = 20 } = req.query
    const query = folder ? { folder } : {}
    const total = await Media.countDocuments(query)
    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('uploadedBy', 'name')
    
    res.json({ success: true, media, total })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/media/upload - Upload image (admin)
router.post('/upload', protect, upload.array('images', 10), async (req, res) => {
  try {
    const { folder = 'general' } = req.body
    const baseUrl = `${req.protocol}://${req.get('host')}`
    
    const saved = await Promise.all(req.files.map(async file => {
      return Media.create({
        filename: file.filename,
        originalName: file.originalname,
        url: `${baseUrl}/api/media/files/${file.filename}`,
        type: 'image',
        size: file.size,
        folder,
        uploadedBy: req.admin._id,
      })
    }))
    
    await Activity.create({
      adminId: req.admin._id, adminName: req.admin.name,
      action: `Uploaded ${req.files.length} image(s)`, entity: 'media', type: 'upload',
    })
    
    res.json({ success: true, media: saved })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/media/:id - Delete media (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
    if (!media) return res.status(404).json({ success: false, message: 'Not found' })
    
    // Try to delete local file
    const filePath = path.join(uploadsDir, media.filename)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    
    await Media.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/media/:id - Update media metadata (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, media })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router
