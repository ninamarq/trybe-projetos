import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../images/loginAnimation.json';
import './css/Login.css';
import myContext from '../context/myContext';

function Login() {
  const { handleChange, disabled, handlerSubmit } = useContext(myContext);
  const [animationState] = useState({
    isStopped: false, isPaused: false,
  });

  const history = useHistory();
  const defaultOptions = {
    loop: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="login">
      <div className="login-container">
        <form
          onSubmit={ (e) => {
            handlerSubmit(e, history);
          } }
        >
          <h1>ReceitAqui!</h1>
          <object>
            <Lottie
              options={ defaultOptions }
              width="100%"
              height="100%"
              isStopped={ animationState.isStopped }
              isPaused={ animationState.isPaused }
            />
          </object>
          <div>
            <input
              type="email"
              name="email"
              data-testid="email-input"
              className="login-form"
              placeholder="Email"
              onChange={ (e) => { handleChange(e); } }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="login-form"
              name="password"
              data-testid="password-input"
              placeholder="Password"
              minLength="6"
              onChange={ (e) => { handleChange(e); } }
              required
            />
          </div>
          <div>
            <button
              disabled={ disabled }
              type="submit"
              data-testid="login-submit-btn"
              id="login-btn"
            >
              Logar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
