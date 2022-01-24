import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import myContext from '../context/myContext';
import { getLocalStorage } from '../services/servicesLocalStorage';

export default function BtnStarRecipe({ history, id, type }) {
  const {
    inProgressRecipes,
    setInProgressRecipes,
    doneRecipes,
    setDoneRecipes,
  } = useContext(myContext);
  const key = type === 'comidas' ? 'meals' : 'cocktails';

  useEffect(() => {
    const previousInProgressRecipes = getLocalStorage('inProgressRecipes');
    setInProgressRecipes(previousInProgressRecipes);
    const previousDoneRecipes = getLocalStorage('doneRecipes');
    setDoneRecipes(previousDoneRecipes);
  }, [setInProgressRecipes, setDoneRecipes]);

  // function makeIngredientsArray() {
  //   const ingredientsArray = [];
  //   const MAX_INGREDIENTS = 20;
  //   for (let index = 1; index <= MAX_INGREDIENTS; index += 1) {
  //     const ingredient = `strIngredient${index}`;
  //     if (recipe[ingredient] !== '') {
  //       ingredientsArray.push(recipe[ingredient]);
  //     }
  //   }
  //   return ingredientsArray;
  // }

  function startRecipe() {
    history.push(`/${type}/${id}/in-progress`);
  }

  function buttonText() {
    if (inProgressRecipes[key]) {
      return inProgressRecipes[key][id]
        ? 'Continuar Receita'
        : 'Iniciar Receita';
    }
    return 'Iniciar Receita';
  }

  return (
    <button
      className="startBtn"
      hidden={ doneRecipes.some((doneRecipe) => doneRecipe.id === id) }
      type="button"
      data-testid="start-recipe-btn"
      onClick={ startRecipe }
    >
      { buttonText() }
    </button>
  );
}

BtnStarRecipe.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
