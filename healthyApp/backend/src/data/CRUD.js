const { GetCollection } = require("./mongodb");

async function GetProducts() {
  const collection = await GetCollection("HealthyApp", "Products");
  const result = await collection.find().toArray();
  return result;
}

async function CreateNewProduct(product) {
  const collection = await GetCollection("HealthyApp", "Products");
  const result = await collection.insertOne(product);
  return result;
}

async function CheckUser(user) {
  const collection = await GetCollection("HealthyApp", "Users")
  const result = await collection.findOne({ user: user })
  if (result === null) return { user: false }
  return result
}

async function CreateUser(user) {
  const collection = await GetCollection("HealthyApp", "Users")
  const result = await collection.insertOne(user)
  return result
}

module.exports = { 
  GetProducts, 
  CreateNewProduct, 
  CheckUser,
  CreateUser
};
