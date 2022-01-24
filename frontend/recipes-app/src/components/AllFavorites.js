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

  function unfavorite(recipe) {
    setLocalStorage('favoriteRecipes',
      favoriteRecipes.filter((element) => element.id !== recipe.id));
    setFavorites(favorites.filter((element) => element.id !== recipe.id));
  }

  useEffect(() => {
    setFavorites(getLocalStorage('favoriteRecipes'));
  }, [setFavorites]);

  function share(type, id) {
    navigator.clipboard.writeText(`http://localhost:3000/${type}/${id}`);
    setSharing(true);
  }

  const renderAll = favoriteRecipes.map((recipe, index = 0) => (
    (recipe.type === 'comida') ? (
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
            onClick={ () => unfavorite(recipe) }
            src={ blackHeartIcon }
          />
        </div>
        <spam
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => history.push(`comidas/${recipe.id}`) }
        >
          { recipe.name }
        </spam>
        <p>{ recipe.area }</p>
        <input
          type="image"
          onClick={ () => history.push(`comidas/${recipe.id}`) }
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
    ) : (
      <section
        style={ { border: 'solid 1px', width: '200px', padding: '10px' } }
        data-testid={ `${index}-${recipe.name}-horizontal-tag` }
      >
        <div>
          <input
            type="image"
            src={ shareIcon }
            alt="share"
            data-testid={ `${index}-horizontal-share-btn` }
            width="30px"
            onClick={ () => share('bebidas', recipe.id) }
          />
          <input
            type="image"
            alt="favorite"
            data-testid={ `${index}-horizontal-favorite-btn` }
            width="30px"
            src={ blackHeartIcon }
            onClick={ () => unfavorite(recipe) }
          />
        </div>
        <spam
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => history.push(`bebidas/${recipe.id}`) }
        >
          { recipe.name }
        </spam>
        <p>{ recipe.alcoholicOrNot }</p>
        <input
          type="image"
          onClick={ () => history.push(`bebidas/${recipe.id}`) }
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          width="150px"
          alt={ recipe.name }
        />
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { recipe.alcoholicOrNot }
        </p>
        { isSharing && <p>Link copiado!</p> }
      </section>
    )
  ));
  return renderAll;
}
