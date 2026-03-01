const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  tourTitle: String,
  approved: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  avatar: String,
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema)
