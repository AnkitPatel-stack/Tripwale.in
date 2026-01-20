const Trip = require('../models/Trip');

// @desc    Get all trips
// @route   GET /api/trips
// @access  Public
exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate('category');
    
    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Public
exports.getTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id).populate('category');

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
    next(error);
  }
};

// @desc    Create trip
// @route   POST /api/trips
// @access  Private/Admin
exports.createTrip = async (req, res, next) => {
  try {
    const trip = await Trip.create(req.body);

    res.status(201).json({
      success: true,
      data: trip
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private/Admin
exports.updateTrip = async (req, res, next) => {
  try {
    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: trip
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private/Admin
exports.deleteTrip = async (req, res, next) => {
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
    next(error);
  }
};

// @desc    Get featured trips
// @route   GET /api/trips/featured
// @access  Public
exports.getFeaturedTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ isFeatured: true, isActive: true })
      .populate('category')
      .limit(8);

    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trips by type
// @route   GET /api/trips/type/:type
// @access  Public
exports.getTripsByType = async (req, res, next) => {
  try {
    const trips = await Trip.find({ 
      type: req.params.type,
      isActive: true 
    }).populate('category');

    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    next(error);
  }
};