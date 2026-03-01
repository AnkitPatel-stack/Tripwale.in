const mongoose = require('mongoose')

const siteSettingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed },
  category: { 
    type: String, 
    enum: ['general', 'theme', 'contact', 'social', 'seo', 'notifications', 'integrations'],
    default: 'general' 
  },
}, { timestamps: true })

module.exports = mongoose.model('SiteSettings', siteSettingsSchema)
