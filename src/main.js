import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement,
  createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';

const produtos = document.querySelector('.products');
const btnProdutos = document.getElementsByClassName('product__add');
const carrinhoCompras = document.querySelector('.cart__products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

const msgCustom = (element, className, innerText = '') => {
  const customElement = createCustomElement(element, className, innerText);
  produtos.appendChild(customElement);
};

const removeLoading = () => {
  const elementToDelete = document.querySelector('.loading');
  elementToDelete.remove();
};

const addCompras = (product) => {
  const productId = product.querySelector('.product__id').textContent;
  saveCartID(productId);
  fetchProduct(productId).then((productData) => {
    const cartProductElement = createCartProductElement(productData);
    carrinhoCompras.appendChild(cartProductElement);
  });
};

const addComprasEventListener = () => {
  Array.from(btnProdutos).forEach((product) => {
    product.addEventListener('click', () => addCompras(product.parentNode));
  });
};

const displayProducts = async (searchTerm) => {
  msgCustom('p', 'loading', 'carregando...');
  try {
    const results = await fetchProductsList(searchTerm);
    if (results.length) {
      results.forEach((item) => {
        produtos.appendChild(createProductElement(item));
      });
      addComprasEventListener();
    } else {
      msgCustom('p', 'error', 'Nenhum resultado encontrado.');
    }
  } catch (error) {
    msgCustom(
      'p',
      'error',
      'Algum erro ocorreu, recarregue a página e tente novamente.',
    );
  } finally {
    removeLoading();
  }
};

window.onload = () => {
  displayProducts('computador');
};
