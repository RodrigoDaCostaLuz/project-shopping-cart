import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsContainer = document.querySelector('.products');

const loadingElement = document.createElement('p');
loadingElement.textContent = 'Carregando...';
loadingElement.classList.add('loading');
productsContainer.appendChild(loadingElement);

try {
  const productList = await fetchProductsList('computador');

  // Remove o elemento de carregamento
  loadingElement.remove();

  productList.forEach((product) => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });
} catch (error) {
  // Remove o elemento de carregamento
  loadingElement.remove();

  // Adiciona o elemento de erro dinamicamente
  const errorElement = document.createElement('p');
  errorElement.textContent = 'Algum erro ocorreu, recarregue a página e tente novamente';
  errorElement.classList.add('error');
  productsContainer.appendChild(errorElement);
}
