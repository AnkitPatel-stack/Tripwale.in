const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  meals: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'All', 'None'],
    default: 'None'
  },
  accommodation: {
    type: String,
    default: ''
  }
});

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide trip title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    sparse: true, // This allows multiple null values
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide trip description']
  },
  shortDescription: {
    type: String,
    required: [true, 'Please provide short description'],
    maxlength: [300, 'Short description cannot be more than 300 characters']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  type: {
    type: String,
    enum: ['domestic', 'international', 'religious', 'corporate', 'student', 'weekend', 'oneday'],
    required: true
  },
  images: [{
    url: String,
    public_id: String,
    altText: String
  }],
  duration: {
    days: {
      type: Number,
      required: true
    },
    nights: {
      type: Number,
      required: true
    }
  },
  price: {
    perPerson: {
      type: Number,
      required: true
    },
    childDiscount: {
      type: Number,
      default: 0
    },
    seniorDiscount: {
      type: Number,
      default: 0
    }
  },
  inclusions: [{
    type: String
  }],
  exclusions: [{
    type: String
  }],
  itinerary: [itinerarySchema],
  destinations: [{
    type: String,
    required: true
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  maxPeople: {
    type: Number,
    default: 20
  },
  availableSeats: {
    type: Number,
    default: 20
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  bookingCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate slug before saving
tripSchema.pre('save', function(next) {
  if (this.isModified('title') && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Add index for better query performance
tripSchema.index({ type: 1, isActive: 1 });
tripSchema.index({ isFeatured: 1, isActive: 1 });
tripSchema.index({ category: 1 });

module.exports = mongoose.model('Trip', tripSchema);