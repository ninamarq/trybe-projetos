import React from 'react';
import './css/Footer.css';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <input
        data-testid="drinks-bottom-btn"
        type="image"
        alt="drinks button"
        onClick={ () => history.push('/bebidas') }
        src={ drinkIcon }
      />
      <input
        data-testid="explore-bottom-btn"
        type="image"
        alt="explore button"
        onClick={ () => history.push('/explorar') }
        src={ exploreIcon }
      />
      <input
        data-testid="food-bottom-btn"
        type="image"
        alt="food button"
        onClick={ () => history.push('/comidas') }
        src={ mealIcon }
      />
    </footer>
  );
}

export default Footer;
