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

module.exports = { GetProducts, CreateNewProduct };
