import {
  SET_USER,
  RECEIVED_API,
  REQUEST_API,
  FAILED_REQUEST } from '../actions/loginAction';

const INITIAL_STATE = {
  playerName: '',
  playerEmail: '',
  token: '',
  isFetching: false,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      playerName: action.name,
      playerEmail: action.email,
    };
  case REQUEST_API:
    return { ...state, isFetching: true };
  case RECEIVED_API:
    return { ...state, token: action.token, isFetching: false };
  case FAILED_REQUEST:
    return { ...state, error: action.err, isFetching: false };
  default:
    return state;
  }
}
