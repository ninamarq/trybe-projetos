import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import questionsReducer from './gameReducer';
import resultsReducer from './resultsReducer';

const rootReducer = combineReducers({ loginReducer, questionsReducer, resultsReducer });

export default rootReducer;
