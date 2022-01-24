import React from 'react';
import PropTypes from 'prop-types';
import ProductList from './ProductList';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Search extends React.Component {
  // armazenando
  constructor() {
    super();
    this.state = {
      search: '',
      products: [],
    };
  }

  handleChange = ({ target }) => {
    // o name é propriedade direta do target
    this.setState({
      [target.name]: target.value,
    });
  }

  handleCase = (name) => {
    const str = name;
    const capitalized = str[0].toUpperCase() + str.substr(1);
    return capitalized;
  }

  handleProducts = async () => {
    const { search } = this.state;
    // passar parametros para API!!!!
    const productsObj = await getProductsFromCategoryAndQuery('', search);
    const prodResults = productsObj.results;

    this.setState({
      // seta o estado de produtos de acordo com o que foi procurado
      products: prodResults,
    });
  }

  // pegar produto do estado addedCart do productList
  getProductAddedToCart = (productAddedCart) => {
    const { productCart } = this.props;
    productCart(productAddedCart);
  }

  render() {
    const { search, products } = this.state;
    const { catChecked } = this.props;
    const verifyProducts = (
      products.length === 0
        ? <p>Nenhum produto foi encontrado</p>
        : (
          <ProductList
            list={ products }
            addCart={ this.getProductAddedToCart }
          />)
    );
    return (
      <div>
        <input
          data-testid="query-input"
          name="search"
          value={ search }
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          onClick={ this.handleProducts }
          type="button"
        >
          Procurar
        </button>
        {
          catChecked.length === 0
            ? verifyProducts
            : (
              <ProductList
                list={ catChecked }
                addCart={ this.getProductAddedToCart }
              />
            )
        }
      </div>
    );
  }
}

Search.propTypes = {
  catChecked: PropTypes.arrayOf(PropTypes.any).isRequired,
  productCart: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Search;
