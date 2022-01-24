import React from 'react';
import { useHistory } from 'react-router-dom';
import { randomRecipe } from '../services/servicesAPI';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFoods() {
  const history = useHistory();

  async function getRandomFoods() {
    const recipe = await randomRecipe('meal');
    history.push(`/comidas/${recipe[0].idMeal}`);
  }

  return (
    <div>
      <Header title="Explorar Comidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => { history.push('/explorar/comidas/ingredientes'); } }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => { history.push('/explorar/comidas/area'); } }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getRandomFoods }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
