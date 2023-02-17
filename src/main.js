import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';

// Elementos do DOM
const produtos = document.querySelector('.products');
const btnProdutos = document.getElementsByClassName('product__add');
const carrinhoCompras = document.querySelector('.cart__products');

// Event listener para buscar CEP
document.querySelector('.cep-button').addEventListener('click', searchCep);

// Função para exibir mensagem personalizada
const msgCustom = (element, className, innerText = '') => {
  const customElement = createCustomElement(element, className, innerText);
  produtos.appendChild(customElement);
};

// Função para remover elemento de carregamento
const removeLoading = () => {
  const elementToDelete = document.querySelector('.loading');
  elementToDelete.remove();
};

// Função para adicionar produto ao carrinho de compras
const addCompras = (product) => {
  const productId = product.querySelector('.product__id').textContent;
  saveCartID(productId);
  fetchProduct(productId).then((productData) => {
    const cartProductElement = createCartProductElement(productData);
    carrinhoCompras.appendChild(cartProductElement);
  });
};

// Função para adicionar eventos de clique nos botões de adicionar produto
const addComprasE = () => {
  Array.from(btnProdutos).forEach((product) => {
    product.addEventListener('click', () => addCompras(product.parentNode));
  });
};

// Função para exibir produtos na página
const displayProducts = async (searchTerm) => {
  // Exibe mensagem de carregamento
  msgCustom('p', 'loading', 'carregando...');

  try {
    const results = await fetchProductsList(searchTerm);
    if (results.length) {
      // Adiciona cada produto retornado pela API na página
      results.forEach((item) => {
        produtos.appendChild(createProductElement(item));
      });
      // Adiciona eventos de clique nos botões de adicionar produto
      addComprasE();
    } else {
      // Exibe mensagem de erro caso não haja resultados
      msgCustom('p', 'error', 'Nenhum resultado encontrado.');
    }
  } catch (error) {
    // Exibe mensagem de erro caso ocorra um erro ao buscar produtos
    msgCustom('p', 'error', 'Algum erro ocorreu, recarregue a página e tente novamente.');
  } finally {
    // Remove mensagem de carregamento
    removeLoading();
  }
};

// Exibe os produtos na página assim que ela é carregada
window.onload = () => {
  displayProducts('computador');
};
