import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productCart: [],
    };
  }

  addProductToCart = (product) => {
    // prevState = estado inicial + (o que vai ser adicionado)
    const { productCart } = this.state;
    const findingProd = productCart.find((element) => element.id === product.id);
    if (findingProd) {
      const newCart = productCart.map((element) => {
        if (element.id === product.id) {
          element.quantity += 1;
        }
        return element;
      });
      this.setState({
        productCart: newCart,
      });
    } else {
      product.quantity = 1;
      this.setState((prevState) => ({
        productCart: [...prevState.productCart, product],
      }));
    }
  }

  removeProductFromCart = (product) => {
    // achar index do produto: findIndex
    const { productCart } = this.state;
    const findingProd = productCart.find((element) => element.id === product.id);
    if (findingProd) {
      const newCart = productCart
        .map((element) => {
          if (element.id === product.id) {
            element.quantity -= 1;
          }
          return element;
        })
        .filter((element) => element.quantity > 0);

      this.setState({
        productCart: newCart,
      });
    }
  }

  render() {
    const { productCart } = this.state;
    // const api = this.props;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
            >
              <Home productAdded={ this.addProductToCart } />
            </Route>
            <Route
              exact
              path="/cart"
            >
              <Cart
                cartProducts={ productCart }
                productAdded={ this.addProductToCart }
                productRemoved={ this.removeProductFromCart }
              />
            </Route>
            <Route exact path="/" component={ Home } />
            {/* forma de 'render' para passar props tambem,
            e o spread se dá para conectar a props do Route */}
            <Route
              path="/ProductDetails/:id"
              render={ (routeProps) => (<ProductDetails
                { ...routeProps }
                productAdded={ this.addProductToCart }
              />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
