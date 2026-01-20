const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Protected user routes
router.post('/',
  auth.protect,
  bookingController.createBooking
);

// Protected admin routes
router.get('/',
  auth.protect,
  auth.authorize('admin'),
  bookingController.getBookings
);

router.put('/:id/status',
  auth.protect,
  auth.authorize('admin'),
  bookingController.updateBookingStatus
);

module.exports = router;