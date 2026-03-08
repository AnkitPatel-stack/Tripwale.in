const express = require('express')
const router = express.Router()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const MediaFile = require('../models/MediaFile')
const { protect } = require('../middleware/auth')

// ─── Cloudinary Setup ──────────────────────────────────────────────────────
// Cloudinary stores images permanently in the cloud
// No more disappearing images when Render.com restarts!
let cloudinary = null
let uploadToCloud = null

try {
  cloudinary = require('cloudinary').v2
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  
  const { CloudinaryStorage } = require('multer-storage-cloudinary')
  const cloudStorage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'tripwale',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }],
      public_id: (req, file) => `tour_${uuidv4()}`,
    },
  })
  uploadToCloud = multer({
    storage: cloudStorage,
    limits: { fileSize: 10 * 1024 * 1024 },
  })
  console.log('✅ Cloudinary configured for image uploads')
} catch (e) {
  console.log('⚠️  Cloudinary not available, using memory upload fallback')
}

// ─── Memory storage fallback (no disk, avoids ephemeral FS issue) ──────────
const memStorage = multer.memoryStorage()
const uploadMem = multer({
  storage: memStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/jpeg|jpg|png|gif|webp/.test(file.mimetype)) cb(null, true)
    else cb(new Error('Only image files allowed'))
  },
})

// ─── Choose upload middleware ──────────────────────────────────────────────
const getUploadMiddleware = () => {
  if (uploadToCloud && process.env.CLOUDINARY_CLOUD_NAME) return uploadToCloud
  return uploadMem
}

// ─── GET /api/media ────────────────────────────────────────────────────────
router.get('/', protect, async (req, res) => {
  try {
    const { category, page: p, limit: l } = req.query
    const filter = category ? { category } : {}
    const pageNum = parseInt(p) || 1
    const limitNum = parseInt(l) || 30

    const [files, total] = await Promise.all([
      MediaFile.find(filter).sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(limitNum),
      MediaFile.countDocuments(filter),
    ])
    res.json({ success: true, files, total })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ─── POST /api/media/upload ────────────────────────────────────────────────
router.post('/upload', protect, (req, res) => {
  const upload = getUploadMiddleware()
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message })
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })

    try {
      let url, publicId

      if (req.file.path) {
        // Cloudinary upload — path is the Cloudinary URL
        url = req.file.path
        publicId = req.file.filename
      } else {
        // Memory buffer — upload to Cloudinary manually if configured
        if (cloudinary && process.env.CLOUDINARY_CLOUD_NAME) {
          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: 'tripwale', public_id: `tour_${uuidv4()}`, resource_type: 'image' },
              (error, result) => { if (error) reject(error); else resolve(result) }
            )
            stream.end(req.file.buffer)
          })
          url = result.secure_url
          publicId = result.public_id
        } else {
          // Last resort: convert to base64 data URL (works but not recommended for large images)
          const base64 = req.file.buffer.toString('base64')
          url = `data:${req.file.mimetype};base64,${base64}`
          publicId = uuidv4()
        }
      }

      // Force HTTPS always
      url = url.replace(/^http:\/\//, 'https://')

      const mediaFile = await MediaFile.create({
        filename: publicId || uuidv4(),
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: url,
        url,
        category: req.body.category || 'general',
        altText: req.body.altText || '',
        uploadedBy: req.admin?.name || 'admin',
        storageType: url.startsWith('data:') ? 'base64' : url.includes('cloudinary') ? 'cloudinary' : 'local',
      })

      res.status(201).json({ success: true, file: mediaFile, message: 'File uploaded successfully' })
    } catch (uploadErr) {
      console.error('Upload error:', uploadErr)
      res.status(500).json({ success: false, message: uploadErr.message })
    }
  })
})

// ─── DELETE /api/media/:id ─────────────────────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const file = await MediaFile.findById(req.params.id)
    if (!file) return res.status(404).json({ success: false, message: 'File not found' })

    // Delete from Cloudinary if applicable
    if (cloudinary && file.filename && !file.url?.startsWith('data:') && !file.url?.startsWith('http://localhost')) {
      try {
        await cloudinary.uploader.destroy(file.filename)
      } catch (e) { /* ignore cloudinary delete errors */ }
    }

    await MediaFile.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'File deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
