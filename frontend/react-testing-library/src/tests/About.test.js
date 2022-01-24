import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import App from '../App';

test('Verifica se a página contém as informações sobre a Pokédex', () => {
  const customHistory = createMemoryHistory();
  // quando passado como props, vamos conseguir controlar a navegação
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  // navegando para a pagina 'about'
  customHistory.push('/about');
  // pegando infos
  const info = screen.getByText(
    'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons'
    ,
  );
  const info2 = screen.getByText(
    'One can filter Pokémons by type, and see more details for each one of them',
  );
  expect(info).toBeInTheDocument();
  expect(info2).toBeInTheDocument();
});

test('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
  const customHistory = createMemoryHistory();
  // quando passado como props, vamos conseguir controlar a navegação
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  // navegando para a pagina 'about'
  customHistory.push('/about');
  // pegando o heading e verificando se ele aparece
  const aboutHeading = screen.getByRole('heading', {
    name: 'About Pokédex',
  });
  expect(aboutHeading).toBeInTheDocument();
});

test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const customHistory = createMemoryHistory();
  // quando passado como props, vamos conseguir controlar a navegação
  // container visto durante mentoria com André
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  // navegando para a pagina 'about'
  customHistory.push('/about');
  // pegar os textos com 'pokemons'
  const infoArray = [];
  const info = screen.getByText(
    'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons'
    ,
  );
  const info2 = screen.getByText(
    'One can filter Pokémons by type, and see more details for each one of them',
  );
  infoArray.push(info, info2);
  expect(infoArray).toHaveLength(2);
});

test('Verifica se a página contém a seguinte imagem de uma Pokédex', () => {
  const customHistory = createMemoryHistory();
  // quando passado como props, vamos conseguir controlar a navegação
  // container visto durante mentoria com André
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  // navegando para a pagina 'about'
  customHistory.push('/about');
  // pegando imagem da pokedex
  const pokedexImg = screen.getByRole('img', {
    name: 'Pokédex',
  });
  expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
