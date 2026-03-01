const mongoose = require('mongoose')

// Each "block" is an editable section of a page
const contentBlockSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    // e.g. 'home', 'about', 'contact', 'domestic-tours', etc.
  },
  section: {
    type: String,
    required: true,
    // e.g. 'hero', 'about-section', 'why-choose-us', 'stats', 'cta', 'testimonials'
  },
  label: String,     // Human readable label for admin
  type: {
    type: String,
    enum: ['text', 'html', 'image', 'json', 'number', 'boolean'],
    default: 'text',
  },
  value: mongoose.Schema.Types.Mixed,
  defaultValue: mongoose.Schema.Types.Mixed,
  description: String, // hint for admin
}, { timestamps: true })

contentBlockSchema.index({ page: 1, section: 1 }, { unique: true })

module.exports = mongoose.model('ContentBlock', contentBlockSchema)
