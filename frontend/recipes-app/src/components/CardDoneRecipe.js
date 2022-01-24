import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import './css/cardDoneRecipe.css';

export default function CardDoneRecipe({ recipes }) {
  const [isSharingDrink, setSharingDrink] = useState(false);
  const [isSharingMeal, setSharingMeal] = useState(false);
  const history = useHistory();

  function shareMeal(id) {
    navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
    setSharingMeal(true);
  }
  function shareDrink(id) {
    navigator.clipboard.writeText(`http://localhost:3000/bebidas/${id}`);
    setSharingDrink(true);
  }

  function cardMeal(recipe, index) {
    return (
      <>
        <input
          data-testid={ `${index}-horizontal-image` }
          type="image"
          width="150px"
          src={ recipe.image }
          alt={ recipe.name }
          onClick={ () => history.push(`/comidas/${recipe.id}`) }
        />
        <spam
          type="button"
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => history.push(`/comidas/${recipe.id}`) }
        >
          { recipe.name }
        </spam>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${recipe.area} - ${recipe.category}` }
        </p>
        <h3 data-testid={ `${index}-horizontal-done-date` }>
          { recipe.doneDate }
        </h3>
        <input
          type="image"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="button share"
          onClick={ () => shareMeal(recipe.id) }
        />
        { isSharingMeal && <p>Link copiado!</p> }
        {
          recipe.tags.map(
            (tag, i) => (
              (i < 2) && (
                <h3
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </h3>)),
          )
        }
      </>
    );
  }

  function cardDrink(recipe, index) {
    return (
      <>
        <input
          type="image"
          data-testid={ `${index}-horizontal-image` }
          width="150px"
          src={ recipe.image }
          alt={ recipe.name }
          onClick={ () => history.push(`/bebidas/${recipe.id}`) }
        />
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { recipe.alcoholicOrNot }
        </p>
        <button
          type="button"
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => history.push(`/bebidas/${recipe.id}`) }
        >
          { recipe.name }

        </button>
        <h3 data-testid={ `${index}-horizontal-done-date` }>
          { recipe.doneDate }
        </h3>
        <input
          type="image"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="button share"
          onClick={ () => shareDrink(recipe.id) }
        />
        { isSharingDrink && <p>Link copiado!</p> }
      </>
    );
  }
  return (
    <div className="all-cards">
      {
        recipes.map((recipe, index) => (
          <div className="container-card-done" key={ index }>
            {
              recipe.type === 'comida'
                ? cardMeal(recipe, index)
                : cardDrink(recipe, index)
            }
          </div>
        ))
      }

    </div>
  );
}

CardDoneRecipe.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
