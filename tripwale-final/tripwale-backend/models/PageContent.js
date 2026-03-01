const mongoose = require('mongoose')

const pageContentSchema = new mongoose.Schema({
  page: { 
    type: String, 
    required: true, 
    unique: true,
    enum: ['home', 'domestic', 'international', 'religious', 'one-day-trips', 'trekking', 'about', 'contact']
  },
  sections: { type: mongoose.Schema.Types.Mixed, default: {} },
  seo: {
    title: String,
    description: String,
    keywords: String,
  },
  lastModifiedBy: String,
}, { timestamps: true })

module.exports = mongoose.model('PageContent', pageContentSchema)
