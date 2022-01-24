import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import myContext from './myContext';
import { setLocalStorage } from '../services/servicesLocalStorage';
import {
  getMeals, getDrinks,
  getMealsFiltered, getDrinksFiltered,
} from '../services/servicesAPI';

const INITIAL_USER = {
  email: '',
  password: '',
};

const defaultFavitesLocalStorage = {
  id: '',
  type: '',
  area: '',
  category: '',
  alcoholicOrNot: '',
  name: '',
  image: '',
};

const defaultInProgressRecipes = {
  cocktails: {},
  meals: {},
};

function Provider({ children }) {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState(defaultInProgressRecipes);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [meals, setMeals] = useState([]);
  const [favorites, setFavorites] = useState([defaultFavitesLocalStorage]);
  const [renderFavorites, setRender] = useState('all');

  function validEmail(email) {
    const splitEmail = email.split('@');
    if (splitEmail.length === 2) {
      const splitEmail2 = splitEmail[1].split('.');
      if (splitEmail2.length === 2 && splitEmail2[1].length > 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  useEffect(() => {
    const MIN_LENGTH_PASSWORD = 7;
    if (user.password.length >= MIN_LENGTH_PASSWORD && validEmail(user.email)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  function handleSearchClick() {
    return isSearching ? setSearching(false) : setSearching(true);
  }

  function handleChange({ target }) {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  function setNewDoneRecipe(recipe) {
    const date = new Date();
    const doneDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const doneHour = `${date.getHours()}:${date.getMinutes()}`;
    const newDoneRecipe = {
      id: recipe.idMeal ? recipe.idMeal : recipe.idDrink,
      type: recipe.idMeal ? 'comida' : 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.idMeal ? recipe.strMeal : recipe.strDrink,
      image: recipe.idMeal ? recipe.strMealThumb : recipe.strDrinkThumb,
      doneDate: `${doneDate} - ${doneHour}`,
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };
    const newDoneRecipesArray = [...doneRecipes, newDoneRecipe];
    setDoneRecipes(newDoneRecipesArray);
    setLocalStorage('doneRecipes', newDoneRecipesArray);
  }

  function handlerSubmit(e, history) {
    e.preventDefault();
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('user', { email: user.email });
    history.push('/comidas');
  }

  const objValue = {
    meals,
    setMeals,
    isSearching,
    handleSearchClick,
    getMeals,
    getDrinks,
    getMealsFiltered,
    getDrinksFiltered,
    recipes,
    setRecipes,
    isFiltering,
    setIsFiltering,
    filteredMeals,
    setFilteredMeals,
    filteredDrinks,
    setFilteredDrinks,
    favorites,
    setFavorites,
    inProgressRecipes,
    setInProgressRecipes,
    doneRecipes,
    setDoneRecipes,
    setNewDoneRecipe,
    user,
    handleChange,
    disabled,
    handlerSubmit,
    renderFavorites,
    setRender,
  };

  return (
    <myContext.Provider value={ objValue }>
      {children}
    </myContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
