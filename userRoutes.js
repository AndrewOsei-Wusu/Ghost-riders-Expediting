const express = require('express');
const { updateProfile } = require('./userController');
const { protect, authorize } = require('./authMiddleware');
const router = express.Router();

router.post('/profile', protect, authorize(['expeditor']), updateProfile);

module.exports = router;
