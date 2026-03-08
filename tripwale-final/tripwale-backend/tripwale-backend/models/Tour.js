const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
  day: Number,
  title: String,
  description: String,
})

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: String,
  location: { type: String, required: true },
  duration: String,
  price: String,
  originalPrice: String,
  discount: String,
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  image: String,
  gallery: [String],
  category: String,
  tag: String,
  pageType: {
    type: String,
    enum: ['domestic', 'international', 'religious', 'one-day', 'trekking'],
    default: 'domestic'
  },
  highlights: [String],
  inclusions: [String],
  exclusions: [String],
  itinerary: [itinerarySchema],
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard', 'Expert'], default: 'Moderate' },
  groupSize: String,
  bestTime: String,
  flightIncluded: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  reviews: [reviewSchema],
  views: { type: Number, default: 0 },
  bookings: { type: Number, default: 0 },
}, { timestamps: true })

tourSchema.index({ title: 'text', description: 'text', location: 'text' })

module.exports = mongoose.model('Tour', tourSchema)
