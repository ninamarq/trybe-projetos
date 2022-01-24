import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const formProps = this.props;
    const checkbox = (
      <label htmlFor="super">
        <input
          type="checkbox"
          name="cardTrunfo"
          id="super"
          value={ formProps.hasTrunfo }
          data-testid="trunfo-input"
          checked={ formProps.cardTrunfo }
          onChange={ formProps.onInputChange }
        />
      </label>
    );
    return (
      <div className="container">
        <form className="forms" method="get">
          <h2>Adicionar nova Carta</h2>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              name="cardName"
              data-testid="name-input"
              value={ formProps.cardName }
              onChange={ formProps.onInputChange }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <textarea
              id="description"
              name="cardDescription"
              data-testid="description-input"
              value={ formProps.cardDescription }
              onChange={ formProps.onInputChange }
            />
          </label>

          <label htmlFor="att1">
            Atributo 1:
            <input
              type="number"
              name="cardAttr1"
              id="att1"
              data-testid="attr1-input"
              value={ formProps.cardAttr1 }
              onChange={ formProps.onInputChange }
            />
          </label>

          <label htmlFor="att2">
            Atributo 2:
            <input
              type="number"
              name="cardAttr2"
              id="att2"
              data-testid="attr2-input"
              value={ formProps.cardAttr2 }
              onChange={ formProps.onInputChange }
            />
          </label>

          <label htmlFor="att3">
            Atributo 3:
            <input
              type="number"
              name="cardAttr3"
              id="att3"
              data-testid="attr3-input"
              value={ formProps.cardAttr3 }
              onChange={ formProps.onInputChange }
            />
          </label>

          <label htmlFor="theme">
            Tema do Card:
            <input
              type="text"
              name="cardImage"
              id="theme"
              data-testid="image-input"
              value={ formProps.cardImage }
              onChange={ formProps.onInputChange }
            />
          </label>

          <label htmlFor="rarity">
            Raridade:
            <select
              data-testid="rare-input"
              name="cardRare"
              id="rarity"
              value={ formProps.cardRare }
              onChange={ formProps.onInputChange }
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>

          { formProps.hasTrunfo
            ? <p>Você já tem um Super Trunfo em seu baralho</p> : checkbox }

          <button
            type="submit"
            data-testid="save-button"
            disabled={ formProps.isSaveButtonDisabled }
            onClick={ formProps.onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
