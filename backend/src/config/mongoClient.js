const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);

async function connectMongoClient() {
  await client.connect();
  console.log('MongoClient connected');
}

function getCollection(dbName, collectionName) {
  return client.db(dbName).collection(collectionName);
}

module.exports = {
  client,
  connectMongoClient,
  getCollection
};
