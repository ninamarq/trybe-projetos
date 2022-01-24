import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import CardDoneRecipe from '../components/CardDoneRecipe';
import Header from '../components/Header';
import myContext from '../context/myContext';
import './css/DoneRecipe.css';
import { getLocalStorage } from '../services/servicesLocalStorage';

export default function DoneRecipes() {
  const { doneRecipes, setDoneRecipes } = useContext(myContext);
  const [recipes, setRecipes] = useState([...doneRecipes]);

  useEffect(() => {
    const previousDoneRecipes = getLocalStorage('doneRecipes');
    setDoneRecipes(previousDoneRecipes);
    setRecipes(previousDoneRecipes);
  }, [setDoneRecipes]);

  function filter(type) {
    const filterRecipe = doneRecipes.filter((recipe) => recipe.type === type);
    setRecipes(filterRecipe);
  }

  return (
    <div>
      <Header title="Receitas Feitas" />
      <section
        className="done-recipe"
      >
        <button
          data-testid="filter-by-all-btn"
          className="filter-btn"
          type="button"
          onClick={ () => setRecipes(doneRecipes) }
        >
          All
        </button>
        <button
          className="filter-btn"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => filter('comida') }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          className="filter-btn"
          onClick={ () => filter('bebida') }
        >
          Drinks
        </button>
      </section>
      <section className="containerCardDone">
        <CardDoneRecipe recipes={ recipes } />
      </section>
    </div>
  );
}

DoneRecipes.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
