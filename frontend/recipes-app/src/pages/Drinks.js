import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getDrinks, getCategorys, filterCategory } from '../services/servicesAPI';
import RecipeCard from '../components/RecipeCard';
import './css/Drinks.css';
import myContext from '../context/myContext';

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [keys, setKeys] = useState(['']);
  const [categorys, setCategorys] = useState([]);
  const [filter, setFilter] = useState('');
  const history = useHistory();
  const {
    recipes,
    isSearching,
    isFiltering,
    setIsFiltering,
    filteredDrinks,
    setFilteredDrinks,
  } = useContext(myContext);

  useEffect(() => {
    const fetchData = async () => {
      const resultDrinks = await getDrinks();
      const resultCategory = await getCategorys(Object.keys(resultDrinks)[0]);

      setDrinks([...resultDrinks.drinks]);
      setKeys(Object.keys(resultDrinks));
      setCategorys([...resultCategory.drinks]);
    };
    fetchData();
  }, []);

  async function handleFilter(category) {
    const categoryDrinks = await filterCategory(keys[0], category);
    // se o filtro for o mesmo, ele habilita e desabilita,
    if (category !== filter) {
      setIsFiltering(true);
      setFilteredDrinks([...categoryDrinks.drinks]);
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
      const recipeId = recipes[0].idDrink;
      history.push(`/bebidas/${recipeId}`);
    } else if (recipes.length > 1) setDrinks(recipes);
    else { setDrinks([]); }
  }, [recipes, history, isSearching]);

  const limitRecipes = 11;
  const limitCategorys = 4;

  function defaultDrinks() {
    return (
      drinks.map((meal, index) => (
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

  function filterDrinks() {
    return (
      filteredDrinks.map((element, index) => (
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
            className="button"
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
      <Header title="Bebidas" />
      <div className="containerButton">
        <section className="buttonFilter">
          {
            renderCategories()
          }
        </section>
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
        { !isFiltering ? defaultDrinks() : filterDrinks() }
      </div>
      <Footer />
    </div>

  );
}
