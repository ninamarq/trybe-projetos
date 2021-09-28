const assert = require('assert');
const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  OBS: Lembre-se que você não precisa se preocupar com o describe e o it por enquanto, isso será aprendido posteriormente.
*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste que o retorno da função é um array.
    assert.strictEqual(typeof productDetails('dsadsa', 'dsadsa'), 'object');
    // Teste que o array retornado pela função contém dois itens dentro.
    let items = Object.keys('dsadsa', 'dsadsa').length;
    assert.strictEqual(items, 6);
    // Teste que os dois itens dentro do array retornado pela função são objetos.
    let entries = Object.values('dsd', 'dsada');
    assert.strictEqual(typeof entries, 'object');
    // Teste que os dois objetos são diferentes entre si.
    assert.strictEqual(entries[0] === entries[1], false);
    // Teste que os dois productIds terminam com 123.

    //neste teste, foi pesquisado 'how to check if a string ends with a substring in javascript'
    // sendo acessado -> https://www.w3schools.com/jsref/jsref_endswith.asp
    assert.strictEqual((productDetails('oi', 'dsad')[0].details.productId).endsWith(123), true);
  });
});
