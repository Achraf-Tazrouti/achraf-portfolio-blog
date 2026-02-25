const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User niet gevonden:', username);
      return res.status(401).json({ message: 'Invalid login' });
    }

    console.log('User gevonden:', user.username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Wachtwoord mismatch voor:', username);
      return res.status(401).json({ message: 'Invalid login' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('Login succesvol voor:', username);
    res.json({ token });
  } catch (err) {
    console.error('Fout bij login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
