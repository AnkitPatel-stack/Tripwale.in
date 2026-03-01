const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: String,
  url: { type: String, required: true },
  publicId: String, // Cloudinary public_id
  type: { type: String, enum: ['image', 'video', 'document'], default: 'image' },
  size: Number,
  width: Number,
  height: Number,
  folder: { type: String, default: 'general' },
  alt: String,
  usedIn: [String], // references where it's used
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
}, { timestamps: true })

module.exports = mongoose.model('Media', mediaSchema)
