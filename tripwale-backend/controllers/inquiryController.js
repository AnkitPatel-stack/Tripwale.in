const Inquiry = require('../models/Inquiry');

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
exports.getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('trip', 'title')
      .populate('assignedTo', 'name')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create inquiry
// @route   POST /api/inquiries
// @access  Public
exports.createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    res.status(201).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id/status
// @access  Private/Admin
exports.updateInquiryStatus = async (req, res, next) => {
  try {
    const { status, assignedTo } = req.body;

    let inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry not found'
      });
    }

    const updateFields = {};
    if (status) updateFields.status = status;
    if (assignedTo) updateFields.assignedTo = assignedTo;

    inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      updateFields,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};