import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/myProvider';
// import LoginProvider from './context/LoginProvider';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Login from './pages/Login';
import Profile from './pages/Profile';
import FoodRecipe from './pages/FoodRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsByIngredients from './pages/ExploreFoodsByIngredients';
import ExploreDrinksByIngredients from './pages/ExploreDrinksByIngredients';
import ExploreFoodsByArea from './pages/ExploreFoodsByArea';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';
import FoodProgress from './pages/FoodProgress';
import DrinkProgress from './pages/DrinkProgress';

function App() {
  return (
    <Provider>
      {/* <LoginProvider> */}
      <BrowserRouter>
        <Switch>
          <Route path="/perfil" component={ Profile } />
          <Route exact path="/comidas" component={ Foods } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route
            exact
            path="/comidas/:id/in-progress"
            component={ FoodProgress }
          />
          <Route path="/comidas/:id" component={ FoodRecipe } />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            component={ DrinkProgress }
          />
          <Route path="/bebidas/:id" component={ DrinkRecipe } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreFoods } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodsByIngredients }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExploreDrinksByIngredients }
          />
          <Route
            path="/explorar/comidas/area"
            component={ ExploreFoodsByArea }
          />
          <Route
            path="/receitas-feitas"
            component={ DoneRecipes }
          />
          <Route
            path="/receitas-favoritas"
            component={ FavoriteRecipes }
          />
          <Route exact path="/" component={ Login } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
      {/* </LoginProvider> */}
    </Provider>
  );
}

export default App;
