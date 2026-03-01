const express = require('express')
const Tour = require('../models/Tour')
const Inquiry = require('../models/Inquiry')
const Activity = require('../models/Activity')
const { protect } = require('../middleware/auth')

const router = express.Router()

// GET /api/analytics/dashboard - Dashboard stats
router.get('/dashboard', protect, async (req, res) => {
  try {
    const [
      totalTours,
      activeTours,
      featuredTours,
      totalInquiries,
      newInquiries,
      totalBookings,
      recentActivities,
    ] = await Promise.all([
      Tour.countDocuments(),
      Tour.countDocuments({ isActive: true }),
      Tour.countDocuments({ isFeatured: true }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Tour.aggregate([{ $group: { _id: null, total: { $sum: '$bookingCount' } } }]),
      Activity.find().sort({ createdAt: -1 }).limit(10),
    ])

    // Top tours by views
    const topTours = await Tour.find({ isActive: true })
      .sort({ viewCount: -1 })
      .limit(5)
      .select('title viewCount bookingCount rating image')

    // Tours by category
    const toursByCategory = await Tour.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    // Tours by pageType
    const toursByType = await Tour.aggregate([
      { $group: { _id: '$pageType', count: { $sum: 1 } } },
    ])

    res.json({
      success: true,
      stats: {
        totalTours,
        activeTours,
        featuredTours,
        totalInquiries,
        newInquiries,
        totalBookings: totalBookings[0]?.total || 0,
      },
      topTours,
      toursByCategory,
      toursByType,
      recentActivities,
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/analytics/activities - Activity log
router.get('/activities', protect, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const total = await Activity.countDocuments()
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
    
    res.json({ success: true, activities, total })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
