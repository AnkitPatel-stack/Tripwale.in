const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number']
  },
  subject: {
    type: String,
    required: [true, 'Please provide subject']
  },
  message: {
    type: String,
    required: [true, 'Please provide your message']
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip'
  },
  type: {
    type: String,
    enum: ['general', 'trip', 'booking', 'corporate'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'resolved', 'closed'],
    default: 'new'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: [{
    content: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inquiry', inquirySchema);