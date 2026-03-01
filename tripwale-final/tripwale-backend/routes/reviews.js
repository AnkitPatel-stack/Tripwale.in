const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const { protect } = require('../middleware/auth')

// GET /api/reviews - All approved reviews (public)
router.get('/', async (req, res) => {
  try {
    const { approved, featured, page: p, limit: l } = req.query
    const filter = {}
    if (approved !== undefined) filter.approved = approved === 'true'
    if (featured !== undefined) filter.featured = featured === 'true'
    
    const pageNum = parseInt(p) || 1
    const limitNum = parseInt(l) || 20
    
    const [reviews, total] = await Promise.all([
      Review.find(filter).sort({ createdAt: -1 }).skip((pageNum-1)*limitNum).limit(limitNum),
      Review.countDocuments(filter)
    ])
    
    res.json({ success: true, reviews, total })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/reviews - Submit review (public)
router.post('/', async (req, res) => {
  try {
    const review = await Review.create({ ...req.body, approved: false })
    res.status(201).json({ success: true, message: 'Review submitted for approval', review })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/reviews/:id - Admin
router.put('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' })
    res.json({ success: true, review, message: 'Review updated' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/reviews/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Review deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PATCH /api/reviews/:id/approve - Admin
router.patch('/:id/approve', protect, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { approved: true }, { new: true })
    res.json({ success: true, review, message: 'Review approved' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
