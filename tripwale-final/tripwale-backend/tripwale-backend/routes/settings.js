const express = require('express')
const router = express.Router()
const SiteSettings = require('../models/SiteSettings')
const { protect } = require('../middleware/auth')

// GET /api/settings - Get all settings (grouped by category)
router.get('/', async (req, res) => {
  try {
    const settings = await SiteSettings.find({})
    const grouped = {}
    settings.forEach(s => {
      if (!grouped[s.category]) grouped[s.category] = {}
      grouped[s.category][s.key] = s.value
    })
    res.json({ success: true, settings: grouped })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/settings/:category - Public (only general/theme)
router.get('/:category', async (req, res) => {
  try {
    const settings = await SiteSettings.find({ category: req.params.category })
    const result = {}
    settings.forEach(s => { result[s.key] = s.value })
    res.json({ success: true, settings: result })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/settings/:category - Admin only (bulk update category)
router.put('/:category', protect, async (req, res) => {
  try {
    const { category } = req.params
    const updates = req.body

    const ops = Object.entries(updates).map(([key, value]) => ({
      updateOne: {
        filter: { key, category },
        update: { $set: { key, value, category } },
        upsert: true
      }
    }))

    await SiteSettings.bulkWrite(ops)
    
    const settings = await SiteSettings.find({ category })
    const result = {}
    settings.forEach(s => { result[s.key] = s.value })
    
    res.json({ success: true, settings: result, message: 'Settings saved successfully' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/settings/key/:key - Admin only (single key update)
router.put('/key/:key', protect, async (req, res) => {
  try {
    const { value, category } = req.body
    const setting = await SiteSettings.findOneAndUpdate(
      { key: req.params.key },
      { key: req.params.key, value, category: category || 'general' },
      { new: true, upsert: true }
    )
    res.json({ success: true, setting })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router
