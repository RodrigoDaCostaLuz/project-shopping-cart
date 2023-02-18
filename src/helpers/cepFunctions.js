export const getAddress = () => {
  // seu código aqui
  // const endpoints = [
  //   `https://cep.awesomeapi.com.br/json/${cep}`,
  //   `https://brasilapi.com.br/api/cep/v2/${cep}`,
  // ];

  // const responses = await Promise.any(endpoints.map((endpoint) => fetch(endpoint)));

  // const json = await responses.json();

  // if (json.cep) {
  //   return `${json.logradouro} - ${json.bairro} - ${json.localidade} - ${json.uf}`;
  // } throw new Error('CEP não encontrado');
};

export const searchCep = () => {
  // seu código aqui
  // const cep = document.querySelector('.cep-input').value.replace(/\D/g, '');

  // if (cep.length !== 8) {
  //   return;
  // }

  // try {
  //   const address = await getAddress(cep);

  //   const addressElement = document.querySelector('.cart__address');
  //   addressElement.textContent = address;
  // } catch (error) {
  //   const addressElement = document.querySelector('.cart__address');
  //   addressElement.textContent = 'CEP não encontrado';
  // }
};
