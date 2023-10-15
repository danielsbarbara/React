const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 4040;

const { GetProducts, CreateNewProduct } = require("./src/data/CRUD");
const { filterId } = require("./src/services/filterProduct");
const { checkWords } = require("./src/services/checkWords");
const { veryReapeatedProduct } = require("./src/services/veryReapeatedProduct");



app.get("/api/all/products", async (req, res) => {
  const result = await GetProducts();
  const filteredProcuct = filterId(result)
  res.status(200).json({ result: filteredProcuct });
});

app.post("/api/add/product", async (req, res) => {
  console.log(req.body)
  const { genero, alimento, calorias } = req.body
  
  const verifiedWords = checkWords(genero, alimento, calorias);

  if (typeof verifiedWords === "string") return res.status(400).json({ result: verifiedWords });

  const getProdutctToCheck = await GetProducts();
  const verifyIfAlreadyExists = veryReapeatedProduct(alimento, getProdutctToCheck);

  if (verifyIfAlreadyExists) return res.status(401).json({ result: "Este alimento já existe!" });

  const productCreated = await CreateNewProduct(req.body);
  const response = productCreated.acknowledged && "Alimento adicionado!";
  res.status(200).json({ result: response });
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
