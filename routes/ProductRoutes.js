const express = require('express');
const router = express.Router();
// const upload = require('../middleware/upload');
const multer = require('multer');


// Multer setup
const upload = multer({ storage: multer.memoryStorage() });


const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/ProductController');

// Create a new product -> admin
router.post('/' ,upload.single('image'),createProduct);

// Get all products
router.get('/', getProducts);

// Get product by ID
router.get('/:id' , getProductById);

// Update product by ID -> admin
router.put('/:id', updateProduct);

// Delete product by ID -> admin
router.delete('/:id', deleteProduct);

module.exports = router;
