const express = require('express');
const router = express.Router();

// Public test routes
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Test route is working',
    endpoints: {
      health: '/test/health',
      echo: '/test/echo',
      error: '/test/error'
    }
  });
});

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

router.post('/echo', (req, res) => {
  res.json({
    success: true,
    message: 'Echo received',
    data: req.body,
    timestamp: new Date().toISOString()
  });
});

router.get('/error', (req, res, next) => {
  // Simulate an error
  const error = new Error('Test error message');
  error.statusCode = 400;
  next(error);
});

module.exports = router;