const express = require('express')
const Tour = require('../models/Tour')
const Activity = require('../models/Activity')
const { protect } = require('../middleware/auth')

const router = express.Router()

// ─── PUBLIC ROUTES ────────────────────────────────────────────────────────────

// GET /api/tours - Get all tours (public, with filters)
router.get('/', async (req, res) => {
  try {
    const { pageType, category, featured, active, search, limit = 50, page = 1 } = req.query
    const query = {}
    
    if (pageType) query.pageType = pageType
    if (category) query.category = category
    if (featured === 'true') query.isFeatured = true
    if (active !== 'false') query.isActive = true
    if (search) query.title = { $regex: search, $options: 'i' }

    const total = await Tour.countDocuments(query)
    const tours = await Tour.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-reviews')

    res.json({ success: true, tours, total, page: parseInt(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/tours/:id - Get single tour (public)
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' })
    
    // Increment view count
    tour.viewCount = (tour.viewCount || 0) + 1
    await tour.save({ validateBeforeSave: false })
    
    res.json({ success: true, tour })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ─── ADMIN ROUTES ─────────────────────────────────────────────────────────────

// GET /api/tours/admin/all - Get all tours for admin (with inactive)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const { search, pageType, category, page = 1, limit = 20 } = req.query
    const query = {}
    if (search) query.title = { $regex: search, $options: 'i' }
    if (pageType) query.pageType = pageType
    if (category) query.category = category

    const total = await Tour.countDocuments(query)
    const tours = await Tour.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))

    res.json({ success: true, tours, total, page: parseInt(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/tours - Create tour (admin)
router.post('/', protect, async (req, res) => {
  try {
    const tour = await Tour.create(req.body)
    await Activity.create({
      adminId: req.admin._id, adminName: req.admin.name,
      action: `Created tour: ${tour.title}`, entity: 'tour',
      entityId: tour._id.toString(), type: 'create',
    })
    res.status(201).json({ success: true, tour })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/tours/:id - Update tour (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' })
    
    await Activity.create({
      adminId: req.admin._id, adminName: req.admin.name,
      action: `Updated tour: ${tour.title}`, entity: 'tour',
      entityId: tour._id.toString(), type: 'update',
    })
    res.json({ success: true, tour })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/tours/:id - Delete tour (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id)
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' })
    
    await Activity.create({
      adminId: req.admin._id, adminName: req.admin.name,
      action: `Deleted tour: ${tour.title}`, entity: 'tour',
      entityId: tour._id.toString(), type: 'delete',
    })
    res.json({ success: true, message: 'Tour deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/tours/:id/toggle - Toggle active status
router.put('/:id/toggle', protect, async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' })
    
    tour.isActive = !tour.isActive
    await tour.save()
    
    res.json({ success: true, tour })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/tours/bulk-delete - Bulk delete (admin)
router.post('/bulk-delete', protect, async (req, res) => {
  try {
    const { ids } = req.body
    await Tour.deleteMany({ _id: { $in: ids } })
    await Activity.create({
      adminId: req.admin._id, adminName: req.admin.name,
      action: `Bulk deleted ${ids.length} tours`, entity: 'tour', type: 'delete',
    })
    res.json({ success: true, message: `${ids.length} tours deleted` })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/tours/:id/reviews - Add review (admin approve/manage)
router.put('/:id/reviews/:reviewId', protect, async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' })
    
    const review = tour.reviews.id(req.params.reviewId)
    if (review) {
      Object.assign(review, req.body)
      await tour.save()
    }
    res.json({ success: true, tour })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
