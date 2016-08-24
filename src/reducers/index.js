import { combineReducers } from 'redux';
// import * as ActionTypes from '../actions/ActionTypes';

const exampleReducer = (state: Object = {}, action: Object): Function => {
  switch (action.type) {
    // case ActionTypes.EXAMPLE_ACTION:
    //   return state;
    default:
      return state;
  }
};

const rootReducer: Function = combineReducers({
  exampleReducer,
});

export default rootReducer;
