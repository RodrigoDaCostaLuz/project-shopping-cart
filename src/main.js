import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement,
  createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

const produtos = document.querySelector('.products');
const btnProdutos = document.getElementsByClassName('product__add');
const carrinhoCompras = document.querySelector('.cart__products');
const precosTotais = document.querySelector('.total-price');

document.querySelector('.cep-button').addEventListener('click', searchCep);

const msgCustom = (element, className, innerText = '') => {
  const customElement = createCustomElement(element, className, innerText);
  produtos.appendChild(customElement);
};

const addCompras = (product) => {
  const productId = product.querySelector('.product__id').textContent;
  saveCartID(productId);
  fetchProduct(productId).then((productData) => {
    const cartProductElement = createCartProductElement(productData);
    carrinhoCompras.appendChild(cartProductElement);
    const precos = Array.from(document.querySelectorAll('.cart__product-price'))
      .map((price) => Number(price.innerText));
    const precoSomados = precos.reduce((acc, curr) => acc + curr, 0);
    precosTotais.innerHTML = precoSomados.toFixed(2);
  });
};

const addComprasX = () => {
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
      addComprasX();
    } else {
      msgCustom('p', 'error', 'Nenhum resultado encontrado.');
    }
  } catch (error) {
    msgCustom('p', 'error', 'Algum erro ocorreu, recarregue a página e tente novamente.');
  } finally {
    const salvaProdutos = getSavedCartIDs();
    const promises = salvaProdutos.map((product) => fetchProduct(product));
    Promise.all(promises).then((result) => {
      result.forEach((resul) => {
        const productElement = createCartProductElement(resul);
        carrinhoCompras.appendChild(productElement);
      });
      const precos = result.map((resul) => resul.price);
      const precoSomados = precos.reduce((acc, curr) => acc + curr, 0);
      precosTotais.innerHTML = precoSomados.toFixed(2);
    });
  }
};

window.onload = () => {
  displayProducts('computador');
};
