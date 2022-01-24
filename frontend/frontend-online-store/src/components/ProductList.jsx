import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

class ProductList extends React.Component {
  // ENVIAR PARA O SEARCH;
  // enviando o produto adicionado ao carrinho para o search;
  getProductAdded = (productAddedCart) => {
    const { addCart } = this.props;
    return addCart(productAddedCart);
  }

  render() {
    const { list } = this.props;
    return (
      <section className="product-list">
        {
          list.map((product) => (
            <ProductCard
              key={ product.id }
              productAdded={ this.getProductAdded }
              products={ product }
            />
          ))
        }
      </section>
    );
  }
}

ProductList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  addCart: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductList;
