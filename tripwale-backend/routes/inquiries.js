const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const inquiryController = require('../controllers/inquiryController');
const auth = require('../middleware/auth');

// Validation middleware
const validateInquiry = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Please provide a valid 10-digit phone number'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

// Public routes
router.post('/', validateInquiry, inquiryController.createInquiry);

// Protected admin routes
router.get('/',
  auth.protect,
  auth.authorize('admin'),
  inquiryController.getInquiries
);

router.put('/:id/status',
  auth.protect,
  auth.authorize('admin'),
  inquiryController.updateInquiryStatus
);

module.exports = router;