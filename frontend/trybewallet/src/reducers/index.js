import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import currencies from './currencies';

const rootReducer = combineReducers({ user, wallet, currencies });
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
export default rootReducer;
