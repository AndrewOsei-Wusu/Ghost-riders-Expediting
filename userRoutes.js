const express = require('express');
const { updateProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/profile', protect, authorize(['expeditor']), updateProfile);

module.exports = router;
