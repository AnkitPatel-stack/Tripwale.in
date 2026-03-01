const mongoose = require('mongoose')

const themeSettingsSchema = new mongoose.Schema({
  primaryColor: { type: String, default: '#1e3a8a' },
  secondaryColor: { type: String, default: '#3b82f6' },
  accentColor: { type: String, default: '#f59e0b' },
  backgroundColor: { type: String, default: '#ffffff' },
  textColor: { type: String, default: '#1a1a1a' },
  headerBg: { type: String, default: '#1e3a8a' },
  footerBg: { type: String, default: '#0f172a' },
  
  fontFamily: { type: String, default: 'Inter, sans-serif' },
  headingFont: { type: String, default: 'Inter, sans-serif' },
  fontSize: { type: String, default: '16px' },
  
  borderRadius: { type: String, default: '8px' },
  shadowIntensity: { type: String, enum: ['none', 'light', 'medium', 'heavy'], default: 'medium' },
  
  logo: { type: String, default: '' },
  logoText: { type: String, default: 'TripWale' },
  favicon: { type: String, default: '' },
  
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('ThemeSettings', themeSettingsSchema)
