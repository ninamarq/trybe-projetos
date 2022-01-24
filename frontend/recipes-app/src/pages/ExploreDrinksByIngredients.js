import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getDrinksIngredients } from '../services/servicesAPI';
import IngredientCard from '../components/IngredientCard';

export default function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState([]);

  async function fetchAndSetOnState() {
    const cocktailIngredients = await getDrinksIngredients();
    setIngredients(cocktailIngredients);
  }

  useEffect(() => {
    fetchAndSetOnState();
  }, []);

  function renderIngredients() {
    const MAX_INGREDIENTS = 12;
    return ingredients
      .filter((_ing, index) => index < MAX_INGREDIENTS)
      .map(({ strIngredient1 }, index) => (
        <IngredientCard
          key={ index }
          index={ index }
          ingredient={ strIngredient1 }
          imgURL="thecocktaildb"
          urlToLink="bebidas"
        />
      ));
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {renderIngredients()}
      <Footer />
    </div>
  );
}
