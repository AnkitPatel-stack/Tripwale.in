// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const path = require('path');

// // // Load env vars
// // dotenv.config();

// // const app = express();

// // // Middleware
// // app.use(cors({
// //   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
// //   credentials: true
// // }));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGODB_URI)
// //   .then(() => console.log('✅ MongoDB Connected'))
// //   .catch(err => console.error('❌ MongoDB Connection Error:', err));

// // // Test route
// // app.get('/', (req, res) => {
// //   res.json({ 
// //     message: 'Tripwale.in API is running...',
// //     version: '1.0.0',
// //     status: 'online'
// //   });
// // });

// // // Health check
// // app.get('/health', (req, res) => {
// //   res.status(200).json({
// //     success: true,
// //     message: 'Server is healthy',
// //     timestamp: new Date().toISOString(),
// //     database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
// //   });
// // });

// // // Import and use routes
// // try {
// //   const authRoutes = require('./routes/auth');
// //   const tripRoutes = require('./routes/trips');
// //   const categoryRoutes = require('./routes/categories');
// //   const bookingRoutes = require('./routes/bookings');
// //   const inquiryRoutes = require('./routes/inquiries');
// //   const testRoutes = require('./routes/test')
  
// //   app.use('/api/auth', authRoutes);
// //   app.use('/api/trips', tripRoutes);
// //   app.use('/api/categories', categoryRoutes);
// //   app.use('/api/bookings', bookingRoutes);
// //   app.use('/api/inquiries', inquiryRoutes);
// //   app.use('/api/test', testRoutes);
  
// //   console.log('✅ All routes loaded successfully');
// // } catch (error) {
// //   console.error('❌ Error loading routes:', error.message);
// // }

// // // Error handler
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({
// //     success: false,
// //     error: 'Something went wrong!',
// //     message: process.env.NODE_ENV === 'development' ? err.message : undefined
// //   });
// // });

// // // 404 handler
// // app.use('*', (req, res) => {
// //   res.status(404).json({
// //     success: false,
// //     error: 'Endpoint not found'
// //   });
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on port ${PORT}`);
// //   console.log(`✅ Environment: ${process.env.NODE_ENV}`);
// //   console.log(`✅ MongoDB: ${process.env.MONGODB_URI ? 'Configured' : 'Not configured'}`);
// // });

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB Connection Error:', err));

// // Import models
// require('./models/User');
// require('./models/Category');
// require('./models/Trip');
// require('./models/Booking');
// require('./models/Inquiry');

// // Test route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Tripwale.in API is running...',
//     version: '1.0.0',
//     status: 'online'
//   });
// });

// // Health check
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is healthy',
//     timestamp: new Date().toISOString(),
//     database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//   });
// });

// // Simple auth routes for testing
// app.post('/api/test/register', async (req, res) => {
//   try {
//     const User = mongoose.model('User');
//     const { name, email, password, phone } = req.body;
    
//     const user = new User({
//       name,
//       email,
//       password,
//       phone,
//       role: 'user'
//     });
    
//     await user.save();
    
//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully',
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// app.post('/api/test/login', async (req, res) => {
//   try {
//     const User = mongoose.model('User');
//     const { email, password } = req.body;
    
//     // This is a simple test - in production, use proper authentication
//     const user = await User.findOne({ email });
    
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         error: 'Invalid credentials'
//       });
//     }
    
//     // Simple password check (in production, use bcrypt)
//     const isValid = await user.comparePassword(password);
    
//     if (!isValid) {
//       return res.status(401).json({
//         success: false,
//         error: 'Invalid credentials'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// // Test trips endpoint
// app.get('/api/test/trips', async (req, res) => {
//   try {
//     const Trip = mongoose.model('Trip');
//     const trips = await Trip.find().limit(10);
    
//     res.status(200).json({
//       success: true,
//       count: trips.length,
//       data: trips
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// // Test categories endpoint
// app.get('/api/test/categories', async (req, res) => {
//   try {
//     const Category = mongoose.model('Category');
//     const categories = await Category.find();
    
//     res.status(200).json({
//       success: true,
//       count: categories.length,
//       data: categories
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// // Create test data endpoint
// app.post('/api/test/seed', async (req, res) => {
//   try {
//     const User = mongoose.model('User');
//     const Category = mongoose.model('Category');
//     const Trip = mongoose.model('Trip');
    
//     // Create admin user
//     const admin = new User({
//       name: 'Admin',
//       email: 'admin@tripwale.in',
//       password: 'Admin@123',
//       phone: '6266203629',
//       role: 'admin'
//     });
//     await admin.save();
    
//     // Create categories
//     const categories = [
//       { name: 'Domestic Tours', description: 'Explore India', icon: 'location_city', order: 1 },
//       { name: 'International Tours', description: 'Explore World', icon: 'flight', order: 2 },
//       { name: 'Religious Yatra', description: 'Spiritual journeys', icon: 'temple_hindu', order: 3 }
//     ];
    
//     const createdCategories = await Category.insertMany(categories);
    
//     // Create a trip
//     const trip = new Trip({
//       title: 'Kashmir Paradise Tour',
//       description: 'Experience the beauty of Kashmir',
//       shortDescription: '7 days in paradise',
//       category: createdCategories[0]._id,
//       type: 'domestic',
//       duration: { days: 7, nights: 6 },
//       price: { perPerson: 25000, childDiscount: 2000, seniorDiscount: 1500 },
//       destinations: ['Srinagar', 'Gulmarg'],
//       inclusions: ['Accommodation', 'Meals'],
//       exclusions: ['Airfare'],
//       itinerary: [
//         { day: 1, title: 'Arrival', description: 'Transfer to hotel', meals: 'Dinner' },
//         { day: 2, title: 'Sightseeing', description: 'Visit gardens', meals: 'Breakfast' }
//       ],
//       startDate: new Date('2024-03-15'),
//       endDate: new Date('2024-03-21'),
//       maxPeople: 15,
//       availableSeats: 15,
//       isFeatured: true
//     });
//     await trip.save();
    
//     res.status(201).json({
//       success: true,
//       message: 'Test data created successfully',
//       data: {
//         admin: admin.email,
//         categories: createdCategories.length,
//         trips: 1
//       }
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     error: 'Something went wrong!',
//     message: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     error: 'Endpoint not found'
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
//   console.log(`✅ Environment: ${process.env.NODE_ENV}`);
//   console.log(`✅ Test endpoints available at /api/test/*`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Import models (do this once)
const User = require('./models/User');
const Category = require('./models/Category');
const Trip = require('./models/Trip');
const Booking = require('./models/Booking');
const Inquiry = require('./models/Inquiry');

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Tripwale.in API is running...',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      auth: '/api/auth',
      trips: '/api/trips',
      categories: '/api/categories',
      bookings: '/api/bookings',
      inquiries: '/api/inquiries'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ========== AUTH ROUTES ==========
const jwt = require('jsonwebtoken');

// Register user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get current user
const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

// ========== TRIP ROUTES ==========

// Get all trips
app.get('/api/trips', async (req, res) => {
  try {
    const { type, featured } = req.query;
    let query = { isActive: true };
    
    if (type) {
      query.type = type;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    const trips = await Trip.find(query)
      .populate('category', 'name description')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get single trip
app.get('/api/trips/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('category', 'name description');
    
    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Create trip (admin only)
app.post('/api/trips', authMiddleware, authorize('admin'), async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    
    res.status(201).json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Update trip (admin only)
app.put('/api/trips/:id', authMiddleware, authorize('admin'), async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Delete trip (admin only)
app.delete('/api/trips/:id', authMiddleware, authorize('admin'), async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    
    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }
    
    await trip.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ========== CATEGORY ROUTES ==========

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort('order');
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Create category (admin only)
app.post('/api/categories', authMiddleware, authorize('admin'), async (req, res) => {
  try {
    const category = await Category.create(req.body);
    
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ========== INQUIRY ROUTES ==========

// Create inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }
    
    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      subject,
      message
    });
    
    res.status(201).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get all inquiries (admin only)
app.get('/api/inquiries', authMiddleware, authorize('admin'), async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ========== BOOKING ROUTES ==========

// Create booking
app.post('/api/bookings', authMiddleware, async (req, res) => {
  try {
    const { trip, travelDate, numberOfPeople } = req.body;
    
    // Get trip details
    const tripDetails = await Trip.findById(trip);
    if (!tripDetails) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }
    
    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      trip,
      travelDate,
      numberOfPeople,
      totalAmount: numberOfPeople.adults * tripDetails.price.perPerson,
      finalAmount: numberOfPeople.adults * tripDetails.price.perPerson,
      contactPerson: {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone
      }
    });
    
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get user bookings
app.get('/api/bookings/my', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('trip', 'title price duration')
      .sort('-bookingDate');
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get all bookings (admin only)
app.get('/api/bookings', authMiddleware, authorize('admin'), async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('trip', 'title')
      .sort('-bookingDate');
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV}`);
  console.log(`✅ MongoDB: ${process.env.MONGODB_URI ? 'Connected' : 'Not connected'}`);
  console.log('\n📋 Available endpoints:');
  console.log('  GET  /                    - Server status');
  console.log('  GET  /health             - Health check');
  console.log('  POST /api/auth/register  - Register user');
  console.log('  POST /api/auth/login     - Login user');
  console.log('  GET  /api/auth/me        - Get current user (protected)');
  console.log('  GET  /api/trips          - Get all trips');
  console.log('  GET  /api/trips/:id      - Get single trip');
  console.log('  POST /api/trips          - Create trip (admin)');
  console.log('  GET  /api/categories     - Get all categories');
  console.log('  POST /api/inquiries      - Submit inquiry');
  console.log('  POST /api/bookings       - Create booking (protected)');
});