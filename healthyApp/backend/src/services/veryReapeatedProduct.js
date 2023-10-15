function veryReapeatedProduct(alimento, baseDados) {
  return baseDados.reduce(
    (verf, val) =>
      val.alimento.toLowerCase() === alimento.toLowerCase() ? (verf = true) : (verf = false),
    false
  );
}

module.exports = {
  veryReapeatedProduct,
};
