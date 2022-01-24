import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      productDetails: [],
    };
  }

  componentDidMount() {
    this.getProductState();
  }

  handleClickCart = () => {
    const { location: { state } } = this.props;
    const sendToApp = (prod) => {
      const { productAdded } = this.props;
      productAdded(prod);
    };
    return sendToApp(state);
  }

  getProductState = () => {
    const { location: { state } } = this.props;
    this.setState({
      productDetails: state,
    });
  }

  render() {
    const { productDetails } = this.state;

    return (
      <section>
        <h3 data-testid="product-detail-name">{ productDetails.title }</h3>
        <img
          src={ productDetails.thumbnail }
          alt={ productDetails.title }
        />
        <p>
          R$
          { productDetails.price }
        </p>
        <button
          data-testid="product-detail-add-to-cart"
          value="Adicionar ao Carrinho"
          type="button"
          onClick={ this.handleClickCart }
        >
          Adicionar ao Carrinho
        </button>
        <Link
          to="/cart"
        >
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            🛒
          </button>
        </Link>
        <Link
          to="/"
        >
          <button
            type="button"
          >
            Home
          </button>
        </Link>
      </section>
    );
  }
}

ProductDetails.propTypes = PropTypes.shape({
  location: PropTypes.objectOf,
  productAdded: PropTypes.func.isRequired,
}).isRequired;

export default ProductDetails;
