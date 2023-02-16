import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct deve ser uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch deve ser chamada quando fetchProduct for executada com o argumento "MLB1405519561"', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch deve ser chamada com o endpoint correto quando fetchProduct for executada com o argumento "MLB1405519561"', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('o retorno da função fetchProduct com o argumento "MLB1405519561" deve ser uma estrutura de dados igual ao objeto produto', async () => {
    await expect(fetchProduct('MLB1405519561')).resolves.toEqual(product);
  });

  it('fetchProduct sem argumento deve retornar um erro com a mensagem "ID não informado"', async () => {
    await expect(fetchProduct()).rejects.toThrow(new Error('ID não informado'));
  });

  it('fetchProduct com um argumento inválido deve retornar um erro', async () => {
    await expect(fetchProduct('123')).rejects.toThrow(new Error('invalid argument'));
  });
});
