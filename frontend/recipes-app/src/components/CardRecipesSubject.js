import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './css/CardRecipesSubject.css';
import { getRecomendationCard } from '../services/servicesAPI';

export default function CardRecipesSubject({ type }) {
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const details = await getRecomendationCard(type);
      setSubject(details);
    };
    fetch();
  }, [type]);

  const maxRec = 6;

  return (
    <div>
      <h1 className="subjectTitle">Recomendados</h1>
      <section style={ { overflow: 'auto', width: '300px', display: 'flex' } }>
        {
          subject.map((recipe, index) => (
            index < maxRec
        && (
          <div key={ index } data-testid={ `${index}-recomendation-card` }>
            <input
              type="image"
              alt="sujested-recipe"
              width="160px"
              src={ type === 'drink' ? recipe.strMealThumb : recipe.strDrinkThumb }
            />
            <p>{ type === 'drink' ? recipe.strCategory : recipe.strAlcoholic }</p>
            <h2
              data-testid={ `${index}-recomendation-title` }
            >
              { type === 'drink' ? recipe.strMeal : recipe.strDrink }

            </h2>
          </div>
        )))
        }
      </section>

    </div>
  );
}

CardRecipesSubject.propTypes = {
  type: PropTypes.string.isRequired,
};
