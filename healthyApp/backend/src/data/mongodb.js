const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const defaultDbName = "Healthy";

let client = undefined;

async function GetMongoClient() {
  if (!client) {
    try {
      client = new MongoClient(url);
      await client.connect();
    } catch (err) {
      console.log(err);
    }
  }
  console.log(`Connected to ${defaultDbName} database`);
  return client;
}

async function CloseConnection() {
  return await client.close();
}

async function GetCollection(dbName = defaultDbName, collectionName) {
  const cli = await GetMongoClient();
  const db = cli.db(dbName);
  return db.collection(collectionName);
}

module.exports = { GetCollection };
