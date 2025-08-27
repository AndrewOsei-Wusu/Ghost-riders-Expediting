const User = require('./User');

const updateProfile = async (req, res) => {
  const { vehicle_type, license_number, service_area } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.role !== 'expeditor') return res.status(404).json({ message: 'User not found or not an expeditor' });

    user.vehicle_type = vehicle_type || user.vehicle_type;
    user.license_number = license_number || user.license_number;
    user.service_area = service_area || user.service_area;
    await user.save();

    res.json({ message: 'Profile updated', user: { id: user._id, name: user.name, role: user.role, email: user.email, phone: user.phone, vehicle_type: user.vehicle_type, license_number: user.license_number, service_area: user.service_area } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateProfile };
