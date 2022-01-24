import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Verifica se exibe "No Favorite pokemon found" sem pokemon favoritado', () => {
  const customHistory = createMemoryHistory();
  // quando passado como props, vamos conseguir controlar a navegação
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  // navegando para a pagina 'favorites'
  customHistory.push('/favorites');
  // pegando texto
  const noFavText = screen.getByText('No favorite pokemon found');
  expect(noFavText).toBeInTheDocument();
});

test('Verifica se é exibido todos os cards de pokémons favoritados', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // primeiro clicar em mais detalhes para favoritar
  const detailsLink = screen.getByRole('link', {
    name: 'More details',
  });
  userEvent.click(detailsLink);
  // achar o checkbox de favoritar
  const favCheck = screen.getByRole('checkbox');
  // favoritar
  userEvent.click(favCheck);
  // voltar para home para escolher outro pokemon
  const homeLink = screen.getByRole('link', {
    name: 'Home',
  });
  userEvent.click(homeLink);
  // prox pokemon
  const nextPokemon = screen.getByTestId('next-pokemon');
  userEvent.click(nextPokemon);
  // clicar em mais detalhes de novo
  userEvent.click(detailsLink);
  // achar o checkbox novamente
  userEvent.click(favCheck);
  // navegar para pagina de favoritos
  const favLink = screen.getByRole('link', {
    name: 'Favorite Pokémons',
  });
  userEvent.click(favLink);
  // achando cards de pokemons
  const imgPokemons = screen.getAllByRole('img');
  expect(imgPokemons).toHaveLength(2);
});
