// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_EXPENSE':
    return ({ ...state, expenses: [...state.expenses, { ...action.expense }] });
  case 'RECEIVE_CURRENCIES':
    return ({
      ...state, currencies: [...action.currencies],
    });
  case 'DELETE_EXPENSE':
    return ({
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.id),
    });
  default:
    return { ...state };
  }
}

export default wallet;
