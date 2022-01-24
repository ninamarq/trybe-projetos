import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import App from '../App';

test('Verifica se página contém um heading h2 com texto Page requested not found', () => {
  const customHistory = createMemoryHistory();
  // quando passado como props, vamos conseguir controlar a navegação
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  // navegando para a pagina 'notfound'
  customHistory.push('/notfound');
  // pega o texto
  const notFoundTitle = screen.getByRole('heading', {
    level: 2,
  });
  expect(notFoundTitle).toHaveTextContent('Page requested not found');
  expect(notFoundTitle).toBeInTheDocument();
});

test('Verifica se página mostra a imagem do pikachu triste', () => {
  const customHistory = createMemoryHistory();
  // quando passado como props, vamos conseguir controlar a navegação
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  // navegando para a pagina 'notfound'
  customHistory.push('/notfound');
  // pegando a imagem
  const cryingPikachu = screen.getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(cryingPikachu).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  expect(cryingPikachu).toBeInTheDocument();
});
