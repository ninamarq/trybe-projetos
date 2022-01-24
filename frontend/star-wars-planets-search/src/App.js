import React from 'react';
import './App.css';
import Provider from './context/myProvider';
import starlogo from './img/starwars-logo.png';
import StarWarsPlanets from './page/StarWarsPlanets';

function App() {
  return (
    <Provider>
      <header>
        <h1> Star Wars Planets Search</h1>
        <img
          src={ starlogo }
          alt="logo-starwars"
          width="200px"
        />
      </header>
      <StarWarsPlanets />
    </Provider>
  );
}

export default App;
