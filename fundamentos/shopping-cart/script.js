function cartItemClickListener(event) {
  event.target.remove();
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
// necessário para passar no lint
const stringCARTITEMS = '.cart__items';

function storagingCart() {
  const cartItems = document.querySelector(stringCARTITEMS);
  localStorage.setItem('cart', cartItems.innerHTML);
}

function refreshCart() {
  const cartItems = document.querySelector(stringCARTITEMS);
  const storage = localStorage.getItem('cart');
  cartItems.innerHTML = storage;
  cartItems.addEventListener('click', cartItemClickListener);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function clearButtonEvent() {
  const list = document.querySelectorAll('li');
  list.forEach((element) => element.remove());
}

async function clearCart() {
  const clearButton = document.querySelector('.empty-cart');
  clearButton.addEventListener('click', clearButtonEvent);
}

function getId(item) {
  const idItem = getSkuFromProductItem(item.parentElement);
  fetch(`https://api.mercadolibre.com/items/${idItem}`)
    .then((response) => response.json())
    .then((product) => {
      const cart = document.querySelector(stringCARTITEMS);
      const itemP = createCartItemElement(product);
      cart.appendChild(itemP);
      storagingCart();
    });
}
// fiz conforme monitoria, irei refatorar!!!!
// refatorei: ao inves de colocar todos os items e depois colcoar condições, ja passei como target o botao especifico.
// para isso adicionei na função createProductItemElement o evento, pois o botao esta sendo criado lá. senao da 'null'.
async function buttonEvent(button) {
  button.addEventListener('click', (event) => {
    const buttonItem = event.target;
    getId(buttonItem);
  });
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonItem = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonEvent(buttonItem);
  section.appendChild(buttonItem);
  return section;
}

function createObjectProduct(dados) {
  const divHTML = document.querySelector('.items');
  // coletar o objeto da api
  const getDados = dados.forEach((element) => {
    const item = createProductItemElement(element);
    divHTML.appendChild(item);
  });
  return getDados;
}

// feito durante mentoria com passo a passo da carol
// recolher e requerer api
function getAPI() {
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=$computador')
  .then((response) => response.json())
  .then((obj) => createObjectProduct(obj.results))
  .then(() => {
    const loadTag = document.querySelector('.loading');
    loadTag.remove();
  });
}

window.onload = () => { 
  getAPI();
  clearCart();
  refreshCart();
};
