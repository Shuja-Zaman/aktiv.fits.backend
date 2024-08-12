// routes/review.routes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');

// Route to create a new review
router.post('/', reviewController.createReview);

// Route to get all reviews for a product
router.get('/product/:productId', reviewController.getReviewsByProduct);

// Route to update a review by ID
router.put('/:id', reviewController.updateReview);

// Route to delete a review by ID
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
