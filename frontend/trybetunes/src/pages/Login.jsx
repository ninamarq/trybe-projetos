import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Loading from './Loading';

class Login extends React.Component {
  render() {
    const loginProps = this.props;
    return (
      <div
        data-testid="page-login"
        className="login-div"
      >
        {
          loginProps.isLoading
            ? <Loading />
            : (
              <form className="login-form">
                <section className="app-icon">
                  <img
                    src="https://i.pinimg.com/736x/eb/6e/9f/eb6e9f2ef5b7d197e33279e89425213a.jpg"
                    alt="spotify-icon"
                    width="60px"
                    className="spotify-icon"
                  />
                  <h1>Trybe Tunes</h1>
                </section>
                <label
                  htmlFor="login"
                  className="username"
                >
                  Username:
                  <input
                    id="login"
                    data-testid="login-name-input"
                    name="login"
                    type="text"
                    value={ loginProps.login }
                    onChange={ loginProps.onInputChange }
                  />
                </label>

                <button
                  type="submit"
                  className="button"
                  data-testid="login-submit-button"
                  disabled={ loginProps.ableButton }
                  onClick={ loginProps.onLoginClick }
                >
                  Entrar
                </button>
              </form>
            )
        }
        { loginProps.redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  ableButton: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default Login;
