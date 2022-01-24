import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getMealsIngredients } from '../services/servicesAPI';
import IngredientCard from '../components/IngredientCard';

export default function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);

  async function fetchAndSetOnState() {
    const foodIngredients = await getMealsIngredients();
    setIngredients(foodIngredients);
  }

  useEffect(() => {
    fetchAndSetOnState();
  }, []);

  function renderIngredients() {
    const MAX_INGREDIENTS = 12;
    return ingredients
      .filter((_ing, index) => index < MAX_INGREDIENTS)
      .map(({ strIngredient }, index) => (
        <IngredientCard
          key={ index }
          index={ index }
          ingredient={ strIngredient }
          imgURL="themealdb"
          urlToLink="comidas"
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
