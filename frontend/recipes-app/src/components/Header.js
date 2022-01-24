import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import './css/Header.css';
import { useHistory } from 'react-router-dom';
import myContext from '../context/myContext';
import cookingHeader from '../images/cookingHeader.svg';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.png';

function Header({ title }) {
  const history = useHistory();
  const { isSearching, handleSearchClick,
    getMealsFiltered, getDrinksFiltered, setRecipes } = useContext(myContext);

  const [inputsValue, setInput] = useState({
    recipe: '',
    type: '',
  });

  async function selectAPI() {
    let recipes = [];
    if (title === 'Comidas') {
      recipes = await getMealsFiltered(inputsValue.type, inputsValue.recipe);
    }
    if (title === 'Bebidas') {
      recipes = await getDrinksFiltered(inputsValue.type, inputsValue.recipe);
    }
    setRecipes(recipes);
  }

  function handleChange({ target }) {
    setInput({
      ...inputsValue,
      [target.name]: target.value,
    });
  }

  const searchBar = (
    <section className="search-bar">
      <input
        className="search-input"
        type="text"
        data-testid="search-input"
        placeholder="Digite um prato"
        name="recipe"
        onChange={ handleChange }
      />
      <label className="filter-text" htmlFor="ingrediente">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="type"
          id="ingrediente"
          value="ingrediente"
          onChange={ handleChange }
        />
        Ingrediente
      </label>
      <label className="filter-text" htmlFor="nome">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="type"
          id="nome"
          value="nome"
          onChange={ handleChange }
        />
        Nome
      </label>
      <label className="filter-text" htmlFor="primeira-letra">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="type"
          id="primeira-letra"
          value="primeira-letra"
          onChange={ handleChange }
        />
        Primeira Letra
      </label>
      <button
        type="button"
        className="exec-search-btn"
        data-testid="exec-search-btn"
        onClick={ selectAPI }
      >
        Buscar
      </button>
    </section>
  );

  const searchBtn = (
    <input
      className="search-icon"
      data-testid="search-top-btn"
      type="image"
      alt="search-icon"
      onClick={ handleSearchClick }
      src={ searchIcon }
    />
  );

  function showSearchBtn() {
    if (title === 'Explorar Origem') return searchBtn;
    if (title === 'Receitas Feitas') return null;
    if (title === 'Receitas Favoritas') return null;
    if (title === 'Perfil') return null;
    return title.includes('Explorar') ? null : searchBtn;
  }

  return (
    <header>
      <section className="main-header">
        <div className="title-container">
          <img className="cooking-icon" src={ cookingHeader } alt="cooking" />
          <h1
            className="page-title"
            data-testid="page-title"
          >
            { title }
          </h1>
        </div>
        <div className="search-and-profile">
          <button
            className="profile-button"
            data-testid="profile-top-btn"
            type="button"
            onClick={ () => history.push('/perfil') }
          >
            <img
              className="profile-icon"
              src={ profileIcon }
              alt="profile-icon"
            />
          </button>
          { showSearchBtn() }
        </div>
      </section>
      { isSearching && searchBar }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
