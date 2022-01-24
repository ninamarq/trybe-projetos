import React, { useEffect, useState, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import myContext from '../context/myContext';
import { getAreaOptions, getMeals, getRecipesFromArea } from '../services/servicesAPI';
import RecipeCard from '../components/RecipeCard';

export default function ExploreFoodsByArea() {
  const {
    isFiltering,
    setIsFiltering,
    filteredMeals,
    setFilteredMeals,
  } = useContext(myContext);

  const [options, setOptions] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const optionsArrayWithoutAll = await getAreaOptions();
      const optionsArray = [{ strArea: 'All' }, ...optionsArrayWithoutAll];
      setOptions(optionsArray);
      const recipes = await getMeals();
      setAllRecipes(recipes.meals);
    };
    fetchData();
  }, []);

  async function handleChange({ target }) {
    if (target.value === 'All') {
      setIsFiltering(false);
    } else {
      const filteredByArea = await getRecipesFromArea(target.value);
      setFilteredMeals(filteredByArea);
      setIsFiltering(true);
    }
  }

  const limitRecipes = 11;

  function defaultMeals() {
    return (
      allRecipes.map((meal, index) => (
        index <= limitRecipes && (
          <RecipeCard
            index={ index }
            meal={ meal }
            type="meals"
            key={ index }
          />
        )
      ))
    );
  }

  function filterMeals() {
    return (
      filteredMeals.map((element, index) => (
        index <= limitRecipes && (
          <RecipeCard
            index={ index }
            meal={ element }
            type="meals"
            key={ index }
          />
        )
      )));
  }

  function renderOptions() {
    return options.map(({ strArea }) => (
      <option
        key={ strArea }
        data-testid={ `${strArea}-option` }
        value={ strArea }
      >
        {strArea}
      </option>
    ));
  }

  return (
    <div>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
      >
        {renderOptions()}
      </select>
      { isFiltering ? filterMeals() : defaultMeals() }
      <Footer />
    </div>
  );
}
