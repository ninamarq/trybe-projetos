import React, { useContext } from 'react';
import myContext from '../context/myContext';

function renderColumns() {
  const columns = ['Name', 'Rotation Period', 'Orbital Period',
    ' Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL'];
  return (
    <thead>
      <tr>
        {
          columns.map((column) => (
            <th
              key={ column }
            >
              { column }
            </th>
          ))
        }
      </tr>
    </thead>
  );
}

function Table() {
  const { planets, search } = useContext(myContext);
  return (
    <table
      border="1"
    >
      { renderColumns() }
      {
        planets.filter((planet) => (
          planet.name.toLowerCase().includes(search.filterByName.name)
        ))
          .map((planet) => (
            <tr
              key={ planet.name }
            >
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))
      }
    </table>
  );
}

export default Table;
