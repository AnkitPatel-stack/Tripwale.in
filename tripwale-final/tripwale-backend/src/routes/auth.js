const express = require('express')
const jwt = require('jsonwebtoken')
const AdminUser = require('../models/AdminUser')
const Activity = require('../models/Activity')
const { protect } = require('../middleware/auth')

const router = express.Router()

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }

    const admin = await AdminUser.findOne({ email: email.toLowerCase() })
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    admin.lastLogin = new Date()
    await admin.save({ validateBeforeSave: false })

    await Activity.create({ adminId: admin._id, adminName: admin.name, action: 'Admin logged in', type: 'login' })

    const token = signToken(admin._id)
    res.json({ success: true, token, admin })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, admin: req.admin })
})

// PUT /api/auth/update-profile
router.put('/update-profile', protect, async (req, res) => {
  try {
    const { name, email, avatar } = req.body
    const admin = await AdminUser.findByIdAndUpdate(
      req.admin._id,
      { name, email, avatar },
      { new: true, runValidators: true }
    )
    res.json({ success: true, admin })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/auth/change-password
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const admin = await AdminUser.findById(req.admin._id)
    
    if (!(await admin.comparePassword(currentPassword))) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' })
    }
    
    admin.password = newPassword
    await admin.save()
    
    res.json({ success: true, message: 'Password changed successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
