const mongoose = require('mongoose');
const seedAdmin = require('../seedAdmin');

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  await seedAdmin();
}

module.exports = connectDB;
