const express = require('express')
const { protect } = require('../middleware/auth')

// We'll store misc settings in a simple JSON approach using a generic model
const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  value: mongoose.Schema.Types.Mixed,
  group: String,
}, { timestamps: true })

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema)

const router = express.Router()

const DEFAULTS = {
  site_name: 'TripWale',
  site_tagline: 'Explore the World with Us',
  contact_email: 'info@tripwale.in',
  contact_phone: '+91 98765 43210',
  whatsapp_number: '919876543210',
  address: 'New Delhi, India',
  facebook_url: '',
  instagram_url: '',
  youtube_url: '',
  twitter_url: '',
  meta_title: 'TripWale - Best Tour Packages in India',
  meta_description: 'Book best tour packages for domestic and international travel.',
  maintenance_mode: false,
  booking_email: 'bookings@tripwale.in',
}

// GET /api/settings - Get all settings (public subset)
router.get('/', async (req, res) => {
  try {
    const settingsArr = await Settings.find()
    const settings = { ...DEFAULTS }
    settingsArr.forEach(s => { settings[s.key] = s.value })
    res.json({ success: true, settings })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/settings - Update settings (admin)
router.put('/', protect, async (req, res) => {
  try {
    const updates = req.body // { key: value, ... }
    
    await Promise.all(Object.entries(updates).map(([key, value]) =>
      Settings.findOneAndUpdate({ key }, { value }, { upsert: true, new: true })
    ))
    
    const settingsArr = await Settings.find()
    const settings = { ...DEFAULTS }
    settingsArr.forEach(s => { settings[s.key] = s.value })
    
    res.json({ success: true, settings })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router
