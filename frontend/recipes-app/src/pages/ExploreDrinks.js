import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { randomRecipe } from '../services/servicesAPI';

export default function ExploreDrinks() {
  const history = useHistory();

  async function getRandomDrink() {
    const recipe = await randomRecipe('drink');
    history.push(`/bebidas/${recipe[0].idDrink}`);
  }

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => { history.push('/explorar/bebidas/ingredientes'); } }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getRandomDrink }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
