const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
  day: Number,
  title: String,
  description: String,
}, { _id: false })

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
  approved: { type: Boolean, default: true },
})

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: String, required: true },
  originalPrice: String,
  discount: String,
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  image: { type: String, default: '' },
  gallery: [String],
  
  category: {
    type: String,
    enum: ['hill-station', 'backwater', 'beach', 'religious', 'trekking', 'heritage', 'wildlife', 'adventure', 'international', 'one-day'],
    required: true,
  },
  pageType: {
    type: String,
    enum: ['domestic', 'international', 'religious', 'trekking', 'one-day'],
    required: true,
  },
  tag: String,
  
  highlights: [String],
  itinerary: [itinerarySchema],
  inclusions: [String],
  exclusions: [String],
  
  bestTime: String,
  groupSize: String,
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard', 'Extreme'], default: 'Easy' },
  
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  
  reviews: [reviewSchema],
  viewCount: { type: Number, default: 0 },
  bookingCount: { type: Number, default: 0 },
}, { timestamps: true })

// Auto-generate slug
tourSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
  next()
})

module.exports = mongoose.model('Tour', tourSchema)
