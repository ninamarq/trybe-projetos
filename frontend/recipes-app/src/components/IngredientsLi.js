import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import myContext from '../context/myContext';
import { setLocalStorage } from '../services/servicesLocalStorage';

function IngredientsLi({ data }) {
  const { index, ingredientMeasure, checked, info } = data;
  const { type, recipe, inProgress } = info;
  const [checkedBoxes, setCheckedBoxes] = useState({});
  const { inProgressRecipes, setInProgressRecipes } = useContext(myContext);
  const { ingredient, measure } = ingredientMeasure;
  const id = type === 'meal' ? recipe.idMeal : recipe.idDrink;
  const key = type === 'meal' ? 'meals' : 'cocktails';
  // function isChecked() {
  //   if (inProgressRecipes[key] && inProgressRecipes[key][id]) {
  //     return inProgressRecipes[key][id]
  //       .some((ingred) => recipeToRender[ingredient] === ingred);
  //   }
  // }

  function handleCheckboxClick({ target }, ingred) {
    // console.log(target.checked);
    // console.log(ingredient);
    // console.log(checkedBoxes);
    if (inProgressRecipes[key]) {
      const newInProgressRecipes = {
        ...inProgressRecipes,
        [key]: {
          ...inProgressRecipes[key],
          [id]: [...inProgressRecipes[key][id], ingred],
        },
      };
      const newCheckedBoxes = {
        ...checkedBoxes,
        [ingred]: target.checked,
      };
      setCheckedBoxes(newCheckedBoxes);
      setInProgressRecipes(newInProgressRecipes);
      setLocalStorage('inProgressRecipes', newInProgressRecipes);
    }
  }

  if (inProgress) {
    return (
      <li
        data-testid={ `${index}-ingredient-step` }
      >
        <label
          htmlFor={ index }
          // className={ ? 'ingredientDone' : '' }
        >
          <input
            defaultChecked={ checked }
            type="checkbox"
            id={ index }
            onChange={ (e) => handleCheckboxClick(e, recipe[ingredient]) }
          />
          { recipe[ingredient] }
          :
          {' '}
          { recipe[measure] }
        </label>
      </li>
    );
  }
  return (
    <li
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      { recipe[ingredient] }
      :
      {' '}
      { recipe[measure] }
    </li>
  );
}

IngredientsLi.propTypes = {
  data: PropTypes.shape({
    checked: PropTypes.bool,
    index: PropTypes.number.isRequired,
    info: PropTypes.shape({
      inProgress: PropTypes.bool,
      recipe: PropTypes.shape({
        idDrink: PropTypes.string,
        idMeal: PropTypes.string,
      }),
      type: PropTypes.string,
    }).isRequired,
    ingredientMeasure: PropTypes.shape({
      ingredient: PropTypes.string,
      measure: PropTypes.string,
    }),
  }).isRequired,
};

export default IngredientsLi;
