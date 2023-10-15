const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 4040;

const { GetProducts, CreateNewProduct, CreateUser } = require("./src/data/CRUD");
const { filterId } = require("./src/services/filterProduct");
const { checkWords } = require("./src/services/checkWords");
const { veryReapeatedProduct } = require("./src/services/veryReapeatedProduct");
const { verifyUser } = require('./src/services/verifyUser')
const {calcTotalCal} = require('./src/services/calcTotalCal')



//Obter Todos os alimentos disponiveis na BD
app.get("/api/all/products", async (req, res) => {
  const result = await GetProducts();
  const filteredProcuct = filterId(result)
  res.status(200).json({ result: filteredProcuct });
});


//Adicionar Alimentos
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


//Criar um novo usuário
app.post('/api/create/user', async (req, res) => {
  const { user, weight, age, height } = req.body
  const VerfUser = await verifyUser(user)

  if (!VerfUser) return res.status(400).json({ result: 'Este utilizador já existe!' })

  const TotalCal = calcTotalCal(weight, age, height)

  const newUser =  {
    user: user,
    TotalCalorias: 0,
    CaloriasNecessarias: TotalCal
  }
  const createNewUser = CreateUser(newUser)

  res.status(200).json({ result: 'Utilizador criado!' })
})


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
