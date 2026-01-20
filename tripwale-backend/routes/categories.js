const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);

// Protected admin routes
router.post('/',
  auth.protect,
  auth.authorize('admin'),
  categoryController.createCategory
);

router.put('/:id',
  auth.protect,
  auth.authorize('admin'),
  categoryController.updateCategory
);

router.delete('/:id',
  auth.protect,
  auth.authorize('admin'),
  categoryController.deleteCategory
);

module.exports = router;