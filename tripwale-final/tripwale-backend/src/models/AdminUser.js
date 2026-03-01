const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminUserSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Admin' },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['super_admin', 'admin'], default: 'admin' },
  avatar: { type: String, default: '' },
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

adminUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

adminUserSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password)
}

adminUserSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model('AdminUser', adminUserSchema)
