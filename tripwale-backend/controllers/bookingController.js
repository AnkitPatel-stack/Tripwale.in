const Booking = require('../models/Booking');
const Trip = require('../models/Trip');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('trip', 'title price duration')
      .sort('-bookingDate');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    const { trip, travelDate, numberOfPeople, specialRequirements } = req.body;

    // Check if trip exists
    const tripDetails = await Trip.findById(trip);
    if (!tripDetails) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    // Calculate total amount
    let totalAmount = numberOfPeople.adults * tripDetails.price.perPerson;
    totalAmount += numberOfPeople.children * (tripDetails.price.perPerson - tripDetails.price.childDiscount);
    totalAmount += numberOfPeople.seniors * (tripDetails.price.perPerson - tripDetails.price.seniorDiscount);

    const booking = await Booking.create({
      user: req.user.id,
      trip,
      travelDate,
      numberOfPeople,
      totalAmount,
      finalAmount: totalAmount,
      contactPerson: {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone
      },
      specialRequirements
    });

    // Update available seats
    tripDetails.availableSeats -= numberOfPeople.adults;
    tripDetails.bookingCount += 1;
    await tripDetails.save();

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;

    let booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    const updateFields = {};
    if (status) updateFields.status = status;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;

    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateFields,
      {
        new: true,
        runValidators: true
      }
    ).populate('trip', 'title');

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};