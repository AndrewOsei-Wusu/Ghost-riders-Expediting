const express = require('express');
const {
  createDelivery,
  getExpeditors,
  chooseExpeditor,
  getMyDeliveries,
  getRequests,
  acceptRequest,
  updateStatus
} = require('./deliveryController');
const { protect, authorize } = require('./authMiddleware');
const router = express.Router();

router.post('/delivery', protect, authorize(['customer']), createDelivery);
router.get('/expeditors', protect, authorize(['customer']), getExpeditors);
router.put('/delivery/:id/choose-expeditor', protect, authorize(['customer']), chooseExpeditor);
router.get('/my-deliveries', protect, authorize(['customer']), getMyDeliveries);
router.get('/requests', protect, authorize(['expeditor']), getRequests);
router.put('/delivery/:id/accept', protect, authorize(['expeditor']), acceptRequest);
router.put('/delivery/:id/status', protect, authorize(['expeditor']), updateStatus);

module.exports = router;
