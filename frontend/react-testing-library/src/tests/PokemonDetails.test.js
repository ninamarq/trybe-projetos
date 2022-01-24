import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';

test('Verifica se os detalhes sao mostrados', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pegando tag do nome
  const nameTag = screen.getByTestId(/pokemon-name/i);
  const pokeName = nameTag.textContent;
  // pegando o link e clicando em mais detalhes
  const detailsLink = screen.getByRole('link', {
    name: /More details/i,
  });
  // clicando
  userEvent.click(detailsLink);
  // pegando heading
  const detailsPokeTitle = screen.getByRole('heading', {
    name: / Details/i,
  });
  const checkPokeDetTitle = (
    detailsPokeTitle.textContent.split(' ')[0] === pokeName
  );
  expect(checkPokeDetTitle).toBe(true);
  // teste do link NAO estar
  expect(detailsLink).not.toBeInTheDocument();

  // pegando summary
  const sumTag = screen.getByRole('heading', {
    name: 'Summary',
  });
  expect(sumTag).toBeInTheDocument();

  // pegando o paragrafo de resumo
  const pokeData = data.find((poke) => poke.name === pokeName);
  const sumPoke = pokeData.summary;
  const pTagDetail = screen.getByText(sumPoke);
  expect(pTagDetail).toBeInTheDocument();
});

test('Verifica se existe seção com mapas de localização do pokemon', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pegando tag do nome
  const nameTag = screen.getByTestId(/pokemon-name/i);
  const pokeName = nameTag.textContent;
  // pegando o link e clicando em mais detalhes
  const detailsLink = screen.getByRole('link', {
    name: 'More details',
  });
  // clicando
  userEvent.click(detailsLink);

  // pegando heading location
  const headingLoc = screen.getByRole('heading', {
    name: /Game Locations of/i,
  });
  const locTitleArray = headingLoc.textContent.split(' ');
  // comparando o pokemon do titulo com o clicado
  const checkPokeDetailLoc = pokeName === locTitleArray[3];
  expect(checkPokeDetailLoc).toBe(true);

  // pegando mapas
  const mapImg = screen.queryAllByAltText(`${pokeName} location`);
  // pegando os mapas do data
  const pokeData = data.find((poke) => poke.name === pokeName);
  const mapLengthData = pokeData.foundAt.length;
  // comparando
  const checkLocations = mapImg.length === mapLengthData;
  expect(checkLocations).toBe(true);

  // pegando src da localização
  const srcMaps = mapImg.map((map) => map.src);
  const srcMapsData = pokeData.foundAt.map((loc) => loc.map);
  expect(srcMaps).toStrictEqual(srcMapsData);
});

test('Verifica se o usuario pode favoritar através dos detalhes', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pegando o link e clicando em mais detalhes
  const detailsLink = screen.getByRole('link', {
    name: 'More details',
  });
  // clicando
  userEvent.click(detailsLink);
  // pegando o checkbox
  const checkFav = screen.getByLabelText('Pokémon favoritado?');
  expect(checkFav).toBeInTheDocument();

  userEvent.click(checkFav);
  // pegando a estrela
  const star = screen.getByRole('img', {
    name: /is marked as favorite/i,
  });
  expect(star).toBeInTheDocument();

  // desfavorita
  userEvent.click(checkFav);
  expect(star).not.toBeInTheDocument();
});
