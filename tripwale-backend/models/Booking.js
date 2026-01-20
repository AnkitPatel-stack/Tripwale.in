// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   trip: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Trip',
//     required: true
//   },
//   bookingDate: {
//     type: Date,
//     default: Date.now
//   },
//   travelDate: {
//     type: Date,
//     required: true
//   },
//   numberOfPeople: {
//     adults: {
//       type: Number,
//       required: true,
//       min: 1
//     },
//     children: {
//       type: Number,
//       default: 0
//     },
//     seniors: {
//       type: Number,
//       default: 0
//     }
//   },
//   totalAmount: {
//     type: Number,
//     required: true
//   },
//   discount: {
//     type: Number,
//     default: 0
//   },
//   finalAmount: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'confirmed', 'cancelled', 'completed'],
//     default: 'pending'
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'partial', 'paid', 'refunded'],
//     default: 'pending'
//   },
//   paymentMethod: {
//     type: String,
//     enum: ['cash', 'card', 'upi', 'netbanking'],
//     default: 'cash'
//   },
//   contactPerson: {
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     },
//     phone: {
//       type: String,
//       required: true
//     }
//   },
//   specialRequirements: {
//     type: String,
//     default: ''
//   },
//   notes: {
//     type: String,
//     default: ''
//   }
// });

// module.exports = mongoose.model('Booking', bookingSchema);

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  travelDate: {
    type: Date,
    required: true
  },
  numberOfPeople: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0
    },
    seniors: {
      type: Number,
      default: 0
    }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  finalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'netbanking'],
    default: 'cash'
  },
  contactPerson: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  specialRequirements: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Booking', bookingSchema);