import React, { useContext } from 'react';
import myContext from '../context/myContext';

function Filters() {
  const { handleFilterChange, handleFilterClick,
    filters, columns } = useContext(myContext);
  console.log(columns);
  return (
    <form>
      <select
        id="column"
        data-testid="column-filter"
        onChange={ ({ target }) => (
          handleFilterChange(target.id, target.value)
        ) }
      >
        {
          columns.map((column) => (
            <option
              key={ column }
            >
              { column }
            </option>
          ))
        }
      </select>
      <select
        id="comparison"
        data-testid="comparison-filter"
        onChange={ ({ target }) => (
          handleFilterChange(target.id, target.value)
        ) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        id="value"
        type="number"
        data-testid="value-filter"
        value={ filters.filterByNumericValues.value }
        onChange={ ({ target }) => (
          handleFilterChange(target.id, target.value)
        ) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleFilterClick }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
