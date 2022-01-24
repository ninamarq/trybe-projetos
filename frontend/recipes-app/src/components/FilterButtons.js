import React, { useContext } from 'react';
import myContext from '../context/myContext';

export default function FilterButtons() {
  const { setRender } = useContext(myContext);
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setRender('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setRender('food') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setRender('drink') }
      >
        Drinks
      </button>
    </div>
  );
}
