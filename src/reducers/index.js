import { combineReducers } from 'redux';
import * as ActionTypes from '../actions/ActionTypes';

function exampleReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.EXAMPLE_ACTION:
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  exampleReducer,
});

export default rootReducer;
