import React from 'react';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.requestCategories();
  }

  // enviando o valor de checked para nosso componente pai (Home)
  sendCategoryChecked = (categ) => {
    const { getCheck } = this.props;
    getCheck(categ);
  }

  handleCheck = async ({ target }) => {
    if (target.checked) {
      const productsObj = await getProductsFromCategoryAndQuery(target.value, '');
      const prodResults = productsObj.results;
      this.sendCategoryChecked(prodResults);
    }
  }

  requestCategories = async () => {
    const request = await getCategories();
    this.setState({
      categories: request,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <aside className="side-bar">
        <div className="categories-list">
          {
            categories.map((category) => (
              <section key={ category.id }>
                <label
                  htmlFor={ category.id }
                  key={ category.id }
                  data-testid="category"
                >
                  { category.name }
                  <input
                    type="radio"
                    // setado valor para resgatar no Home.
                    id={ category.id }
                    value={ category.id }
                    onClick={ this.handleCheck }
                  />
                </label>
              </section>
            ))
          }
        </div>
      </aside>
    );
  }
}

Categories.propTypes = {
  getCheck: PropTypes.func.isRequired,
};

export default Categories;
