import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../context/myContext';
import { getMealsByIngredient, getDrinksByIngredient } from '../services/servicesAPI';

function IngredientCard({ ingredient, index, imgURL, urlToLink }) {
  const {
    setIsFiltering,
    setFilteredMeals,
    setFilteredDrinks,
  } = useContext(myContext);
  const imageURL = `https://www.${imgURL}.com/images/ingredients/${ingredient}-Small.png`;

  async function handleIngredientClick() {
    setIsFiltering(true);
    if (urlToLink === 'comidas') {
      const recipes = await getMealsByIngredient(ingredient);
      setFilteredMeals(recipes);
    } else {
      const recipes = await getDrinksByIngredient(ingredient);
      setFilteredDrinks(recipes);
    }
  }

  return (
    <Link to={ `/${urlToLink}` }>
      <div
        data-testid={ `${index}-ingredient-card` }
        role="button"
        tabIndex={ index }
        onClick={ handleIngredientClick }
        onKeyPress={ handleIngredientClick }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ imageURL }
          alt={ ingredient }
        />
        <p data-testid={ `${index}-card-name` }>
          {ingredient}
        </p>
      </div>
    </Link>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
  urlToLink: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default IngredientCard;
