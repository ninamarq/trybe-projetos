import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  handleMultiplesProducts = () => {
    const { cartProducts } = this.props;
    const key = 'id';
    // pegamos junto com Cestari, no site: "https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript"
    const arrayUniqueByKey = (
      [...new Map(cartProducts.map((item) => [item[key], item])).values()]
    );
    return arrayUniqueByKey;
  }

  handleIncrease = (prod) => {
    const { productAdded } = this.props;
    productAdded(prod);
  }

  handleDecrease = (prod) => {
    const { productRemoved } = this.props;
    productRemoved(prod);
  }

  render() {
    const newCart = this.handleMultiplesProducts();
    const { cartProducts } = this.props;
    const cartEmpty = (
      <section
        data-testid="shopping-cart-empty-message"
      >
        <p>Seu carrinho está vazio</p>
      </section>
    );
    const cart = newCart.map((prod) => (
      <section key={ prod.id }>
        <h3
          data-testid="shopping-cart-product-name"
        >
          { prod.title }
        </h3>
        <img
          src={ prod.thumbnail }
          alt={ prod.title }
        />
        <section>
          <button
            type="button"
            id="decrease"
            data-testid="product-decrease-quantity"
            onClick={ () => this.handleDecrease(prod) }
          >
            -
          </button>
          <p
            data-testid="shopping-cart-product-quantity"
          >
            { prod.quantity }
          </p>
          <button
            type="button"
            id="increase"
            data-testid="product-increase-quantity"
            // callback para funçoes que possuem parametro.
            onClick={ () => this.handleIncrease(prod) }
          >
            +
          </button>
        </section>
      </section>
    ));

    return (
      <div>
        {
          cartProducts.length === 0
            ? cartEmpty
            : cart
        }
      </div>
    );
  }
}

Cart.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.any).isRequired,
  productAdded: PropTypes.objectOf(PropTypes.any).isRequired,
  productRemoved: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Cart;
