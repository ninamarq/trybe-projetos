import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestAPI, saveExpense } from '../../actions';

class Expense extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { getCurrency } = this.props;
    getCurrency();
    const { addExpense, currencies } = this.props;
    const { id, value, description,
      currency, method, tag,
    } = this.state;
    const expenseObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    addExpense(expenseObj);

    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  renderCurrencies() {
    const { currencies } = this.props;
    const { currency } = this.state;
    const keys = Object.keys(currencies).filter((exc) => (exc !== 'USDT'));
    return (
      <label
        htmlFor="currency-input"
      >
        Moeda:
        <select
          data-testid="currency-input"
          id="currency-input"
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
        >
          { keys.map((coin) => (
            <option
              key={ coin }
              value={ coin }
              data-testid={ coin }
            >
              { coin }
            </option>
          )) }
        </select>
      </label>
    );
  }

  renderInputs() {
    const { value } = this.state;
    return (
      <>
        <label
          htmlFor="value-input"
        >
          Valor da despesa:
          <input
            data-testid="value-input"
            type="number"
            id="value-input"
            value={ value }
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="description-input"
        >
          Descrição da despesa:
          <input
            data-testid="description-input"
            type="text"
            id="description-input"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
      </>
    );
  }

  renderMethod() {
    const { method } = this.state;
    return (
      <label
        htmlFor="method-input"
      >
        Método de pagamento:
        <select
          data-testid="method-input"
          id="method-input"
          value={ method }
          name="method"
          onChange={ this.handleChange }
        >
          <option
            value="Dinheiro"
          >
            Dinheiro
          </option>
          <option
            value="Cartão de crédito"
          >
            Cartão de crédito
          </option>
          <option
            value="Cartão de débito"
          >
            Cartão de débito
          </option>
        </select>
      </label>
    );
  }

  renderTag() {
    const { tag } = this.state;
    return (
      <label
        htmlFor="tag-input"
      >
        Categoria da despesa:
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          id="tag-input"
          onChange={ this.handleChange }
        >
          <option
            value="Alimentação"
          >
            Alimentação
          </option>
          <option
            value="Lazer"
          >
            Lazer
          </option>
          <option
            value="Trabalho"
          >
            Trabalho
          </option>
          <option
            value="Transporte"
          >
            Transporte
          </option>
          <option
            value="Saúde"
          >
            Saúde
          </option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        <form>
          { this.renderInputs() }
          { this.renderCurrencies() }
          { this.renderMethod() }
          { this.renderTag() }
          <button
            type="submit"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencies.data,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(saveExpense(expense)),
  getCurrency: () => dispatch(requestAPI()),
});

Expense.propTypes = {
  addExpense: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
