import { combineReducers } from 'redux';
import courses from './courses';
import lecture from './lecture';
import routes from './routes';
import user from './user';

const rootReducer: Function = combineReducers({
  courses,
  lecture,
  routes,
  user,
});

export default rootReducer;
