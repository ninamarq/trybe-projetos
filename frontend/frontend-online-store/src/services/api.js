export async function getCategories() {
  const URL_REQUEST = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const URL_REQUEST_JSON = await URL_REQUEST.json();
  return URL_REQUEST_JSON;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL_CATEGORY_REQUEST = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const URL_CATEGORY_REQUEST_JSON = await URL_CATEGORY_REQUEST.json();
  console.log(URL_CATEGORY_REQUEST_JSON);
  return URL_CATEGORY_REQUEST_JSON;
}
