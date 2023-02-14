export const fetchProduct = async () => {
  // if (!productId) {
  //   throw new Error('ID do produto não informado');
  // }
  // const response = await fetch(
  //   `https://api.mercadolibre.com/items/${productId}`
  // );
  // const product = await response.json();
  // return product;
};

export const fetchProductsList = async (searchTerm) => {
  if (!searchTerm) {
    throw new Error('Termo de busca não informado');
  }
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${searchTerm}`
  );
  const { results } = await response.json();
  return results;
};
