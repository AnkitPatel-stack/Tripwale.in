const express = require('express')
const router = express.Router()
const Tour = require('../models/Tour')
const Review = require('../models/Review')
const ContactSubmission = require('../models/ContactSubmission')
const { protect } = require('../middleware/auth')

// GET /api/analytics/dashboard - Admin dashboard stats
router.get('/dashboard', protect, async (req, res) => {
  try {
    const [
      totalTours, activeTours, totalReviews, pendingReviews,
      totalContacts, newContacts, toursByType, topTours,
      recentContacts
    ] = await Promise.all([
      Tour.countDocuments(),
      Tour.countDocuments({ active: true }),
      Review.countDocuments({ approved: true }),
      Review.countDocuments({ approved: false }),
      ContactSubmission.countDocuments(),
      ContactSubmission.countDocuments({ status: 'new' }),
      Tour.aggregate([{ $group: { _id: '$pageType', count: { $sum: 1 }, views: { $sum: '$views' } } }]),
      Tour.find({ active: true }).sort({ views: -1 }).limit(5).select('title views bookings image'),
      ContactSubmission.find({ status: 'new' }).sort({ createdAt: -1 }).limit(5),
    ])

    res.json({
      success: true,
      stats: {
        totalTours, activeTours,
        inactiveTours: totalTours - activeTours,
        totalReviews, pendingReviews,
        totalContacts, newContacts,
      },
      toursByType,
      topTours,
      recentContacts,
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
