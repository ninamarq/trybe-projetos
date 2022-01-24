import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // CONFERINDO NOME
  // pegando tag do nome
  const nameTag = screen.getByTestId(/pokemon-name/i);
  const pokeName = nameTag.textContent;
  const checkingPoke = data.some((element) => element.name === pokeName);
  expect(checkingPoke).toBe(true);

  // CONFERE TIPO
  // pega tipo do pikachu na tela
  const typePoke = screen.getByTestId('pokemon-type').textContent;
  // comparando
  const checkingType = data.some((element) => element.type === typePoke);
  expect(checkingType).toBe(true);

  // CONFERE EXIBIÇÃO PESO MÉDIO
  // pega tag
  const weightTag = screen.getByTestId('pokemon-weight').textContent;
  const arrayWeight = weightTag.split(' ');
  const checkValue = data.some((element) => (
    arrayWeight[2] === element.averageWeight.value
  ));
  expect(checkValue).toBe(true);

  const checkMeasure = data.some((element) => (
    arrayWeight[3] === element.averageWeight.measurementUnit
  ));
  expect(checkMeasure).toBe(true);

  // CONFERE IMAGEM
  const imgPoke = screen.getByRole('img');
  const checkImgAlt = data.some((element) => imgPoke.alt.split(' ')[0] === element.name);
  expect(checkImgAlt).toBe(true);
  const checkImgSrc = data.some((element) => element.image === imgPoke.src);
  expect(checkImgSrc).toBe(true);
});

test('Verifica se o card possui link para detalhes', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pegando link do card
  const detailsLink = screen.getByRole('link', {
    name: /More details/i,
  });
  const detailsArray = detailsLink.href.split('/');
  // conferindo id e href do link
  const checkLink = data.find((element) => `${element.id}` === detailsArray[4]);
  // pegando tag do nome
  const nameTag = screen.getByTestId(/pokemon-name/i);
  const pokeName = nameTag.textContent;
  const checkingLinkName = pokeName === checkLink.name;
  expect(checkingLinkName).toBe(true);
});

test('Verifica se ao clicar em mais detalhes, redireciona adequadamente', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pegando link do card
  const detailsLink = screen.getByRole('link', {
    name: 'More details',
  });
  const nameTag = screen.getByTestId('pokemon-name');
  const pokeName = nameTag.textContent;
  // clicando
  userEvent.click(detailsLink);
  // conferindo detalhes e o pokemon que foi clicado
  const headingDetails = screen.getByRole('heading', {
    name: 'Pikachu Details',
  }).textContent;
  const checkingPokeDetails = headingDetails.split(' ')[0] === pokeName;
  expect(checkingPokeDetails).toBe(true);
});

test('Verifica se existe o icone de estrela nos fav', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pegando link do card
  const detailsLink = screen.getByRole('link', {
    name: 'More details',
  });
  // clicando
  userEvent.click(detailsLink);
  // seleciona o pokemon como favorito
  const favCheck = screen.getByRole('checkbox');
  userEvent.click(favCheck);
  // pega a estrela
  const starImg = screen.getByRole('img', {
    name: /is marked as favorite/i,
  });
  const checkSrcStar = starImg.src.split('/')[3] === 'star-icon.svg';
  expect(checkSrcStar).toBe(true);

  const nameTag = screen.getByTestId('pokemon-name');
  const pokeName = nameTag.textContent;
  const checkPokeStar = starImg.alt.split(' ')[0] === pokeName;
  expect(checkPokeStar).toBe(true);
});
