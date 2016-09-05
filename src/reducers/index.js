import { combineReducers } from 'redux';
import lecture from './lecture';
import routes from './routes';

const rootReducer: Function = combineReducers({
  routes,
  lecture,
});

export default rootReducer;
