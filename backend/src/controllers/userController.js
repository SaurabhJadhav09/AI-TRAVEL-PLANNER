const User = require('../models/user');

exports.getMe = async (req, res) => {
  try {
    // req.user contains the user id set by authMiddleware
    const user = await User.findById(req.user).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
