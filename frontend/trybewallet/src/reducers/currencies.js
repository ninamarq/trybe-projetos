import { REQUEST_CURRENCIES, RECEIVED_CURRENCIES, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  data: '',
  error: '',
};

function currenciesAPI(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: true };
  case RECEIVED_CURRENCIES:
    return { ...state, data: action.currencies, isFetching: false };
  case FAILED_REQUEST:
    return { ...state, error: action.err, isFetching: false };
  default:
    return state;
  }
}

export default currenciesAPI;
