import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { emailState, expenses } = this.props;
    return (
      <header>
        <p
          data-testid="email-field"
        >
          { emailState }
        </p>
        <p
          data-testid="total-field"
        >
          {/* https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce */}
          {
            expenses.length > 0
              ? expenses.reduce((acc, { value, currency, exchangeRates }) => (
                acc + (parseFloat(value) * exchangeRates[currency].ask)), 0) : 0
          }
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => (
  {
    emailState: state.user.email,
    expenses: state.wallet.expenses,
  });

Header.propTypes = {
  emailState: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
