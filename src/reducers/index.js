import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import courses from './courses';
import lecture from './lecture';
import routes from './routes';
import user from './user';


const rootReducer: Function = combineReducers({
  courses,
  form,
  lecture,
  routes,
  user,
});


export default rootReducer;
