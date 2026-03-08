const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
  adminName: String,
  action: { type: String, required: true },
  entity: String,   // 'tour', 'content', 'theme', etc.
  entityId: String,
  type: { type: String, enum: ['create', 'update', 'delete', 'login', 'upload', 'approve'], default: 'update' },
  details: mongoose.Schema.Types.Mixed,
}, { timestamps: true })

module.exports = mongoose.model('Activity', activitySchema)
