import { combineReducers } from 'redux';
import lecture from './lecture';
import routes from './routes';
import user from './user';

const rootReducer: Function = combineReducers({
  lecture,
  routes,
  user,
});

export default rootReducer;
