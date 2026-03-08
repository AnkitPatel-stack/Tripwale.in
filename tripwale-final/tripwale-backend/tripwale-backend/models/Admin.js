const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Admin' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'super_admin' },
  avatar: { type: String, default: '' },
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('Admin', adminSchema)
