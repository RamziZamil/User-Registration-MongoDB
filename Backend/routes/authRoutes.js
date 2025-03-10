const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Protected profile route
router.get('/profile', authController.authenticate, authController.getProfile);

module.exports = router;
