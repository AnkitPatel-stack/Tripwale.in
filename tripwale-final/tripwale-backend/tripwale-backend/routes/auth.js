const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const { protect } = require('../middleware/auth')

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' })

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }

    const admin = await Admin.findOne({ email })
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    if (!admin.isActive) {
      return res.status(401).json({ success: false, message: 'Account is disabled' })
    }

    admin.lastLogin = new Date()
    await admin.save({ validateBeforeSave: false })

    const token = signToken(admin._id)

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
      }
    })
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
    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { name, email, avatar },
      { new: true, runValidators: true }
    ).select('-password')
    res.json({ success: true, admin })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/auth/change-password
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const admin = await Admin.findById(req.admin._id)
    
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
