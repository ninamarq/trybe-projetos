export function getMeals() {
  return (fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data)
  );
}

export function getDrinks() {
  return (fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data)
  );
}

export function getCategorys(type) {
  switch (type) {
  case 'meals':
    return (fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => data)
    );
  case 'drinks':
    return (fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => data)
    );
  default:
    return undefined;
  }
}

export function filterCategory(type, category) {
  switch (type) {
  case 'meals':
    return (
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((data) => data)
    );
  case 'drinks':
    return (
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((data) => data)
    );
  default:
    return undefined;
  }
}

export function getMealsFiltered(radio, input) {
  switch (radio) {
  case 'nome':
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
      .then((response) => response.json())
      .then((data) => data.meals);
  case 'ingrediente':
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
      .then((response) => response.json())
      .then((data) => data.meals);
  case 'primeira-letra':
    if (input.length === 1) {
      return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`)
        .then((response) => response.json())
        .then((data) => data.meals);
    }
    return global.alert('Sua busca deve conter somente 1 (um) caracter');
  default:
    return undefined;
  }
}

export function getDrinksFiltered(radio, input) {
  switch (radio) {
  case 'nome':
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
      .then((response) => response.json())
      .then((data) => data.drinks);
  case 'ingrediente':
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`)
      .then((response) => response.json())
      .then((data) => data.drinks);
  case 'primeira-letra':
    if (input.length === 1) {
      return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`)
        .then((response) => response.json())
        .then((data) => data.drinks);
    }
    return global.alert('Sua busca deve conter somente 1 (um) caracter');
  default:
    return undefined;
  }
}

export function randomRecipe(type) {
  const RANDOM_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const RANDOM_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  switch (type) {
  case 'meal':
    return (fetch(RANDOM_MEAL_URL)
      .then((response) => response.json())
      .then((data) => data.meals));
  case 'drink':
    return fetch(RANDOM_DRINK_URL)
      .then((response) => response.json())
      .then((data) => data.drinks);
  default:
    return undefined;
  }
}

export function getMealsIngredients() {
  return (fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((data) => data.meals)
  );
}

export function getDrinksIngredients() {
  return (fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((data) => data.drinks)
  );
}

export function getMealsByIngredient(ingredient) {
  return (fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then((data) => data.meals)
  );
}

export function getDrinksByIngredient(ingredient) {
  return (fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then((data) => data.drinks)
  );
}

export function getFoodDetail(id) {
  const FOOD_DETAIL_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  return (
    fetch(FOOD_DETAIL_URL)
      .then((response) => response.json())
      // O retorno da API é uma array com apenas 1 elemento.
      .then((data) => data.meals[0])
  );
}

export function getDrinkDetail(id) {
  const DRINK_DETAIL_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return (
    fetch(DRINK_DETAIL_URL)
      .then((response) => response.json())
      // O retorno da API é uma array com apenas 1 elemento.
      .then((data) => data.drinks[0])
  );
}

export function getRecomendationCard(type) {
  const RANDOM_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const RANDOM_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  switch (type) {
  case 'meal':
    return (fetch(RANDOM_DRINK_URL)
      .then((response) => response.json())
      .then((data) => data.drinks));
  case 'drink':
    return fetch(RANDOM_MEAL_URL)
      .then((response) => response.json())
      .then((data) => data.meals);
  default:
    return undefined;
  }
}

export function getAreaOptions() {
  return (fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
    .then((data) => data.meals)
  );
}

export function getRecipesFromArea(area) {
  return (fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((response) => response.json())
    .then((data) => data.meals)
  );
}
