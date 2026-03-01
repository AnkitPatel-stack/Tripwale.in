const express = require('express')
const Inquiry = require('../models/Inquiry')
const Activity = require('../models/Activity')
const { protect } = require('../middleware/auth')

const router = express.Router()

// POST /api/inquiries - Create inquiry (public - from contact form)
router.post('/', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body)
    res.status(201).json({ success: true, inquiry, message: 'Your inquiry has been submitted!' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// GET /api/inquiries - Get all inquiries (admin)
router.get('/', protect, async (req, res) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query
    const query = {}
    if (status) query.status = status
    if (type) query.type = type
    
    const total = await Inquiry.countDocuments(query)
    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('tourId', 'title')
    
    res.json({ success: true, inquiries, total })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/inquiries/stats - Stats for dashboard
router.get('/stats', protect, async (req, res) => {
  try {
    const total = await Inquiry.countDocuments()
    const newCount = await Inquiry.countDocuments({ status: 'new' })
    const inProgress = await Inquiry.countDocuments({ status: 'in-progress' })
    const resolved = await Inquiry.countDocuments({ status: 'resolved' })
    res.json({ success: true, stats: { total, new: newCount, inProgress, resolved } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/inquiries/:id - Update status/notes (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!inquiry) return res.status(404).json({ success: false, message: 'Not found' })
    
    await Activity.create({
      adminId: req.admin._id, adminName: req.admin.name,
      action: `Updated inquiry status to ${inquiry.status}`, entity: 'inquiry', type: 'update',
    })
    res.json({ success: true, inquiry })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/inquiries/:id - Delete (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
