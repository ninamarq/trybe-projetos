// src/store/index.js
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  // dev tool padrao thunk
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
