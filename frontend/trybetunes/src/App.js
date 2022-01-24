import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      ableButton: true,
      isLoading: false,
      userName: '',
      redirect: false,
      onInputChange: this.handleInput,
      onLoginClick: this.handleLogin,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    },
    () => this.handleValidate());
  }

  handleValidate = () => {
    const { login } = this.state;
    const minLog = 3;
    if (login.length >= minLog) {
      this.setState({
        ableButton: false,
      });
    }
  }

  handleLogin = () => {
    const { login } = this.state;
    // mudança de estado assincrona
    this.setState({
      isLoading: true,
    }, async () => {
      await createUser({ name: login });
      this.setState({
        redirect: true,
      });
    });
  }

  render() {
    const state = { ...this.state };
    return (
      // sistema de switch e router sugeridos pelo André Horman
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login
              { ...state }
            />
          </Route>

          <Route exact path="/search">
            <Search />
          </Route>

          <Route exact path="/album/:id">
            <Album
              { ...state }
            />
          </Route>

          <Route exact path="/favorites">
            <Favorites
              { ...state }
            />
          </Route>

          <Route exact path="/profile">
            <Profile
              { ...state }
            />
          </Route>

          <Route exact path="/profile/edit">
            <ProfileEdit
              { ...state }
            />
          </Route>

          <Route path="*/">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
