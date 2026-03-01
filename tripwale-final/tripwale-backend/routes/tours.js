const express = require('express')
const router = express.Router()
const Tour = require('../models/Tour')
const { protect } = require('../middleware/auth')

// GET /api/tours - Public
router.get('/', async (req, res) => {
  try {
    const { pageType, category, active, featured, search, limit, page: p } = req.query
    const filter = {}
    
    if (pageType) filter.pageType = pageType
    if (category) filter.category = category
    if (active !== undefined) filter.active = active === 'true'
    if (featured !== undefined) filter.featured = featured === 'true'
    if (search) filter.$text = { $search: search }

    const pageNum = parseInt(p) || 1
    const limitNum = parseInt(limit) || 50
    const skip = (pageNum - 1) * limitNum

    const [tours, total] = await Promise.all([
      Tour.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Tour.countDocuments(filter)
    ])

    res.json({ success: true, tours, total, page: pageNum, pages: Math.ceil(total / limitNum) })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/tours/stats - Admin
router.get('/stats', protect, async (req, res) => {
  try {
    const [total, active, byType] = await Promise.all([
      Tour.countDocuments(),
      Tour.countDocuments({ active: true }),
      Tour.aggregate([{ $group: { _id: '$pageType', count: { $sum: 1 } } }])
    ])
    res.json({ success: true, stats: { total, active, inactive: total - active, byType } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/tours/:id - Public
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' })
    
    // Increment views
    tour.views = (tour.views || 0) + 1
    await tour.save({ validateBeforeSave: false })
    
    res.json({ success: true, tour })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/tours - Admin only
router.post('/', protect, async (req, res) => {
  try {
    const tour = await Tour.create(req.body)
    res.status(201).json({ success: true, tour, message: 'Tour created successfully' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/tours/:id - Admin only
router.put('/:id', protect, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' })
    res.json({ success: true, tour, message: 'Tour updated successfully' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/tours/:id - Admin only
router.delete('/:id', protect, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id)
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' })
    res.json({ success: true, message: 'Tour deleted successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/tours/:id/review - Public
router.post('/:id/review', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' })
    
    tour.reviews.push({ ...req.body, approved: false })
    await tour.save()
    
    res.status(201).json({ success: true, message: 'Review submitted for approval' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// Bulk import tours (admin)
router.post('/bulk-import', protect, async (req, res) => {
  try {
    const { tours } = req.body
    const result = await Tour.insertMany(tours, { ordered: false })
    res.status(201).json({ success: true, count: result.length, message: `${result.length} tours imported` })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router
