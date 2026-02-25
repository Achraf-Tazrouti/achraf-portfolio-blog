const bcrypt = require('bcrypt');
require('dotenv').config();
const { client, connectMongoClient, getCollection } = require('./src/config/mongoClient');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME 
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const ADMIN_DB = process.env.ADMIN_DB 
const ADMIN_COLLECTION = process.env.ADMIN_COLLECTION || 'admins';

async function createAdmin() {
  await connectMongoClient();
  const collection = getCollection(ADMIN_DB, ADMIN_COLLECTION);

  const existing = await collection.findOne({ username: ADMIN_USERNAME });
  if (existing) {
    console.log('Admin bestaat al');
    await client.close();
    return;
  }

  const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const newUser = {
    username: ADMIN_USERNAME,
    password: hash,
    role: 'admin'
  };

  await collection.insertOne(newUser);
  console.log('Admin user aangemaakt');

  await client.close();
}

createAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
