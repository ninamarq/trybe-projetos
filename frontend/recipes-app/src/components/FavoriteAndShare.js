import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/FavoriteAndShare.css';
import { setLocalStorage, getLocalStorage } from '../services/servicesLocalStorage';
import myContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteAndShare(props) {
  const { match: { params, url }, type, recipe } = props;
  const { favorites, setFavorites } = useContext(myContext);
  const [isSharing, setSharing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  function share() {
    const neededURL = url.split('/');
    navigator.clipboard.writeText(`http://localhost:3000/${neededURL[1]}/${neededURL[2]}`);
    setSharing(true);
  }

  useEffect(() => {
    setFavorites(getLocalStorage('favoriteRecipes'));
    setIsFavorite(getLocalStorage('favoriteRecipes')
      .some((element) => element.id === params.id));
  }, [params, setFavorites]);

  const drinkFav = { id: params.id,
    type,
    area: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb };

  const mealFav = { id: params.id,
    type,
    area: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb };

  function onClick() {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      setFavorites(favorites.filter((element) => element.id !== params.id));
      setLocalStorage('favoriteRecipes',
        favorites.filter((element) => element.id !== params.id));
    } else {
      return (
        type === 'bebida'
          ? (
            setFavorites([...favorites, drinkFav]),
            setLocalStorage('favoriteRecipes', [...getLocalStorage('favoriteRecipes'),
              drinkFav])
          ) : (
            setFavorites([...favorites, mealFav]),
            setLocalStorage('favoriteRecipes', [
              ...getLocalStorage('favoriteRecipes'), mealFav])
          )
      );
    }
  }

  return (
    <div className="innerContainer">
      <input
        type="image"
        alt="share"
        data-testid="share-btn"
        width="30px"
        onClick={ share }
        src={ shareIcon }
      />
      <input
        type="image"
        alt="favorite"
        data-testid="favorite-btn"
        width="30px"
        onClick={ onClick }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      />
      { isSharing && <p>Link copiado!</p> }
    </div>
  );
}

FavoriteAndShare.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  recipe: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};
