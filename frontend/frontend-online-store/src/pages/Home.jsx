import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Categories from '../components/Categories';
import Search from '../components/Search';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryChecked: '',
    };
  }

  // resgatando a categoria selecionada no componente Categories
  // fonte: https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf
  getCategoryFromChild = (childData) => {
    this.setState({
      categoryChecked: childData,
    });
  }

  // pegar produto do estado adicionado ao carrinho do Search
  getProductAddedToCart = (product) => {
    const { productAdded } = this.props;
    productAdded(product);
  }

  render() {
    const { categoryChecked } = this.state;
    return (
      <section data-testid="home-initial-message">
        <Search
          catChecked={ categoryChecked }
          productCart={ this.getProductAddedToCart }
        />
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        <Link
          to="./cart"
        >
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            🛒
          </button>
        </Link>
        <Categories
          getCheck={ this.getCategoryFromChild }
        />
      </section>
    );
  }
}

Home.propTypes = {
  productAdded: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Home;
