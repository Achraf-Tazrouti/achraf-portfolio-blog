const bcrypt = require('bcrypt');
const User = require('./models/User');

async function seedAdmin() {
  const exists = await User.findOne({ role: 'admin' });
  if (exists) {
    console.log('Admin bestaat al');
    return;
  }

  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await User.create({
    username: process.env.ADMIN_USERNAME,
    password: hash,
    role: 'admin'
  });

  console.log('Admin user aangemaakt');
}

module.exports = seedAdmin;
