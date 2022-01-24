import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getMeals, getCategorys,
  filterCategory } from '../services/servicesAPI';
import RecipeCard from '../components/RecipeCard';
import './css/Foods.css';
import myContext from '../context/myContext';

export default function Foods() {
  const [categorys, setCategorys] = useState([]);
  const [keys, setKeys] = useState(['']);
  const [filter, setFilter] = useState('');
  const {
    meals,
    setMeals,
    recipes,
    isSearching,
    isFiltering,
    setIsFiltering,
    filteredMeals,
    setFilteredMeals,
  } = useContext(myContext);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const resultMeals = await getMeals();
      const resultCategory = await getCategorys(Object.keys(resultMeals)[0]);

      setMeals([...resultMeals.meals]);
      setKeys(Object.keys(resultMeals));
      setCategorys([...resultCategory.meals]);
    };
    fetchData();
  }, [setMeals]);

  async function handleFilter(category) {
    const categoryMeals = await filterCategory(keys[0], category);
    // se o filtro for o mesmo, ele habilita e desabilita,
    if (category !== filter) {
      setIsFiltering(true);
      setFilteredMeals(categoryMeals.meals);
      setFilter(category);
      // se for filtros diferentes, so muda o a renderização
    } else {
      setFilter('');
      setIsFiltering(false);
    }
  }

  useEffect(() => {
    if (!recipes) {
      return global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (recipes.length === 1) {
      const recipeId = recipes[0].idMeal;
      history.push(`/comidas/${recipeId}`);
    } else if (recipes.length > 1) setMeals(recipes);
    else { setMeals([]); }
  }, [recipes, history, isSearching, setMeals]);

  const limitRecipes = 11;
  const limitCategorys = 4;

  function defaultMeals() {
    return (
      meals.map((meal, index) => (
        index <= limitRecipes && (
          <RecipeCard
            index={ index }
            meal={ meal }
            type={ keys[0] }
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
            type={ keys[0] }
            key={ index }
          />
        )
      )));
  }

  function renderCategories() {
    return (
      categorys.map((element, index) => (
        index <= limitCategorys && (
          <section
            key={ element.strCategory }
          >
            <button
              data-testid={ `${element.strCategory}-category-filter` }
              type="button"
              value={ element.strCategory }
              onClick={ () => handleFilter(element.strCategory) }
            >
              { element.strCategory }
            </button>
          </section>
        )
      ))
    );
  }

  return (
    <div>
      <Header title="Comidas" />
      <div className="containerButton">
        <div className="buttonFilter">
          {
            renderCategories()
          }
        </div>
        <section className="buttonFilter">
          <button
            id="buttonAll"
            data-testid="All-category-filter"
            type="button"
            value="All"
            onClick={ () => setIsFiltering(false) }
          >
            All
          </button>
        </section>
      </div>
      <div className="cardRecipe">
        { isFiltering ? filterMeals() : defaultMeals() }
      </div>
      <Footer />
    </div>
  );
}
