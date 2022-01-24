import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setLocalStorage, getLocalStorage } from '../services/servicesLocalStorage';
import myContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function AllFavorites() {
  const { favorites, setFavorites } = useContext(myContext);
  const [isSharing, setSharing] = useState(false);
  const favoriteRecipes = getLocalStorage('favoriteRecipes');
  const history = useHistory();
  const filteredFoods = favoriteRecipes.filter((element) => element.type === 'comida');

  function share(type, id) {
    navigator.clipboard.writeText(`http://localhost:3000/${type}/${id}`);
    setSharing(true);
  }

  useEffect(() => {
    setFavorites(getLocalStorage('favoriteRecipes'));
  }, [setFavorites]);

  const renderFoods = filteredFoods.map((recipe, index) => (
    <section
      style={ { border: 'solid 1px', width: '200px', padding: '10px' } }
      key={ recipe.id }
      data-testid={ `${index}-${recipe.name}-horizontal-tag` }
    >
      <div>
        <input
          type="image"
          src={ shareIcon }
          alt="share"
          data-testid={ `${index}-horizontal-share-btn` }
          width="30px"
          onClick={ () => share('comidas', recipe.id) }
        />
        <input
          type="image"
          alt="favorite"
          data-testid={ `${index}-horizontal-favorite-btn` }
          width="30px"
          src={ blackHeartIcon }
          onClick={ () => {
            setLocalStorage('favoriteRecipes',
              favoriteRecipes.filter((element) => element.id !== recipe.id));
            setFavorites(favorites.filter((element) => element.id !== recipe.id));
          } }
        />
      </div>
      <spam
        data-testid={ `${index}-horizontal-name` }
        onClick={ () => history.push(`/comidas/${recipe.id}`) }
      >
        { recipe.name }
      </spam>
      <p>{ recipe.area }</p>
      <input
        type="image"
        onClick={ () => history.push(`/comidas/${recipe.id}`) }
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        width="150px"
        alt={ recipe.name }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { recipe.area }
        { ' ' }
        -
        { ' ' }
        { recipe.category }
      </p>
      { isSharing && <p>Link copiado!</p> }
    </section>
  ));
  return renderFoods;
}
