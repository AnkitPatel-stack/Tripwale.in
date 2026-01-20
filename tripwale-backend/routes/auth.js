// const express = require('express');
// const router = express.Router();
// const { body, validationResult } = require('express-validator');
// const authController = require('../controllers/authController');
// const auth = require('../middleware/auth');

// // Validation middleware
// const validateRegister = [
//   body('name').notEmpty().withMessage('Name is required'),
//   body('email').isEmail().withMessage('Please provide a valid email'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
//   body('phone').matches(/^[0-9]{10}$/).withMessage('Please provide a valid 10-digit phone number'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array()
//       });
//     }
//     next();
//   }
// ];

// const validateLogin = [
//   body('email').isEmail().withMessage('Please provide a valid email'),
//   body('password').notEmpty().withMessage('Password is required'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array()
//       });
//     }
//     next();
//   }
// ];

// const validateUpdatePassword = [
//   body('currentPassword').notEmpty().withMessage('Current password is required'),
//   body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array()
//       });
//     }
//     next();
//   }
// ];

// // Routes
// router.post('/register', validateRegister, authController.register);
// router.post('/login', validateLogin, authController.login);
// router.get('/me', auth.protect, authController.getMe);
// router.put('/updatedetails', auth.protect, authController.updateDetails);
// router.put('/updatepassword', auth.protect, validateUpdatePassword, authController.updatePassword);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Validation middleware
const validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Please provide a valid 10-digit phone number')
];

const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const validateUpdatePassword = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];

// Routes
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/me', auth.protect, authController.getMe);
router.put('/updatedetails', auth.protect, authController.updateDetails);
router.put('/updatepassword', auth.protect, validateUpdatePassword, authController.updatePassword);
router.post('/create-admin', authController.createAdmin); // For initial setup

module.exports = router;