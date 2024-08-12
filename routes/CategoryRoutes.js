const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/CategoryController');

// Create a new category -> admin only
router.post('/', createCategory);

// Get all categories -> public or auth
router.get('/', getAllCategories);

// Get category by ID -> public or auth
router.get('/:id', getSingleCategory);

// Update category by ID -> admin only
router.put('/:id', auth, admin, updateCategory);

// Delete category by ID -> admin only
router.delete('/:id', deleteCategory);

module.exports = router;
