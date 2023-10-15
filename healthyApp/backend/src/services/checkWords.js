function checkWords(genero, alimento, calorias) {
  const generos = ["fruta", "vegetal"];

  if (genero.toLowerCase() === generos[0]) {
    if (alimento === "") return "Insere um alimento válido";
    if (isNaN(calorias)) return "Isere um número válido";
    return [genero, alimento, calorias];
  } else if (genero.toLowerCase() === genero[1]) {
    if (alimento === "") return "Insere um alimento válido!";
    if (isNaN(calorias)) return "Insere um numero!";
    return [genero, alimento, calorias];
  } else {
    return 'Tenta de novo, verifica se escreveste "fruta" ou "vegetal"';
  }
}

module.exports = { checkWords };
