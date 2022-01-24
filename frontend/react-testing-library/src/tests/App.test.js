import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Verifica se topo da aplicação contém conjunto fixo de links de navegação', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pegar links
  const homeLink = screen.getByRole('link', {
    name: /Home/i,
  });
  const aboutLink = screen.getByRole('link', {
    name: /About/i,
  });
  const favLink = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  // verificar se estao na tela
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favLink).toBeInTheDocument();
});

test('Verifica se a aplicação é redirecionada ao clicar em Home', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pegar link Home
  const homeLink = screen.getByRole('link', {
    name: /Home/i,
  });
  // clicando no link
  userEvent.click(homeLink);
  // verifica se foi para url '/' atraves dos elementos da pagina Home.
  const encounteredTitle = screen.getByText('Encountered pokémons');
  expect(encounteredTitle).toBeInTheDocument();
});

test('Verifica se a aplicação é redirecionada para a página de About', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pegar link About
  const aboutLink = screen.getByRole('link', {
    name: /About/i,
  });
  // clicando no link
  userEvent.click(aboutLink);
  // verifica se foi para /about
  const aboutPokedexTitle = screen.getByText('About Pokédex');
  expect(aboutPokedexTitle).toBeInTheDocument();
});

test('Verifica se a aplicação é redirecionada para Pokémons Favoritados', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // pegar link Favorites
  const favLink = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  // clicando no link
  userEvent.click(favLink);
  // verifica se foi para /about
  const favPokeTitle = screen.getByText('Favorite pokémons');
  expect(favPokeTitle).toBeInTheDocument();
});

test('Verifica se a aplicação é redirecionada para Not Found', async () => {
  // assim como feito na aula ao vivo de 04/11
  // criando objeto history, com a biblioteca
  const customHistory = createMemoryHistory();
  // quando passado como props, vamos conseguir controlar a navegação
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  // navegando para a pagina 'qualquerURL.....'
  customHistory.push('/qualquerURLnaoExistente');
  // verifica se foi para notFound
  const notTitle = screen.getByText(/Page requested not found/i);
  const cryingPikachu = screen.getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });

  expect(notTitle).toBeInTheDocument();
  expect(cryingPikachu).toBeInTheDocument();
});
