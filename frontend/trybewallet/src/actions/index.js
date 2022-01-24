export const RECEIVED_CURRENCIES = 'currencies/RECEIVED_CURRENCIES';
export const REQUEST_CURRENCIES = 'currencies/REQUEST_CURRENCIES';
export const FAILED_REQUEST = 'currencies/FAILED_REQUEST';

export const buttonLogin = (value) => ({
  type: 'LOGIN_START',
  value,
});

export const saveExpense = (expense) => ({
  type: 'SAVE_EXPENSE',
  expense,
});

export const totalExp = (total) => ({
  type: 'ADD_EXPENSE_TOTAL',
  total,
});

// pegando as moedas na api
export const requestCurrency = () => ({
  type: REQUEST_CURRENCIES,
});

// recebendo moedas api
export const receivedCurrencies = (currencies) => ({
  type: RECEIVED_CURRENCIES,
  currencies,
});

export const failedRequestCurrencies = (err) => ({
  type: FAILED_REQUEST,
  err,
});

export const deleteExpense = (id) => ({
  type: 'DELETE_EXPENSE',
  id,
});

export function requestAPI() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then(
        (data) => dispatch(receivedCurrencies(data)),
        (error) => dispatch(failedRequestCurrencies(error))
        ,
      );
  };
}
