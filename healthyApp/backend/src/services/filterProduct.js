function filterId(result) {
  return result.map((ele) => ({
    genero: ele.genero,
    alimento: ele.alimento,
    calorias: ele.calorias,
  }));
}

module.exports = { filterId };
