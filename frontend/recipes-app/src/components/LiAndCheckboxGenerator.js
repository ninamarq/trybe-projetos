import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';
// import { setLocalStorage } from '../services/servicesLocalStorage';
import IngredientsLi from './IngredientsLi';

function LiAndCheckboxGenerator({ info }) {
  const { recipe, type, inProgress } = info;
  const { inProgressRecipes } = useContext(myContext);
  // const [checkedBoxes, setCheckedBoxes] = useState({});
  const id = type === 'meal' ? recipe.idMeal : recipe.idDrink;
  const key = type === 'meal' ? 'meals' : 'cocktails';
  const limitIndexMeal = 20;
  const limitIndexDrink = 15;

  // function handleCheckboxClick({ target }, ingredient) {
  //   // console.log(target.checked);
  //   // console.log(ingredient);
  //   // console.log(checkedBoxes);
  //   if (inProgressRecipes[key]) {
  //     const newInProgressRecipes = {
  //       ...inProgressRecipes,
  //       [key]: {
  //         ...inProgressRecipes[key],
  //         [id]: [...inProgressRecipes[key][id], ingredient],
  //       },
  //     };
  //     const newCheckedBoxes = {
  //       ...checkedBoxes,
  //       [ingredient]: target.checked,
  //     };
  //     setCheckedBoxes(newCheckedBoxes);
  //     setInProgressRecipes(newInProgressRecipes);
  //     setLocalStorage('inProgressRecipes', newInProgressRecipes);
  //   }
  // }

  // function teste() {
  // console.log(recipe[ingredient]);
  //   return true;
  // }

  // function liOrCheckbox(index, recipeToRender, ingredientMeasure, checked) {
  //   const { ingredient, measure } = ingredientMeasure;
  //   // function isChecked() {
  //   //   if (inProgressRecipes[key] && inProgressRecipes[key][id]) {
  //   //     return inProgressRecipes[key][id]
  //   //       .some((ingred) => recipeToRender[ingredient] === ingred);
  //   //   }
  //   // }
  //   if (inProgress) {
  //     console.log(checked);
  //     return (
  //       <li
  //         key={ index }
  //         data-testid={ `${index}-ingredient-step` }
  //       >
  //         <label
  //           htmlFor={ index }
  //           // className={ ? 'ingredientDone' : '' }
  //         >
  //           <input
  //             defaultChecked={ checked }
  //             type="checkbox"
  //             id={ index }
  //             key={ index }
  //             onChange={ (e) => handleCheckboxClick(e, recipeToRender[ingredient]) }
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

  function render() {
    if (type === 'meal') {
      return (
        Object.keys(recipe).map((_key, index) => {
          const ingredient = `strIngredient${index + 1}`;
          const measure = `strMeasure${index + 1}`;
          const ingredientMeasure = { ingredient, measure };
          let checked = false;
          if (inProgress && inProgressRecipes[key] && inProgressRecipes[key][id]
            && inProgressRecipes[key][id].includes(recipe[ingredient])) {
            checked = true;
          }
          const values = { index, recipe, ingredientMeasure, checked, info };
          const mealVerify = (index < limitIndexMeal)
            && (
              (recipe[ingredient])
              && <IngredientsLi key={ index } data={ values } />
            );
          return mealVerify;
        }));
    }
    return Object.keys(recipe).map((_key, index) => {
      const ingredient = `strIngredient${index + 1}`;
      const measure = `strMeasure${index + 1}`;
      const ingredientMeasure = { ingredient, measure };
      let checked = false;
      if (inProgress && inProgressRecipes[key] && inProgressRecipes[key][id]
        && inProgressRecipes[key][id].includes(recipe[ingredient])) {
        checked = true;
      }
      const values = { index, recipe, ingredientMeasure, checked, info };
      const drinkVerify = (index < limitIndexDrink)
        && (
          (recipe[ingredient])
          && <IngredientsLi key={ index } data={ values } />
        );
      return drinkVerify;
    });
  }

  return (
    <div>
      {render()}
    </div>
  );
}

LiAndCheckboxGenerator.propTypes = {
  info: PropTypes.shape().isRequired,
};

// LiAndCheckboxGenerator.defaultProps = {
//   inProgress: false,
// };

export default LiAndCheckboxGenerator;
