import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const cardProp = this.props;

    return (
      <div className="container">
        <h2>Pré-visualização</h2>
        <section className="card">
          <h3 data-testid="name-card">{ cardProp.cardName }</h3>
          <img
            src={ cardProp.cardImage }
            alt={ cardProp.cardName }
            data-testid="image-card"
            width="200px"
            height="200px"
          />
          <p data-testid="description-card">{ cardProp.cardDescription }</p>
          <h4 data-testid="attr1-card">{ cardProp.cardAttr1 }</h4>
          <h4 data-testid="attr2-card">{ cardProp.cardAttr2 }</h4>
          <h4 data-testid="attr3-card">{ cardProp.cardAttr3 }</h4>
          <h3 data-testid="rare-card">{ cardProp.cardRare }</h3>
          {/* a linha abaixo, fiz com base no seguinte site: "https://pt-br.reactjs.org/docs/conditional-rendering.html" */}
          { cardProp.cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p> }
        </section>
      </div>
    );
  }
}

Card.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
