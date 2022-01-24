import { SAVE_PLAYERS, SET_ANSWERS, SET_SCORE } from '../actions/resultsAction';

const INITIAL_STATE = {
  score: 0,
  correctAnswers: [],
  ranking: [],
};

export default function resultsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case SET_ANSWERS:
    return {
      ...state,
      correctAnswers: [...state.correctAnswers, action.payload],
    };
  case SAVE_PLAYERS:
    return {
      ...state,
      ranking: [...state.ranking, action.payload],
    };
  default:
    return state;
  }
}
