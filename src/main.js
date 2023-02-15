import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

(async () => {
  try {
    const searchProduct = 'computador';
    const productList = await fetchProductsList(searchProduct);
    const productsContainer = document.querySelector('.products');
    productList.forEach((product) => {
      const productElement = createProductElement(product);
      productsContainer.appendChild(productElement);
    });
  } catch (error) {
    console.error(error);
  }
})();
