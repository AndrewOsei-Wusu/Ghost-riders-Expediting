const express = require('express');
const { getMyDeliveries } = require('../controllers/deliveryController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/my-deliveries/:userId', verifyToken, getMyDeliveries);
module.exports = router;

router.post('/delivery', protect, authorize(['customer']), createDelivery);
router.get('/expeditors', protect, getExpeditors);
router.put('/delivery/:id/choose-expeditor', protect, authorize(['customer']), chooseExpeditor);
router.get('/my-deliveries/:userId', protect, authorize(['customer']), getMyDeliveries);
router.get('/requests/:expeditorId', protect, authorize(['expeditor']), getRequests);
router.put('/delivery/:id/accept', protect, authorize(['expeditor']), acceptRequest);
router.put('/delivery/:id/status', protect, authorize(['expeditor']), updateStatus);

module.exports = router;

