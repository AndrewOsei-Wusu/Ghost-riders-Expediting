const Delivery = require('../models/Delivery');
exports.getMyDeliveries = async (req, res) => {
  try {
    console.log('Fetching deliveries for user:', req.params.userId);
    const deliveries = await Delivery.find({ customer_id: req.params.userId });
    console.log('Deliveries found:', deliveries);
    res.json({ deliveries });
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const createDelivery = async (req, res) => {
  const { pickup_location, pickup_contact, pickup_phone, pickup_instructions, dropoff_location, dropoff_contact, dropoff_phone, dropoff_instructions, package_type, package_weight, package_dimensions, package_description } = req.body;
  try {
    const delivery = new Delivery({
      customer_id: req.user._id,
      pickup_location, pickup_contact, pickup_phone, pickup_instructions,
      dropoff_location, dropoff_contact, dropoff_phone, dropoff_instructions,
      package_type, package_weight, package_dimensions, package_description
    });
    await delivery.save();
    res.status(201).json({ delivery_id: delivery._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getExpeditors = async (req, res) => {
  try {
    const expeditors = await User.find({ role: 'expeditor' }).select('-password');
    res.json({ expeditors });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const chooseExpeditor = async (req, res) => {
  const { expeditor_id } = req.body;
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery || delivery.customer_id.toString() !== req.user._id.toString()) return res.status(404).json({ message: 'Delivery not found' });
    delivery.expeditor_id = expeditor_id;
    delivery.status = 'accepted';
    await delivery.save();
    res.json({ message: 'Expeditor assigned' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ customer_id: req.params.userId }).populate('expeditor_id', 'name phone');
    res.json({ deliveries });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await Delivery.find({ status: 'pending' }).populate('customer_id', 'name phone');
    res.json({ requests });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery || delivery.status !== 'pending') return res.status(404).json({ message: 'Request not found or already assigned' });
    delivery.expeditor_id = req.user._id;
    delivery.status = 'accepted';
    await delivery.save();
    res.json({ message: 'Request accepted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery || delivery.expeditor_id.toString() !== req.user._id.toString()) return res.status(404).json({ message: 'Delivery not found or not assigned to you' });
    delivery.status = status;
    await delivery.save();
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createDelivery, getExpeditors, chooseExpeditor, getMyDeliveries, getRequests, acceptRequest, updateStatus };


