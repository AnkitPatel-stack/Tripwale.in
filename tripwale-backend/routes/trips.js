const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', tripController.getTrips);
router.get('/featured', tripController.getFeaturedTrips);
router.get('/type/:type', tripController.getTripsByType);
router.get('/:id', tripController.getTrip);

// Protected admin routes
router.post('/', 
  auth.protect, 
  auth.authorize('admin'),
  tripController.createTrip
);

router.put('/:id',
  auth.protect,
  auth.authorize('admin'),
  tripController.updateTrip
);

router.delete('/:id',
  auth.protect,
  auth.authorize('admin'),
  tripController.deleteTrip
);

module.exports = router;