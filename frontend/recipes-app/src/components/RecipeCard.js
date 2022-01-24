import PropTypes from 'prop-types';
import React from 'react';
import './css/RecipeCard.css';
import { useHistory } from 'react-router-dom';

export default function RecipeCard({ index, meal, type }) {
  const history = useHistory();
  return type === 'meals' ? (
    <button
      className="main"
      type="button"
      onClick={ () => history.push(`/comidas/${meal.idMeal}`) }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        alt={ `${meal.strMeal}` }
        src={ `${meal.strMealThumb}` }
      />
      <div className="cardName">
        <h4
          data-testid={ `${index}-card-name` }
        >
          { meal.strMeal }
        </h4>
      </div>
    </button>
  ) : (
    <button
      className="main"
      type="button"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`/bebidas/${meal.idDrink}`) }
    >
      <img
        data-testid={ `${index}-card-img` }
        alt={ `${meal.strDrink}` }
        src={ `${meal.strDrinkThumb}` }
      />
      <h4
        data-testid={ `${index}-card-name` }
      >
        { meal.strDrink }
      </h4>
    </button>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};
