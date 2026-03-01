const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const app = express()

// ─── Security & Middleware ───────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(morgan('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// CORS - allow all localhost in dev, specific origins in prod
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true)
    // Allow any localhost port for development
    if (origin.match(/^http:\/\/localhost:\d+$/)) return callback(null, true)
    // Allow Vercel deployments
    if (origin.endsWith('.vercel.app')) return callback(null, true)
    // Allow configured frontend URL
    const frontendUrl = process.env.FRONTEND_URL
    if (frontendUrl && origin === frontendUrl) return callback(null, true)
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, message: 'Too many requests' })
app.use('/api/', limiter)

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ─── Database ────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tripwale')
  .then(() => {
    console.log('✅ MongoDB Connected')
    seedAdmin()
  })
  .catch(err => console.error('❌ MongoDB Error:', err))

// Auto-seed admin if not exists
async function seedAdmin() {
  try {
    const Admin = require('./models/Admin')
    const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL })
    if (!exists) {
      await Admin.create({
        name: 'TripWale Admin',
        email: process.env.ADMIN_EMAIL || 'admin@tripwale.in',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'super_admin',
      })
      console.log('✅ Default admin created:', process.env.ADMIN_EMAIL || 'admin@tripwale.in')
    }
  } catch (err) {
    console.error('Seed error:', err.message)
  }
}

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'))
app.use('/api/tours', require('./routes/tours'))
app.use('/api/content', require('./routes/content'))
app.use('/api/settings', require('./routes/settings'))
app.use('/api/reviews', require('./routes/reviews'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/media', require('./routes/media'))
app.use('/api/analytics', require('./routes/analytics'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'TripWale API is running!', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// ─── Error Handler ───────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🚀 TripWale Backend running on port ${PORT}`)
  console.log(`📁 API: http://localhost:${PORT}/api`)
  console.log(`💡 Admin Email: ${process.env.ADMIN_EMAIL || 'admin@tripwale.in'}`)
  console.log(`💡 Admin Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`)
})

module.exports = app
