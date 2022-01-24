import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import FavoriteAndShare from '../components/FavoriteAndShare';
import './css/FoodAndDrinkRecipes.css';
import CardRecipesSubject from '../components/CardRecipesSubject';
import IngredientsAndMeasure from '../components/IngredientsAndMeasure';
import { getFoodDetail } from '../services/servicesAPI';
import BtnStarRecipe from '../components/BtnStarRecipe';

export default function FoodRecipe({ match, history }) {
  const { id } = match.params;
  const [detail, setDetail] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const details = await getFoodDetail(id);
      setDetail(details);
    };
    fetch();
  }, [id]);

  const srcVideo = detail.strYoutube || ''; // corrige tag video de acordo com codigo https://github.com/tryber/sd-015-b-project-recipes-app/blob/main-group-27-dia-6/src/pages/Alimento.js

  return (
    <div className="outerContainer">
      <h3
        className="title"
        data-testid="recipe-title"
      >
        { detail.strMeal }
      </h3>
      <p
        className="category"
        data-testid="recipe-category"
      >
        { detail.strCategory }
      </p>
      <img
        src={ detail.strMealThumb }
        data-testid="recipe-photo"
        alt={ detail.strMeal }
        width="250px"
      />
      <div className="favoriteAndShare">
        <FavoriteAndShare
          match={ match }
          type="comida"
          recipe={ detail }
        />
      </div>
      { Object.keys(detail).length !== 0
        && <IngredientsAndMeasure recipe={ detail } type="meal" /> }

      <iframe
        data-testid="video"
        src={ srcVideo.replace('watch?v=', 'embed/') }
        title="YouTube video player"
      />
      <CardRecipesSubject type="meal" />
      <p
        data-testid="instructions"
        className="instructionsP"
      >
        { detail.strInstructions }
      </p>
      <BtnStarRecipe recipe={ detail } history={ history } id={ id } type="comidas" />
    </div>
  );
}

FoodRecipe.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
