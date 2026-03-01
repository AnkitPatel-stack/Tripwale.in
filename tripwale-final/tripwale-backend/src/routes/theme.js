const express = require('express')
const ThemeSettings = require('../models/ThemeSettings')
const Activity = require('../models/Activity')
const { protect } = require('../middleware/auth')

const router = express.Router()

// GET /api/theme - Get active theme (public)
router.get('/', async (req, res) => {
  try {
    let theme = await ThemeSettings.findOne({ isActive: true })
    if (!theme) {
      theme = await ThemeSettings.create({}) // Create with defaults
    }
    res.json({ success: true, theme })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/theme - Update theme (admin)
router.put('/', protect, async (req, res) => {
  try {
    let theme = await ThemeSettings.findOne({ isActive: true })
    
    if (!theme) {
      theme = await ThemeSettings.create({ ...req.body, isActive: true })
    } else {
      Object.assign(theme, req.body)
      await theme.save()
    }
    
    await Activity.create({
      adminId: req.admin._id, adminName: req.admin.name,
      action: 'Updated website theme/colors', entity: 'theme', type: 'update',
    })
    
    res.json({ success: true, theme })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// POST /api/theme/reset - Reset to defaults (admin)
router.post('/reset', protect, async (req, res) => {
  try {
    await ThemeSettings.deleteMany({})
    const theme = await ThemeSettings.create({ isActive: true })
    res.json({ success: true, theme })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
