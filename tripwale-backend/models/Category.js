// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please provide category name'],
//     unique: true,
//     trim: true,
//     maxlength: [50, 'Category name cannot be more than 50 characters']
//   },
//   description: {
//     type: String,
//     required: [true, 'Please provide category description']
//   },
//   icon: {
//     type: String,
//     default: 'category'
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   order: {
//     type: Number,
//     default: 0
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Category', categorySchema);

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide category name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide category description']
  },
  icon: {
    type: String,
    default: 'category'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', categorySchema);