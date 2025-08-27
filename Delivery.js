
const mongoose = require('mongoose');
const deliverySchema = new mongoose.Schema({
  customer_id: { type: String, required: true },
  pickup_location: String,
  pickup_contact: String,
  pickup_phone: String,
  pickup_instructions: String,
  dropoff_location: String,
  dropoff_contact: String,
  dropoff_phone: String,
  dropoff_instructions: String,
  package_type: String,
  package_weight: Number,
  package_dimensions: String,
  package_description: String,
  expeditor_id: String,
  expeditor_name: String,
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Delivery', deliverySchema);