import React from 'react';
import PropTypes from 'prop-types';

class Deck extends React.Component {
  constructor() {
    super();
    this.deleteDeckCard = this.deleteDeckCard.bind(this);
  }

  deleteDeckCard = (array, card) => {
    array.filter((element) => element !== card);
  }

  render() {
    const { cards } = this.props;
    const deck = cards.map((card) => (
      <section className="card" key={ card }>
        <h3 data-testid="name-card">{ card.cardName }</h3>
        <img
          src={ card.cardImage }
          alt={ card.cardName }
          data-testid="image-card"
          width="200px"
          height="200px"
        />
        <p data-testid="description-card">{ card.cardDescription }</p>
        <h4 data-testid="attr1-card">{ card.cardAttr1 }</h4>
        <h4 data-testid="attr2-card">{ card.cardAttr2 }</h4>
        <h4 data-testid="attr3-card">{ card.cardAttr3 }</h4>
        <h3 data-testid="rare-card">{ card.cardRare }</h3>
        { card.cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p> }
        <button
          data-testid="delete-button"
          type="button"
          onClick={ this.deleteDeckCard(cards, card) }
        >
          Excluir
        </button>
      </section>
    ));
    return deck;
  }
}

Deck.defaultProps = {
  cards: PropTypes.arrayOf(PropTypes.array),
};

Deck.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.array),
};

export default Deck;
