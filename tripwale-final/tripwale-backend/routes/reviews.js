const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const Tour = require('../models/Tour')
const { protect } = require('../middleware/auth')

// GET /api/reviews - All reviews (admin) or approved only (public)
router.get('/', async (req, res) => {
  try {
    const { approved, featured, page: p, limit: l, tourId } = req.query
    const filter = {}
    if (approved !== undefined) filter.approved = approved === 'true'
    if (featured !== undefined) filter.featured = featured === 'true'
    if (tourId) filter.tourId = tourId

    const pageNum = parseInt(p) || 1
    const limitNum = parseInt(l) || 20

    const [reviews, total] = await Promise.all([
      Review.find(filter).sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(limitNum),
      Review.countDocuments(filter),
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

// PUT /api/reviews/:id - Admin update
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
    const review = await Review.findById(req.params.id)
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' })

    // Also remove from embedded Tour reviews if linked
    if (review.tourId) {
      await Tour.updateOne(
        { _id: review.tourId },
        { $pull: { reviews: { _id: review._id } } }
      )
    }

    await Review.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Review deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PATCH /api/reviews/:id/approve - Admin approve
// This is the KEY FIX: approving updates both the Review collection
// AND the embedded review inside the Tour document
router.patch('/:id/approve', protect, async (req, res) => {
  try {
    // 1. Approve in standalone Review collection
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    )
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' })

    // 2. If linked to a Tour, add/update the embedded review in Tour.reviews
    if (review.tourId) {
      const tour = await Tour.findById(review.tourId)
      if (tour) {
        // Check if this review already exists as embedded (by matching name+comment)
        const existingIdx = tour.reviews.findIndex(
          r => r.name === review.name && r.comment === review.comment
        )

        if (existingIdx >= 0) {
          // Update existing embedded review to approved
          tour.reviews[existingIdx].approved = true
        } else {
          // Add new approved embedded review
          tour.reviews.push({
            name: review.name,
            rating: review.rating,
            comment: review.comment,
            approved: true,
            createdAt: review.createdAt,
          })
        }

        // Recalculate average rating from all approved reviews
        const approvedReviews = tour.reviews.filter(r => r.approved)
        if (approvedReviews.length > 0) {
          const avgRating = approvedReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / approvedReviews.length
          tour.rating = Math.round(avgRating * 10) / 10
        }

        await tour.save()
      }
    }

    res.json({ success: true, review, message: 'Review approved and added to tour page' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PATCH /api/reviews/:id/reject - Admin reject
router.patch('/:id/reject', protect, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: false },
      { new: true }
    )
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' })

    // Remove from Tour embedded reviews if it was there
    if (review.tourId) {
      await Tour.updateOne(
        { _id: review.tourId },
        { $set: { 'reviews.$[elem].approved': false } },
        { arrayFilters: [{ 'elem.name': review.name, 'elem.comment': review.comment }] }
      )
    }

    res.json({ success: true, review, message: 'Review rejected' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
