import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../../actions';

class Table extends React.Component {
  constructor() {
    super();
    this.renderColumns = this.renderColumns.bind(this);
    this.validateCurrency = this.validateCurrency.bind(this);
    this.renderRows = this.renderRows.bind(this);
  }

  validateCurrency(curr) {
    if (curr === 'USD') {
      return 'Dólar Comercial';
    } if (curr === 'EUR') {
      return 'Euro';
    }
    return curr;
  }

  removeRow(id) {
    const { rmExpense } = this.props;
    rmExpense(id);
  }

  renderColumns() {
    const columns = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    return (
      columns.map((element) => (
        <th
          key={ element }
        >
          { element }
        </th>
      ))
    );
  }

  renderRows() {
    const { expenses } = this.props;
    return (
      expenses.map((expense) => (
        <tr
          key={ expense.id }
        >
          <td>
            { expense.description }
          </td>
          <td>
            { expense.tag }
          </td>
          <td>
            { expense.method }
          </td>
          <td>
            { expense.value }
          </td>
          <td>
            { this.validateCurrency(expense.currency) }
          </td>
          <td>
            { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
          </td>
          <td>
            { parseFloat(expense.value * expense.exchangeRates[expense.currency].ask)
              .toFixed(2) }
          </td>
          <td>
            Real
          </td>
          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => this.removeRow(expense.id) }
            >
              Excluir
            </button>
          </td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <div>
        <table
          border="1"
        >
          <thead>
            <tr>
              { this.renderColumns() }
            </tr>
          </thead>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  rmExpense: (id) => dispatch(deleteExpense(id)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  rmExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
