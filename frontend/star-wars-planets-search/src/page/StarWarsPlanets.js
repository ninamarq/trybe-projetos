import React from 'react';
import Filters from '../components/Filters';
import Search from '../components/Search';
import Table from '../components/Table';

function StarWarsPlanets() {
  return (
    <>
      <Search />
      <Filters />
      <Table />
    </>
  );
}

export default StarWarsPlanets;
