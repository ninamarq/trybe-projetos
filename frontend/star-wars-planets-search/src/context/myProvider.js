import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import myContext from './myContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState({
    filterByName: {
      name: '',
    },
  });
  const [filters, setFilters] = useState({
    filterByNumericValues: {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  });
  const [totalFilters, setAddFilter] = useState({
    filterByNumericValues: [],
  });
  const [columns, setColumns] = useState(
    ['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water'],
  );

  async function getPlanets() {
    const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const planetsObj = data.results;
        // atualizar o estado
        setPlanets(planetsObj);
      });
  }

  // Neste caso, a função será executada similarmente ao `componentDidMount`, rodando apenas uma vez e na montagem do componente. useEffect(()=>{}, []).  (FONTE: COURSE)
  useEffect(() => {
    getPlanets();
  }, []);

  function handleSearchChange(value) {
    setSearch({
      filterByName: {
        name: value,
      },
    });
  }

  function handleFilterChange(id, value) {
    setFilters({
      filterByNumericValues:
        {
          ...filters.filterByNumericValues,
          [id]: value,
        },
    });
  }

  function handleFilterClick() {
    const { column, comparison, value } = filters.filterByNumericValues;
    const filtersArray = [...totalFilters.filterByNumericValues,
      {
        column,
        comparison,
        value,
      }];
    setAddFilter({
      filterByNumericValues: filtersArray,
    });
    const filteredPlanets = planets.filter((planet) => {
      if (comparison === 'maior que') {
        return planet[column] > Number(value);
      } if (comparison === 'menor que') {
        return planet[column] < Number(value);
      } if (comparison === 'igual a') {
        return planet[column] === value;
      }
      return planet;
    });
    setColumns(columns.filter((element) => element !== column));
    setPlanets(filteredPlanets);
  }

  const context = {
    planets,
    search,
    filters,
    columns,
    handleSearchChange,
    handleFilterChange,
    handleFilterClick,
  };

  return (
    <myContext.Provider
      value={ context }
    >
      { children }
    </myContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
