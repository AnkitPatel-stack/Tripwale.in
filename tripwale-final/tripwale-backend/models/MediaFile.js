const mongoose = require('mongoose')

const mediaFileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: String,
  size: Number,
  path: String,
  url: String,
  category: { type: String, default: 'general' },
  altText: String,
  uploadedBy: String,
}, { timestamps: true })

module.exports = mongoose.model('MediaFile', mediaFileSchema)
