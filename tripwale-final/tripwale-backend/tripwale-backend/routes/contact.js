const express = require('express')
const router = express.Router()
const ContactSubmission = require('../models/ContactSubmission')
const { protect } = require('../middleware/auth')

// POST /api/contact - Public form submission
router.post('/', async (req, res) => {
  try {
    const submission = await ContactSubmission.create(req.body)
    res.status(201).json({ success: true, message: 'Message sent successfully! We will contact you soon.' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// GET /api/contact - Admin: get all submissions
router.get('/', protect, async (req, res) => {
  try {
    const { status, page: p, limit: l } = req.query
    const filter = status ? { status } : {}
    const pageNum = parseInt(p) || 1
    const limitNum = parseInt(l) || 20
    
    const [submissions, total] = await Promise.all([
      ContactSubmission.find(filter).sort({ createdAt: -1 }).skip((pageNum-1)*limitNum).limit(limitNum),
      ContactSubmission.countDocuments(filter)
    ])
    
    res.json({ success: true, submissions, total })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PATCH /api/contact/:id/status - Admin
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body
    const submission = await ContactSubmission.findByIdAndUpdate(req.params.id, { status }, { new: true })
    res.json({ success: true, submission })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/contact/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    await ContactSubmission.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Submission deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
