import React, { useContext } from 'react';
import myContext from '../context/myContext';

function Search() {
  const { handleSearchChange } = useContext(myContext);
  return (
    <input
      placeholder="Search planet"
      data-testid="name-filter"
      type="text"
      onChange={ ({ target }) => handleSearchChange(target.value) }
    />
  );
}

export default Search;
