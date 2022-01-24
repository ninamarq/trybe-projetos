import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  // enviando as informações do produto adicionado ao carrinho para o product list.
  addProductToCart = (productAddedCart) => {
    const { productAdded } = this.props;
    productAdded(productAddedCart);
  }

  handleClickCart = () => {
    const { products } = this.props;
    return this.addProductToCart(products);
  }

  render() {
    const { products } = this.props;
    // console.log(products);
    return (
      <div>

        <div
          data-testid="product"
        >
          <h3>
            { products.title }
          </h3>
          <img
            src={ products.thumbnail }
            alt={ products.title }
          />
          <p>
            R$
            { products.price }
          </p>
          <input
            data-testid="product-add-to-cart"
            value="Adicionar ao Carrinho"
            type="button"
            onClick={ this.handleClickCart }
          />
          <Link
            to={ { pathname: `productdetails/${products.id}`,
              state: products,
            } }
            data-testid="product-detail-link"
          >
            Mais detalhes
          </Link>
        </div>

      </div>
    );
  }
}

ProductCard.propTypes = {
  products: PropTypes.objectOf(PropTypes.any).isRequired,
  productAdded: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductCard;
