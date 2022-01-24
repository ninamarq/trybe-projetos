import React, { useContext } from 'react';
import AllFavorites from '../components/AllFavorites';
import FavoriteFoods from '../components/FavoriteFoods';
import FavoriteDrinks from '../components/FavoriteDrinks';
import FilterButtons from '../components/FilterButtons';
import Header from '../components/Header';
import myContext from '../context/myContext';

export default function FavoriteRecipes() {
  const { renderFavorites } = useContext(myContext);

  function filteringFav() {
    if (renderFavorites === 'all') { return AllFavorites(); }
    if (renderFavorites === 'food') { return FavoriteFoods(); }
    if (renderFavorites === 'drink') { return FavoriteDrinks(); }
  }

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <FilterButtons />
      <section
        style={ { display: 'flex' } }
      >
        {
          filteringFav()
        }
      </section>
    </div>
  );
}
