const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const app = express()

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(morgan('dev'))
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:3000',
    /\.vercel\.app$/,
  ],
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 })
app.use('/api/', limiter)

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'))
app.use('/api/tours', require('./routes/tours'))
app.use('/api/content', require('./routes/content'))
app.use('/api/theme', require('./routes/theme'))
app.use('/api/media', require('./routes/media'))
app.use('/api/inquiries', require('./routes/inquiries'))
app.use('/api/analytics', require('./routes/analytics'))
app.use('/api/settings', require('./routes/settings'))

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }))

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }))

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
})

// ─── Connect to MongoDB & Start ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tripwale')
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  })

module.exports = app
