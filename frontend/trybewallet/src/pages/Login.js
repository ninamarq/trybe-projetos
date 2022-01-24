import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { buttonLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
      disable: true,
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  validateEmail() {
    const { emailInput } = this.state;
    if (emailInput.includes('@') && emailInput.includes('.com')) {
      return true;
    }
  }

  validatePassword() {
    const { passwordInput } = this.state;
    // nao entendi.... no readme esta 6.
    const minPass = 5;
    if (passwordInput.length >= minPass) {
      return true;
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // if (this.validateEmail && this.validatePassword) {
    //   this.setState({
    //     disable: true,
    //   });
    // } else {
    //   this.setState({
    //     disable: false,
    //   });
    // }
    // tentando dependencia de variaveis.
    const disableBut = !((this.validateEmail()) && (this.validatePassword()));
    this.setState({
      disable: disableBut,
    });
  }

  handleClick() {
    const { login } = this.props;
    const { emailInput } = this.state;
    login(emailInput);
    console.log(login(emailInput));
  }

  render() {
    const { disable } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              data-testid="email-input"
              name="emailInput"
              // forma de função vista na aula 15.2
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              data-testid="password-input"
              name="passwordInput"
              // forma de função vista na aula 15.2
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ disable }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(buttonLogin(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
