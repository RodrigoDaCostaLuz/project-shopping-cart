import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsContainer = document.querySelector('.products');

// Cria o elemento de carregamento
const loadingElement = document.createElement('p');
loadingElement.textContent = 'Carregando...';
loadingElement.classList.add('loading');
productsContainer.appendChild(loadingElement);

const productList = await fetchProductsList('computador');

// Remove o elemento de carregamento
loadingElement.remove();

productList.forEach((product) => {
  const productElement = createProductElement(product);
  productsContainer.appendChild(productElement);
});
