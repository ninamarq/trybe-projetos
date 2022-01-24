import { RECEIVED_API_QUEST } from '../actions/gameAction';

const INITIAL_STATE = {
  questions: [],
};

export default function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVED_API_QUEST:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
}
