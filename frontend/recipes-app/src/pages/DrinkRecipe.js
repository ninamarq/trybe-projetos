import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './css/FoodAndDrinkRecipes.css';
import FavoriteAndShare from '../components/FavoriteAndShare';
import CardRecipesSubject from '../components/CardRecipesSubject';
import IngredientsAndMeasure from '../components/IngredientsAndMeasure';
import { getDrinkDetail } from '../services/servicesAPI';
import BtnStarRecipe from '../components/BtnStarRecipe';

export default function DrinkRecipe({ match, history }) {
  const { id } = match.params;
  const [detail, setDetail] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const details = await getDrinkDetail(id);
      setDetail(details);
    };
    fetch();
  }, [id]);

  return (
    <div className="outerContainer">
      <h3
        className="title"
        data-testid="recipe-title"
      >
        { detail.strDrink }
      </h3>
      <p
        className="category"
        data-testid="recipe-category"
      >
        { detail.strAlcoholic }
      </p>
      <img
        src={ detail.strDrinkThumb }
        data-testid="recipe-photo"
        alt={ detail.strDrink }
        width="250px"
      />
      <div className="favoriteAndShare">
        <FavoriteAndShare match={ match } type="bebida" recipe={ detail } />
      </div>
      { Object.keys(detail).length !== 0
        && <IngredientsAndMeasure recipe={ detail } type="drink" /> }
      <CardRecipesSubject type="drink" />
      <p
        className="instructionsP"
        data-testid="instructions"
      >
        { detail.strInstructions }
      </p>
      <BtnStarRecipe recipe={ detail } history={ history } id={ id } type="bebidas" />
    </div>
  );
}

DrinkRecipe.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
