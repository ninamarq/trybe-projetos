import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import './css/IngredientsAndMeasure.css';
import myContext from '../context/myContext';
import { setLocalStorage, getLocalStorage } from '../services/servicesLocalStorage';
import LiAndCheckboxGenerator from './LiAndCheckboxGenerator';

export default function IngredientsAndMeasure(props) {
  const { recipe, type, inProgress = false } = props;
  const id = type === 'meal' ? recipe.idMeal : recipe.idDrink;
  const key = type === 'meal' ? 'meals' : 'cocktails';
  const { setInProgressRecipes } = useContext(myContext);
  // const limitIndexMeal = 20;
  // const limitIndexDrink = 15;

  // useEffect(() => {
  //   const newInProgressRecipes = {
  //     ...inProgressRecipes,
  //     [key]: {
  //       ...inProgressRecipes[key],
  //       [id]: [],
  //     },
  //   };
  //   setInProgressRecipes(newInProgressRecipes);
  //   setLocalStorage('inProgressRecipes', newInProgressRecipes);
  // }, [id, inProgressRecipes, key, setInProgressRecipes]);

  useEffect(() => {
    if (inProgress) {
      const previousInProgressRecipes = getLocalStorage('inProgressRecipes');

      const actualInProgressRecipes = Array.isArray(previousInProgressRecipes)
        ? {} : previousInProgressRecipes;

      let newArray = [];

      if (actualInProgressRecipes[key] && actualInProgressRecipes[key][id]) {
        newArray = actualInProgressRecipes[key][id];
      }

      const newInProgressRecipes = {
        ...actualInProgressRecipes,
        [key]: {
          ...actualInProgressRecipes[key],
          [id]: newArray,
        },
      };

      setInProgressRecipes(newInProgressRecipes);
      setLocalStorage('inProgressRecipes', newInProgressRecipes);
    }
  }, [id, key, setInProgressRecipes, inProgress]);

  // useEffect(() => {
  //   async function setThingsRight() {
  //     const newInProgressRecipes = {
  //       ...inProgressRecipes,
  //       [key]: {
  //         ...inProgressRecipes[key],
  //         [id]: [],
  //       },
  //     };
  //     setLocalStorage('inProgressRecipes', newInProgressRecipes);

  //     const previousInProgressRecipes = await getLocalStorage('inProgressRecipes');
  //     setInProgressRecipes(previousInProgressRecipes);
  //   }
  //   setThingsRight();
  // }, [id, key, inProgressRecipes, setInProgressRecipes]);

  // function handleCheckboxClick(ingredient) {
  //   if (inProgressRecipes[key]) {
  //     const newInProgressRecipes = {
  //       ...inProgressRecipes,
  //       [key]: {
  //         ...inProgressRecipes[key],
  //         [id]: [...inProgressRecipes[key][id], ingredient],
  //       },
  //     };
  //     setInProgressRecipes(newInProgressRecipes);
  //     setLocalStorage('inProgressRecipes', newInProgressRecipes);
  //   }
  // }

  // function liOrCheckbox(index, recipeToRender, ingredient, measure) {
  //   function isChecked() {
  //     if (inProgressRecipes[key] && inProgressRecipes[key][id]) {
  //         .some((ingred) => recipeToRender[ingredient] === ingred));
  //       return inProgressRecipes[key][id]
  //         .some((ingred) => recipeToRender[ingredient] === ingred);
  //     }
  //   }

  //   if (inProgress) {
  //     return (
  //       <li
  //         key={ index }
  //         data-testid={ `${index}-ingredient-step` }
  //       >
  //         <label
  //           htmlFor={ index }
  //           className={ isChecked() ? 'ingredientDone' : '' }
  //         >
  //           <input
  //             type="checkbox"
  //             checked={ isChecked() }
  //             id={ index }
  //             key={ index }
  //             onChange={ () => handleCheckboxClick(recipeToRender[ingredient]) }
  //           />
  //           { recipeToRender[ingredient] }
  //           :
  //           {' '}
  //           { recipeToRender[measure] }
  //         </label>
  //       </li>
  //     );
  //   }
  //   return (
  //     <li
  //       data-testid={ `${index}-ingredient-name-and-measure` }
  //       key={ index }
  //     >
  //       { recipeToRender[ingredient] }
  //       :
  //       {' '}
  //       { recipeToRender[measure] }
  //     </li>
  //   );
  // }

  function getDrinkIngredients() {
    return (<LiAndCheckboxGenerator info={ { recipe, type, inProgress } } />);
  }

  function getMealIngredients() {
    return (<LiAndCheckboxGenerator info={ { recipe, type, inProgress } } />);
  }

  // function getMealIngredients() {
  //   return (
  //     Object.keys(recipe).map((_key, index) => {
  //       const ingredient = `strIngredient${index + 1}`;
  //       const measure = `strMeasure${index + 1}`;
  //       const mealVerify = (index < limitIndexMeal)
  //       && (
  //         (recipe[ingredient]) && liOrCheckbox(index, recipe, ingredient, measure)
  //       );
  //       return mealVerify;
  //     }));
  // }

  // return (type === 'drink' ? getDrinkIngredients() : getMealIngredients());
  return (
    <div>
      <h3 className="ingredientStyle">Ingredientes:</h3>
      <ol className="list">
        { type === 'drink' ? getDrinkIngredients() : getMealIngredients() }
      </ol>
    </div>
  );
}

IngredientsAndMeasure.propTypes = {
  inProgress: PropTypes.bool,
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

IngredientsAndMeasure.defaultProps = {
  inProgress: false,
};
