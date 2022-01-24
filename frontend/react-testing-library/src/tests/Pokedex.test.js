import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Verifica se página contém um heading h2 com o texto Encountered pokémons', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pega heading e verifica se esta na pagina
  const encounteredTitle = screen.getByRole('heading', {
    level: 2,
  });
  expect(encounteredTitle).toHaveTextContent('Encountered pokémons');
  expect(encounteredTitle).toBeInTheDocument();
});

test('Verifica se é exibido o próximo Pokémon da lista', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pega pokemon name
  const pokeTitle = screen.getByTestId(/pokemon-name/i);
  // pega o valor dele e armazena num array
  const pokesArray = [];
  // console.log(pokeTitle.textContent) = pikachu
  pokesArray.push(pokeTitle.textContent);
  // clica em prox pokemon
  const nextPoke = screen.getByTestId('next-pokemon');
  userEvent.click(nextPoke);
  // pega o nome do prox pokemon
  pokesArray.push(pokeTitle.textContent);
  // compara os dois valores da array
  const comparingPokes = pokesArray[0] === pokesArray[1];
  expect(comparingPokes).toBe(false);
});

test('Verifica se é mostrado apenas um Pokémon por vez', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pega pokemon name
  const pokeTitle = screen.getAllByTestId('pokemon-name');
  expect(pokeTitle).toHaveLength(1);
});

test('Verifica se a Pokédex tem os botões de filtro.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pega botao All
  const allButton = screen.getByRole('button', {
    name: 'All',
  });
  expect(allButton).toBeInTheDocument();
  // pega botoes de filtro
  const filterButtons = screen.getAllByTestId('pokemon-type-button');
  // filtrando o texto contido nos botoes, pois ele vem como objeto html.
  const typeButtons = filterButtons.map((button) => button.textContent);
  let duplicateType = false;
  duplicateType = typeButtons.some((button, index) => (
    typeButtons.indexOf(button) !== index
  ));
  expect(duplicateType).toBe(false);
  // checando os filtros
  // pega o valor dele e armazena num array
  const pokeName = screen.getByTestId('pokemon-name');
  const pokesArray = [];
  // console.log(pokeName.textContent) = pikachu
  pokesArray.push(pokeName.textContent);
  // clica em fire
  const poisonButton = screen.getByRole('button', {
    name: 'Poison',
  });
  userEvent.click(poisonButton);
  pokesArray.push(pokeName.textContent);
  const comparingPokes = pokesArray[0] === pokesArray[1];
  // console.log(pokesArray) = ekkans aparece
  expect(comparingPokes).toBe(false);

  // verificando tipo do pokeon e button
  const typePoke = screen.getByTestId('pokemon-type');
  const comparingButtonType = poisonButton.textContent === typePoke.textContent;
  expect(comparingButtonType).toBe(true);
});

test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // all
  const allButton = screen.getByRole('button', {
    name: 'All',
  });
  // criando armazenamento
  const pokemonsTypes = [];
  // pgando tipo do primeiro poke
  userEvent.click(allButton);
  const pokeType = screen.getByTestId('pokemon-type');
  pokemonsTypes.push(pokeType.textContent);
  // clicando em prox poke
  const nextPoke = screen.getByTestId('next-pokemon');
  userEvent.click(nextPoke);
  // pega o tipo do prox pokemon
  pokemonsTypes.push(pokeType.textContent);
  // comparando
  const comparingTypes = pokemonsTypes[0] === pokemonsTypes[1];
  expect(comparingTypes).toBe(false);
});
