import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';
import { getDrinkDetail } from '../services/servicesAPI';
import { getLocalStorage } from '../services/servicesLocalStorage';
import IngredientsAndMeasure from '../components/IngredientsAndMeasure';
import FavoriteAndShare from '../components/FavoriteAndShare';

export default function DrinkProgress({ match }) {
  const history = useHistory();
  const {
    setNewDoneRecipe,
    setDoneRecipes,
    inProgressRecipes,
  } = useContext(myContext);
  const [details, setDetails] = useState({});
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    const previousDoneRecipes = getLocalStorage('doneRecipes');
    setDoneRecipes(previousDoneRecipes);
  }, [setDoneRecipes]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const recipeDetails = await getDrinkDetail(id);
      setDetails(recipeDetails);
    };
    fetchRecipeDetails();
  }, [id]);

  function disableFinishBtn() {
    const ingredientsArray = [];
    const MAX_INGREDIENTS = 15;
    for (let index = 1; index <= MAX_INGREDIENTS; index += 1) {
      const ingredient = `strIngredient${index}`;
      if (details[ingredient] && details[ingredient] !== '') {
        ingredientsArray.push(details[ingredient]);
      }
    }
    console.log(inProgressRecipes);
    if (inProgressRecipes.cocktails && inProgressRecipes.cocktails[id]) {
      return inProgressRecipes.cocktails[id].length !== ingredientsArray.length;
    }
    return true;
  }

  function handleFinishBtnClick() {
    setNewDoneRecipe(details);
    history.push('/receitas-feitas');
  }

  return (
    <div className="outerContainer">
      <h1 data-testid="recipe-title" className="title">
        { details.strDrink }
      </h1>
      <p data-testid="recipe-category" className="category">
        { details.strAlcoholic }
      </p>
      <img
        src={ details.strDrinkThumb }
        width="250px"
        alt={ details.strDrink }
        data-testid="recipe-photo"
      />
      <div className="favoriteAndShare">
        <FavoriteAndShare match={ match } type="bebida" recipe={ details } />
      </div>
      { Object.keys(details).length !== 0
        && <IngredientsAndMeasure recipe={ details } type="drink" inProgress /> }
      <p data-testid="instructions" className="instructionsP">
        { details.strInstructions }
      </p>
      <button
        className="startBtn"
        disabled={ disableFinishBtn() }
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleFinishBtnClick }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

DrinkProgress.propTypes = {
  match: PropTypes.shape().isRequired,
};
