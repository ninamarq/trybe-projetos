import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.gettingUser = this.gettingUser.bind(this);
  }

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser = async () => {
    const user = await getUser();
    this.setState({
      userName: user.name,
    },
    this.setState({
      isLoading: true,
    }));
  }

  render() {
    const state = { ...this.state };
    const usernameRender = (
      <h4 data-testid="header-user-name">
        Olá,
        { ' ' }
        {state.userName}
      </h4>
    );
    return (
      <header
        data-testid="header-component"
        className="header-tune"
      >
        {
          state.isLoading
            ? usernameRender
            : <Loading />
        }
        <Link
          data-testid="link-to-search"
          to="/search"
        >
          Search
        </Link>
        <Link
          data-testid="link-to-favorites"
          to="/favorites"
        >
          Favorites
        </Link>
        <Link
          data-testid="link-to-profile"
          to="/profile"
        >
          Profile
        </Link>
      </header>
    );
  }
}

export default Header;
