const jwt = require('jsonwebtoken')
const AdminUser = require('../models/AdminUser')

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    const admin = await AdminUser.findById(decoded.id).select('-password')
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: 'Not authorized' })
    }

    req.admin = admin
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' })
  }
}

module.exports = { protect }
