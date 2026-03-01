const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  tourTitle: String,
  message: String,
  type: { type: String, enum: ['contact', 'booking', 'query'], default: 'contact' },
  status: { type: String, enum: ['new', 'in-progress', 'resolved', 'spam'], default: 'new' },
  notes: String, // admin notes
}, { timestamps: true })

module.exports = mongoose.model('Inquiry', inquirySchema)
